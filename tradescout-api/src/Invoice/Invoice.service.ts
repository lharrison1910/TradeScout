import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import {
  NewInvoiceRequestSchema,
  UpdateInvoiceRequestSchema,
} from '../types/invoiceSchema';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './Invoice.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm/browser';
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

  async generatePreview() {}
  async createDraft(newInvoice: NewInvoiceRequestSchema) {
    try {
      const invoiceToSave = this.invoiceRepository.create({
        ...newInvoice,
        totalAmount: Number(newInvoice.totalAmount),
      });
      const invoice = await this.invoiceRepository.save(invoiceToSave);
      return { invoiceId: invoice.id };
    } catch (error) {
      this.logger.error(`createDraft: Error saving o db -  ${error}`);
      throw new InternalServerErrorException('Failed to create invoice');
    }
  }
  async updateDraft(updatedInvoice: UpdateInvoiceRequestSchema) {
    const { id } = updatedInvoice;
    let invoice: Invoice | null;

    try {
      invoice = await this.invoiceRepository.findOne({
        where: { id: id },
      });
    } catch (error) {
      this.logger.error(`updateDraft: Failed to find invoice ${id} - ${error}`);
      throw new InternalServerErrorException('Failed to find invoice');
    }

    if (!invoice) {
      throw new NotFoundException(`No invoice with id ${id} was found`);
    }

    try {
      await this.invoiceRepository.update(id, {
        ...updatedInvoice,
        totalAmount: Number(updatedInvoice.totalAmount),
      });
    } catch (error) {
      this.logger.error(
        `updateDraft: failed to update invoice ${id} - ${error}`,
      );
      throw new InternalServerErrorException('Failed to update invoice');
    }
  }
  async deleteDraft() {}

  async issueInvoice() {}
  async downloadInvoice() {}

  async getInvoiceById() {}
  async recordPaymnet() {}
  async expense() {}

  async getInvoicesByFilter() {}
  async voidInvoice() {}

  // async newInvoice(invoiceData: NewInvoiceRequestSchema) {
  //   let buffer: Buffer<ArrayBufferLike>;
  //   let invoice: Invoice;
  //   try {
  //     buffer = this._getInvoiceBuffer(invoiceData);
  //   } catch (error) {
  //     this.logger.error(
  //       `newInvoice: failed to generate invoice buffer - ${error}`,
  //     );
  //     throw new InternalServerErrorException('Failed to generate Invoice');
  //   }
  //   try {
  //     const invoiceToSave = this.invoiceRepository.create({
  //       customerName: invoiceData.customer_name,
  //       amountDue: Number(invoiceData.amount_due),
  //       url: 'this will be minio',
  //     });

  //     invoice = await this.invoiceRepository.save(invoiceToSave);
  //   } catch (error) {
  //     this.logger.error(
  //       `newInvoice: Something went wrong saving to db - ${error}`,
  //     );
  //     throw new InternalServerErrorException('Failed to load invoice');
  //   }

  //   return { invoice, buffer };
  // }

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
}
