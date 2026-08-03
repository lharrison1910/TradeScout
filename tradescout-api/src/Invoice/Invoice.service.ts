import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { InvoiceDto, NewInvoiceRequestSchema } from '../types/invoiceSchema';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './Invoice.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm/browser';
import { Income } from 'src/Income/Income.entity';
import { InvoiceStatusEnum } from './InvoiceEnums';
import { Business } from 'src/Business/Business.entity';
import type { CurrentUserType } from 'src/types/currentUser';
import { Expense } from 'src/Expense/Expense.entity';
@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectPinoLogger(InvoiceService.name)
    private readonly logger: PinoLogger,
  ) {}

  async createDraft(payload, currentUser:CurrentUserType){
    console.log(payload, "test payload")
    let business: Business | null = null
    
    try{
      business = await this.dataSource.getRepository(Business).findOne({where: {
        id:payload.businessId,
        userId: currentUser.userId }})
    } catch(error){
      this.logger.error(`createDraft: failed to find business - ${error}`)
      throw new InternalServerErrorException("Failed to find business")
    }

    if(!business){
      throw new UnauthorizedException("You do not have permission to create an invoice for this business")
    }


    try{
      const snapshotData:InvoiceDto = {...payload}
      const formattedInvoice = {
        businessId: payload.businessId, 
        invoiceNumber: payload.invoice_number,
        customerName: payload.customer_name,
        totalAmount: payload.amount_due,
        status: InvoiceStatusEnum.DRAFT,
        snapshotData
      }
      const invoiceToSave = this.invoiceRepository.create(formattedInvoice)
      return await this.invoiceRepository.save(invoiceToSave)
    } catch(error){
      this.logger.error(`createDraft: failed to save to db - ${error}`)
      throw new InternalServerErrorException("Failed to save draft")
    }
  }

  async updateDraft(payload, invoiceId:number, currentUser:CurrentUserType){
    let invoice: Invoice|null
    try{
      invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
    }
    catch(error){
      this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
      throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
    }

    if(!invoice){
      throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
    }

    if(invoice.status !== InvoiceStatusEnum.DRAFT){
      throw new BadRequestException(`Invoice ${invoiceId} is not a draft`)
    }

    try{
      return await this.invoiceRepository.update(invoiceId, payload)
    } catch(error){
      if(error instanceof BadRequestException){
        throw error
      }
      this.logger.error(`updateDraft: Failed to update invoice ${invoiceId} - ${error}`)
      throw new InternalServerErrorException("Failed to update invoice")
    }
  }

  async previewInvoice(invoiceId: number){
    let invoice: Invoice|null

    try{
      invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
    }catch(error){
      this.logger.error(`previewInvoice: Failed to fetch ${invoiceId} from db - ${error}`)
      throw new InternalServerErrorException(`Failed to fetch invoice`)
    }

    if(!invoice){
      throw new NotFoundException(`No invoice ${invoiceId} was found`)
    }

    let buffer: Buffer<ArrayBufferLike>;
    try{ 
      buffer = this._getInvoiceBuffer(invoice.snapshotData);
    } catch(error){
      if(error instanceof NotFoundException){
        this.logger.error(`_getInvoiceBuffer: Template not found - ${error}`)
        throw error
      }
      this.logger.error(`previewInvoice: failed to generate docx file - ${error}`)
      throw new InternalServerErrorException("Failed to generate preivew")
    }

    return buffer

  }

  async deleteDraft(invoiceId: number){
    let invoice: Invoice|null
    try{
      invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
    }
    catch(error){
      this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
      throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
    }

    if(!invoice){
      throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
    }

    if(invoice.status !== InvoiceStatusEnum.DRAFT){
      throw new BadRequestException("Invoice is not a draft and cannot be deleted")
    }

    try{
      const deleted = await this.invoiceRepository.delete(invoiceId)
      if(deleted.affected !== 1){
        throw new InternalServerErrorException(`Incorrect numbers of rows deleted - ${deleted.affected}`)
      }
      return deleted.affected
    } catch(error){
      if(error instanceof InternalServerErrorException){
        this.logger.error(`deleteDraft: ${error.message}`)
      }
      this.logger.error(`deleteDraft: Failed to delete invoice:${invoiceId} - ${error}`)
      throw new InternalServerErrorException("Failed to delete invoice")
    }

  }

  async issueInvoice(invoiceId:number){
        let invoice: Invoice|null
    try{
      invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
    }
    catch(error){
      this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
      throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
    }

    if(!invoice){
      throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
    }

    if(invoice.status !== InvoiceStatusEnum.DRAFT){
      throw new BadRequestException("Invoice is not a draft and cannot be deleted")
    }

    let buffer: Buffer<ArrayBufferLike>;
    try{ 
      buffer = this._getInvoiceBuffer(invoice.snapshotData);
      //save to s3
      await this.invoiceRepository.update(invoiceId, {...invoice, status: InvoiceStatusEnum.UNPAID})

    } catch(error){
      if(error instanceof NotFoundException){
        this.logger.error(`_getInvoiceBuffer: Template not found - ${error}`)
        throw error
      }
      this.logger.error(`previewInvoice: failed to generate docx file - ${error}`)
      throw new InternalServerErrorException("Failed to generate preivew")
    }

    return buffer
  }

  async downloadInvoice(invoiceId: number){
    throw new InternalServerErrorException("Not implemented yet")
  }

  async getJobDetails(invoiceId:number){
    let invoice: Invoice|null
    try{
      invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}, relations: {expenses: true, income: true}})
    }
    catch(error){
      this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
      throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
    }

    if(!invoice){
      throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
    }

    return invoice
  }


  async recordPayment(invoiceId: number, currentUser: CurrentUserType){
        let invoice: Invoice|null
    try{
      invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
    }
    catch(error){
      this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
      throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
    }

    if(!invoice){
      throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
    }

    try{
      await this.dataSource.transaction(async (em) => {
        const invoiceRepo = em.getRepository(Invoice)
        const incomeRepo = em.getRepository(Income)

        await invoiceRepo.update(invoiceId, {...invoice, status: InvoiceStatusEnum.PAID})
        await incomeRepo.save({
          businessId: invoice.businessId, 
          userId: currentUser.userId, 
          dateReceived: new Date(Date.now()).toISOString(),
          amount: invoice.totalAmount,
          reference: invoice.invoiceNumber,
          invoice       
        })
      })

    } catch(error){
      this.logger.error(`recordPayment: failed to save payment - ${error}`)
      throw new InternalServerErrorException("Failed to record payment")
    }
  }

  async voidInvoice(invoiceId:number){
    let invoice: Invoice|null
    try{
      invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}, relations: {expenses: true, income: true}})
    }
    catch(error){
      this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
      throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
    }

    if(!invoice){
      throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
    }

    try{
      await this.dataSource.transaction(async (em) => {
        const invoiceRepo = em.getRepository(Invoice)
        const incomeRepo = em.getRepository(Income)
        const expenseRepo = em.getRepository(Expense)


        await invoiceRepo.update(invoice.id, {...invoice, status: InvoiceStatusEnum.VOID})
        await invoiceRepo.softDelete(invoice.id)

        const incomeIds = invoice.income.map((income) => income.id)
        await incomeRepo.softDelete(incomeIds)

        const expenseIds = invoice.expenses.map((expense) => expense.id)
        await expenseRepo.softDelete(expenseIds)
      })
    } catch(error){
      this.logger.error(`voidInvoice: Failed to void invoice - ${error}`)
      throw new InternalServerErrorException(`Failed to void invoice`)
    }





  }

  async listInvoiceByFilter(filter){
    try{
      return  await this.invoiceRepository.find({relations: {expenses: true, income:true, business: true}})
    }
    catch(error){
      this.logger.error(`listInvoiceByFilter: failed to load from DB - ${error}`)
      throw new InternalServerErrorException(`Failed to load invoices`)
    }

  }



  _getInvoiceBuffer(
    invoiceData
  ): Buffer<ArrayBufferLike> {
    const templatePath = path.join(process.cwd(), 'templates', 'template.docx');

    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(
        `Invoice template not found at path`,
      );
    }

    const content = fs.readFileSync(templatePath, 'binary');

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(invoiceData);

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
    return buf;
  }
  }




  // async payInvoice(id: number) {
  //   let invoice: Invoice | null;

  //   try {
  //     invoice = await this.invoiceRepository.findOne({ where: { id } });
  //   } catch (error) {
  //     this.logger.error(
  //       `payInvoice: Failed to find invoice with Id ${id} - ${error}`,
  //     );
  //     throw new InternalServerErrorException('Failed to find invoice');
  //   }

  //   if (!invoice) {
  //     throw new NotFoundException(`No invoice with Id ${id} found`);
  //   }

  //   try{
  //     await this.dataSource.transaction(async (em) => {
  //       const invoiceRepo = em.getRepository(Invoice)
  //       const incomeRepo = em.getRepository(Income)

  //       const updatedInvoice = invoiceRepo.update(id, {...invoice, status: "PAID"})
  //       const incomeToSave = incomeRepo.create({})
  //     })
  //     // const updatedInvoice = this.invoiceRepository.update(id, {...invoice, status: "PAID"})
  //   } catch(error){
  //     this.logger.error(`payInvoice: bad - ${error}`)
  //     throw new InternalServerErrorException("Failed to update invoice")
  //   }
  // }

  // updateInvoice(id: number) {}

  // _getInvoiceBuffer(
  //   invoiceData: NewInvoiceRequestSchema,
  // ): Buffer<ArrayBufferLike> {
  //   const templatePath = path.join(process.cwd(), 'templates', 'template.docx');

  //   if (!fs.existsSync(templatePath)) {
  //     throw new NotFoundException(
  //       `Invoice template not found at path: ${templatePath}`,
  //     );
  //   }

  //   const content = fs.readFileSync(templatePath, 'binary');

  //   const zip = new PizZip(content);
  //   const doc = new Docxtemplater(zip, {
  //     paragraphLoop: true,
  //     linebreaks: true,
  //   });

  //   doc.render(invoiceData);

  //   const buf = doc.getZip().generate({
  //     type: 'nodebuffer',
  //     compression: 'DEFLATE',
  //   });
  //   return buf;
  // }

