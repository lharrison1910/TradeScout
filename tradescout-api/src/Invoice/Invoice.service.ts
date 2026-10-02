// import {
//   BadRequestException,
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import path from 'path';
// import fs from 'fs';
// import PizZip from 'pizzip';
// import Docxtemplater from 'docxtemplater';
// import { InvoiceDto, NewInvoiceRequestSchema } from '../types/invoiceSchema';
// import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
// import { Invoice } from './Invoice.entity';
// import { Repository } from 'typeorm';
// import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
// import { DataSource } from 'typeorm/browser';
// import { Income } from 'src/Income/Income.entity';
// import { InvoiceStatusEnum } from './InvoiceEnums';
// import { Business } from 'src/Business/Business.entity';
// import type { CurrentUserType } from 'src/types/currentUser';
// import { Expense } from 'src/Expense/Expense.entity';
// @Injectable()
// export class InvoiceService {
//   constructor(
//     @InjectRepository(Invoice)
//     private readonly invoiceRepository: Repository<Invoice>,

//     @InjectDataSource()
//     private readonly dataSource: DataSource,

//     @InjectPinoLogger(InvoiceService.name)
//     private readonly logger: PinoLogger,
//   ) {}

//   async createDraft(payload, currentUser:CurrentUserType){
//     console.log(payload, "test payload")
//     let business: Business | null = null

//     try{
//       business = await this.dataSource.getRepository(Business).findOne({where: {
//         id:payload.businessId,
//         userId: currentUser.userId }})
//     } catch(error){
//       this.logger.error(`createDraft: failed to find business - ${error}`)
//       throw new InternalServerErrorException("Failed to find business")
//     }

//     if(!business){
//       throw new UnauthorizedException("You do not have permission to create an invoice for this business")
//     }

//     try{
//       const snapshotData:InvoiceDto = {...payload}
//       const formattedInvoice = {
//         businessId: payload.businessId,
//         invoiceNumber: payload.invoice_number,
//         customerName: payload.customer_name,
//         totalAmount: payload.amount_due,
//         status: InvoiceStatusEnum.DRAFT,
//         snapshotData
//       }
//       const invoiceToSave = this.invoiceRepository.create(formattedInvoice)
//       return await this.invoiceRepository.save(invoiceToSave)
//     } catch(error){
//       this.logger.error(`createDraft: failed to save to db - ${error}`)
//       throw new InternalServerErrorException("Failed to save draft")
//     }
//   }

//   async updateDraft(payload, invoiceId:number, currentUser:CurrentUserType){
//     let invoice: Invoice|null
//     try{
//       invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
//     }
//     catch(error){
//       this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
//       throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
//     }

//     if(!invoice){
//       throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
//     }

//     if(invoice.status !== InvoiceStatusEnum.DRAFT){
//       throw new BadRequestException(`Invoice ${invoiceId} is not a draft`)
//     }

//     try{
//       return await this.invoiceRepository.update(invoiceId, payload)
//     } catch(error){
//       if(error instanceof BadRequestException){
//         throw error
//       }
//       this.logger.error(`updateDraft: Failed to update invoice ${invoiceId} - ${error}`)
//       throw new InternalServerErrorException("Failed to update invoice")
//     }
//   }

//   async previewInvoice(invoiceId: number){
//     let invoice: Invoice|null

//     try{
//       invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
//     }catch(error){
//       this.logger.error(`previewInvoice: Failed to fetch ${invoiceId} from db - ${error}`)
//       throw new InternalServerErrorException(`Failed to fetch invoice`)
//     }

//     if(!invoice){
//       throw new NotFoundException(`No invoice ${invoiceId} was found`)
//     }

//     let buffer: Buffer<ArrayBufferLike>;
//     try{
//       buffer = this._getInvoiceBuffer(invoice.snapshotData);
//     } catch(error){
//       if(error instanceof NotFoundException){
//         this.logger.error(`_getInvoiceBuffer: Template not found - ${error}`)
//         throw error
//       }
//       this.logger.error(`previewInvoice: failed to generate docx file - ${error}`)
//       throw new InternalServerErrorException("Failed to generate preivew")
//     }

//     return buffer

//   }

//   async deleteDraft(invoiceId: number){
//     let invoice: Invoice|null
//     try{
//       invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
//     }
//     catch(error){
//       this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
//       throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
//     }

//     if(!invoice){
//       throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
//     }

