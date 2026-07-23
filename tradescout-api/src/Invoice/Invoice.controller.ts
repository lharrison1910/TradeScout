import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { InvoiceService } from './Invoice.service';
import type { NewInvoiceRequestSchema } from '../types/invoiceSchema';
import type { Response } from 'express';

@Controller('invoice')
export class InvoiceController {
  constructor(
    @Inject(InvoiceService)
    private readonly invoiceService: InvoiceService,
  ) {}

  // @Post()
  // newInvoice(@Body() body: NewInvoiceRequestSchema, @Res() res: Response) {
  //   const fileBuffer = this.invoiceService.newInvoice(body);

  //   res.set({
  //     'Content-Type':
  //       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //     'Content-Disposition': `attachment; filename=Invoice_${body.invoice_number}.docx`,
  //     'Content-Length': fileBuffer.length,
  //   });

  //   res.send(fileBuffer);
  // }
}
