import { Injectable, NotFoundException } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { NewInvoiceRequestSchema } from '../types/invoiceSchema';
@Injectable()
export class InvoiceService {
  constructor() {}

  newInvoice(invoiceData: NewInvoiceRequestSchema) {
    const templatePath = path.join(process.cwd(), 'templates', 'template.docx');

    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(
        `Invoice template not found at path: ${templatePath}`,
      );
    }

    const content = fs.readFileSync(templatePath, 'binary');
    console.log(content.length);

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