//     if(invoice.status !== InvoiceStatusEnum.DRAFT){
//       throw new BadRequestException("Invoice is not a draft and cannot be deleted")
//     }

//     try{
//       const deleted = await this.invoiceRepository.delete(invoiceId)
//       if(deleted.affected !== 1){
//         throw new InternalServerErrorException(`Incorrect numbers of rows deleted - ${deleted.affected}`)
//       }
//       return deleted.affected
//     } catch(error){
//       if(error instanceof InternalServerErrorException){
//         this.logger.error(`deleteDraft: ${error.message}`)
//       }
//       this.logger.error(`deleteDraft: Failed to delete invoice:${invoiceId} - ${error}`)
//       throw new InternalServerErrorException("Failed to delete invoice")
//     }

//   }

//   async issueInvoice(invoiceId:number){
//         let invoice: Invoice|null
//     try{
//       invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
//     }
//     catch(error){
//       this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
//       throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
//     }

//     if(!invoice){
//       throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
//     }

//     if(invoice.status !== InvoiceStatusEnum.DRAFT){
//       throw new BadRequestException("Invoice is not a draft and cannot be deleted")
//     }

//     let buffer: Buffer<ArrayBufferLike>;
//     try{
//       buffer = this._getInvoiceBuffer(invoice.snapshotData);
//       //save to s3
//       await this.invoiceRepository.update(invoiceId, {...invoice, status: InvoiceStatusEnum.UNPAID})

//     } catch(error){
//       if(error instanceof NotFoundException){
//         this.logger.error(`_getInvoiceBuffer: Template not found - ${error}`)
//         throw error
//       }
//       this.logger.error(`previewInvoice: failed to generate docx file - ${error}`)
//       throw new InternalServerErrorException("Failed to generate preivew")
//     }

//     return buffer
//   }

//   async downloadInvoice(invoiceId: number){
//     throw new InternalServerErrorException("Not implemented yet")
//   }

//   async getJobDetails(invoiceId:number){
//     let invoice: Invoice|null
//     try{
//       invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}, relations: {jobExpenses: true, payments: true}})
//     }
//     catch(error){
//       this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
//       throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
//     }

//     if(!invoice){
//       throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
//     }

//     return invoice
//   }

//   async recordPayment(invoiceId: number, currentUser: CurrentUserType){
//         let invoice: Invoice|null
//     try{
//       invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}})
//     }
//     catch(error){
//       this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
//       throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
//     }

//     if(!invoice){
//       throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
//     }

//     try{
//       await this.dataSource.transaction(async (em) => {
//         const invoiceRepo = em.getRepository(Invoice)
//         const incomeRepo = em.getRepository(Income)

//         await invoiceRepo.update(invoiceId, {...invoice, status: InvoiceStatusEnum.PAID})
//         await incomeRepo.save({
//           businessId: invoice.businessId,
//           userId: currentUser.userId,
//           dateReceived: new Date(Date.now()).toISOString(),
//           amount: invoice.totalAmount,
//           reference: invoice.invoiceNumber,
//           invoice
//         })
//       })

//     } catch(error){
//       this.logger.error(`recordPayment: failed to save payment - ${error}`)
//       throw new InternalServerErrorException("Failed to record payment")
//     }
//   }

//   async voidInvoice(invoiceId:number){
//     let invoice: Invoice|null
//     try{
//       invoice = await this.invoiceRepository.findOne({where: {id: invoiceId}, relations: {jobExpenses: true, payments: true}})
//     }
//     catch(error){
//       this.logger.error(`updateDraft: failed to load ${invoiceId} in DB - ${error}`)
//       throw new InternalServerErrorException(`Failed to load ${invoiceId}`)
//     }

//     if(!invoice){
//       throw new NotFoundException(`No invoice with id: ${invoiceId} found`)
//     }

//     try{
//       await this.dataSource.transaction(async (em) => {
//         const invoiceRepo = em.getRepository(Invoice)
//         const incomeRepo = em.getRepository(Income)
//         const expenseRepo = em.getRepository(Expense)

//         await invoiceRepo.update(invoice.id, {...invoice, status: InvoiceStatusEnum.VOID})
//         await invoiceRepo.softDelete(invoice.id)

//         const incomeIds = invoice.payments.map((income) => income.id)
//         await incomeRepo.softDelete(incomeIds)

//         const expenseIds = invoice.jobExpenses.map((expense) => expense.id)
//         await expenseRepo.softDelete(expenseIds)
//       })
//     } catch(error){
//       this.logger.error(`voidInvoice: Failed to void invoice - ${error}`)
//       throw new InternalServerErrorException(`Failed to void invoice`)
//     }

//   _getInvoiceBuffer(
//     invoiceData
//   ): Buffer<ArrayBufferLike> {
//     const templatePath = path.join(process.cwd(), 'templates', 'template.docx');

//     if (!fs.existsSync(templatePath)) {
//       throw new NotFoundException(
//         `Invoice template not found at path`,
//       );
//     }

//     const content = fs.readFileSync(templatePath, 'binary');

//     const zip = new PizZip(content);
//     const doc = new Docxtemplater(zip, {
//       paragraphLoop: true,
//       linebreaks: true,
//     });

//     doc.render(invoiceData);

//     const buf = doc.getZip().generate({
//       type: 'nodebuffer',
//       compression: 'DEFLATE',
//     });
//     return buf;
//   }
//   }

//   // async payInvoice(id: number) {
//   //   let invoice: Invoice | null;

//   //   try {
//   //     invoice = await this.invoiceRepository.findOne({ where: { id } });
//   //   } catch (error) {
//   //     this.logger.error(
//   //       `payInvoice: Failed to find invoice with Id ${id} - ${error}`,
//   //     );
//   //     throw new InternalServerErrorException('Failed to find invoice');
//   //   }

//   //   if (!invoice) {
//   //     throw new NotFoundException(`No invoice with Id ${id} found`);
//   //   }

//   //   try{
//   //     await this.dataSource.transaction(async (em) => {
//   //       const invoiceRepo = em.getRepository(Invoice)
//   //       const incomeRepo = em.getRepository(Income)

//   //       const updatedInvoice = invoiceRepo.update(id, {...invoice, status: "PAID"})
//   //       const incomeToSave = incomeRepo.create({})
//   //     })
//   //     // const updatedInvoice = this.invoiceRepository.update(id, {...invoice, status: "PAID"})
//   //   } catch(error){
//   //     this.logger.error(`payInvoice: bad - ${error}`)
//   //     throw new InternalServerErrorException("Failed to update invoice")
//   //   }
//   // }

//   // updateInvoice(id: number) {}

//   // _getInvoiceBuffer(
//   //   invoiceData: NewInvoiceRequestSchema,
//   // ): Buffer<ArrayBufferLike> {
//   //   const templatePath = path.join(process.cwd(), 'templates', 'template.docx');

//   //   if (!fs.existsSync(templatePath)) {
//   //     throw new NotFoundException(
//   //       `Invoice template not found at path: ${templatePath}`,
//   //     );
//   //   }

//   //   const content = fs.readFileSync(templatePath, 'binary');

//   //   const zip = new PizZip(content);
//   //   const doc = new Docxtemplater(zip, {
//   //     paragraphLoop: true,
//   //     linebreaks: true,
//   //   });

//   //   doc.render(invoiceData);

//   //   const buf = doc.getZip().generate({
//   //     type: 'nodebuffer',
//   //     compression: 'DEFLATE',
//   //   });
//   //   return buf;
//   // }

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from './Invoice.entity';
import { Business } from 'src/Business/Business.entity';
import { InvoiceStatusEnum } from './InvoiceEnums';
import { NewInvoiceRequestSchema } from 'src/types/invoiceSchema';
import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
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

  async listInvoiceByFilter(filter, requestingUser) {
    const { businessId } = filter;
    let business: Business | null;

    try {
      business = await this.dataSource
        .getRepository(Business)
        .findOne({ where: { id: businessId, user: requestingUser.userId } });
    } catch (error) {
      this.logger.error(
        `listInvoiceByFilter: failed to find business - ${error}`,
      );
      throw new Error('Failed to find business');
    }

    if (!business) {
      throw new Error(
        'You do not have permission to view invoices for this business',
      );
    }
    console.log(business, 'I have business');
    try {
      const invoices = await this.invoiceRepository.find({
        where: { business: { id: businessId } },
      });
      return invoices;
    } catch (error) {
      this.logger.error(
        `listInvoiceByFilter: failed to fetch invoices - ${error}`,
      );
      throw new Error('Failed to fetch invoices');
    }
  }

  async createDraft(body, requestingUser) {
    let business: Business[] | null;

    try {
      business = await this.dataSource
        .getRepository(Business)
        .find({ where: { user: { id: requestingUser.userId } } });
    } catch (error) {
      this.logger.error(
        `createDraft: failed to fetch businesses for user ${requestingUser.userId} - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch related business',
      );
    }

    if (!business) {
      this.logger.error(
        `createDraft: No businesses found for user ${requestingUser.userId}`,
      );
      throw new InternalServerErrorException('No businesses found');
    }

    if (!business.find((business) => business.id === body.businessId)) {
      throw new BadRequestException('Business not belong to user');
    }

    try {
      const invoice = this.invoiceRepository.create({
        invoiceNumber: body.invoice_number,
        customerName: body.customer_name,
        totalAmount: body.amount_due,
        status: InvoiceStatusEnum.DRAFT,
        snapshotData: body,
        business: body.businessId,
      });

      return await this.invoiceRepository.save(invoice);
    } catch (error) {
      this.logger.error(`createDraft: failed to save invocie - ${error}`);
      throw new InternalServerErrorException('Failed to save invoice');
    }
  }

  async updateDraft(invoiceId, body, requestingUser) {
    let invoice: Invoice | null;

    try {
      invoice = await this.invoiceRepository.findOne({
        where: { id: invoiceId },
      });
    } catch (error) {
      this.logger.error(
        `updateDraft: failed to fetch invoice ${invoiceId} - ${error}`,
      );
      throw new InternalServerErrorException('Failed to fetch invoice');
    }

    if (!invoice) {
      throw new NotFoundException(`Invoice ${invoiceId} not found`);
    }

    let business: Business[] | null;

    try {
      business = await this.dataSource
        .getRepository(Business)
        .find({ where: { user: { id: requestingUser.userId } } });
    } catch (error) {
      this.logger.error(
        `createDraft: failed to fetch businesses for user ${requestingUser.userId} - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch related business',
      );
    }

    if (!business) {
      this.logger.error(
        `createDraft: No businesses found for user ${requestingUser.userId}`,
      );
      throw new InternalServerErrorException('No businesses found');
    }

    if (!business.find((business) => business.id === body.businessId)) {
      throw new BadRequestException('Business not belong to user');
    }

    //check invoice is draft
    if (invoice.status !== InvoiceStatusEnum.DRAFT) {
      throw new BadRequestException('Invoice is not a draft');
    }

    try {
      return await this.invoiceRepository.update(invoiceId, {
        invoiceNumber: body.invoice_number,
        customerName: body.customer_name,
        totalAmount: body.amount_due,
        status: InvoiceStatusEnum.DRAFT,
        snapshotData: body,
        business: body.businessId,
      });
    } catch (error) {
      this.logger.error(
        `updateDraft: failed to update invoice ${invoiceId} - ${error}`,
      );
      throw new InternalServerErrorException('Failed to update invoice ');
    }
  }

  async deleteDraft(invoiceId, requestingUser) {
    let business: Business[] | null;

    try {
      business = await this.dataSource
        .getRepository(Business)
        .find({ where: { user: { id: requestingUser.userId } } });
    } catch (error) {
      this.logger.error(
        `createDraft: failed to fetch businesses for user ${requestingUser.userId} - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch related business',
      );
    }

    if (!business) {
      this.logger.error(
        `createDraft: No businesses found for user ${requestingUser.userId}`,
      );
      throw new InternalServerErrorException('No businesses found');
    }

    let invoice: Invoice | null;
    try {
      invoice = await this.invoiceRepository.findOne({
        where: { id: invoiceId },
      });
    } catch (error) {
      this.logger.error(
        `deleteDraft: Failed to find invoice ${invoiceId} - ${error}`,
      );
      throw new InternalServerErrorException('Failed to find invoice');
    }

    if (!invoice) {
      throw new NotFoundException(`Invoice ${invoiceId} was not found`);
    }

    if (invoice.status !== InvoiceStatusEnum.DRAFT) {
      throw new BadRequestException(`Invoive ${invoiceId} is not a draft`);
    }

    try {
      const deleted = await this.invoiceRepository.delete(invoiceId);

      return deleted.affected;
    } catch (error) {
      this.logger.error(
        `deleteDraft:k failed to delete invoice ${invoiceId} - ${error} `,
      );
      throw new InternalServerErrorException('Failed to delete invoice');
    }
  }

  async voidInvoice(invoiceId, requestingUser) {
    let business: Business[] | null;

    try {
      business = await this.dataSource
        .getRepository(Business)
        .find({ where: { user: { id: requestingUser.userId } } });
    } catch (error) {
      this.logger.error(
        `createDraft: failed to fetch businesses for user ${requestingUser.userId} - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch related business',
      );
    }

    if (!business) {
      this.logger.error(
        `createDraft: No businesses found for user ${requestingUser.userId}`,
      );
      throw new InternalServerErrorException('No businesses found');
    }

    let invoice: Invoice | null;
    try {
      invoice = await this.invoiceRepository.findOne({
        where: { id: invoiceId },
      });
    } catch (error) {
      this.logger.error(
        `deleteDraft: Failed to find invoice ${invoiceId} - ${error}`,
      );
      throw new InternalServerErrorException('Failed to find invoice');
    }

    if (!invoice) {
      throw new NotFoundException(`Invoice ${invoiceId} was not found`);
    }

    if (invoice.status === InvoiceStatusEnum.DRAFT) {
      throw new BadRequestException(
        `Invoive ${invoiceId} is a draft and cannot be fully deleted`,
      );
    }

    try {
      const deleted = await this.invoiceRepository.softDelete(invoiceId);

      return deleted.affected;
    } catch (error) {
      this.logger.error(
        `deleteDraft:k failed to delete invoice ${invoiceId} - ${error} `,
      );
      throw new InternalServerErrorException('Failed to delete invoice');
    }
  }

  async previewInvoice(invoiceId: number, requestingUser) {
    let invoice: Invoice | null;

    try {
      invoice = await this.invoiceRepository.findOne({
        where: { id: invoiceId },
      });
    } catch (error) {
      this.logger.error(
        `previewInvoice: Failed to fetch ${invoiceId} from db - ${error}`,
      );
      throw new InternalServerErrorException(`Failed to fetch invoice`);
    }

    if (!invoice) {
      throw new NotFoundException(`No invoice ${invoiceId} was found`);
    }
    let business: Business[] | null;

    try {
      business = await this.dataSource
        .getRepository(Business)
        .find({ where: { user: { id: requestingUser.userId } } });
    } catch (error) {
      this.logger.error(
        `createDraft: failed to fetch businesses for user ${requestingUser.userId} - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch related business',
      );
    }

    if (!business) {
      this.logger.error(
        `createDraft: No businesses found for user ${requestingUser.userId}`,
      );
      throw new InternalServerErrorException('No businesses found');
    }

    // if (!business.find((business) => business.id === body.businessId)) {
    //   throw new BadRequestException('Business not belong to user');
    // }

    let buffer: Buffer<ArrayBufferLike>;
    try {
      buffer = this._getInvoiceBuffer(invoice.snapshotData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(`_getInvoiceBuffer: Template not found - ${error}`);
        throw error;
      }
      this.logger.error(
        `previewInvoice: failed to generate docx file - ${error}`,
      );
      throw new InternalServerErrorException('Failed to generate preivew');
    }

    return buffer;
  }

  async downloadInvoice(invoiceId: number, requestingUser) {
    let invoice: Invoice | null;

    try {
      invoice = await this.invoiceRepository.findOne({
        where: { id: invoiceId },
      });
    } catch (error) {
      this.logger.error(
        `previewInvoice: Failed to fetch ${invoiceId} from db - ${error}`,
      );
      throw new InternalServerErrorException(`Failed to fetch invoice`);
    }

    if (!invoice) {
      throw new NotFoundException(`No invoice ${invoiceId} was found`);
    }
    let business: Business[] | null;

    try {
      business = await this.dataSource
        .getRepository(Business)
        .find({ where: { user: { id: requestingUser.userId } } });
    } catch (error) {
      this.logger.error(
        `createDraft: failed to fetch businesses for user ${requestingUser.userId} - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch related business',
      );
    }

    if (!business) {
      this.logger.error(
        `createDraft: No businesses found for user ${requestingUser.userId}`,
      );
      throw new InternalServerErrorException('No businesses found');
    }

    let buffer: Buffer<ArrayBufferLike>;
    try {
      buffer = this._getInvoiceBuffer(invoice.snapshotData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(`_getInvoiceBuffer: Template not found - ${error}`);
        throw error;
      }
      this.logger.error(
        `previewInvoice: failed to generate docx file - ${error}`,
      );
      throw new InternalServerErrorException('Failed to generate preivew');
    }

    return buffer;
  }

  _getInvoiceBuffer(invoiceData): Buffer<ArrayBufferLike> {
    const templatePath = path.join(process.cwd(), 'templates', 'template.docx');

    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(
        `Invoice template not found at path: ${templatePath}`,
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
