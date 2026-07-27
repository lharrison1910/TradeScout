import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { InvoiceService } from './Invoice.service';
import type { NewInvoiceRequestSchema } from '../types/invoiceSchema';
import type { Response } from 'express';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import type { CurrentUserType } from 'src/types/currentUser';

@UseGuards(AuthGuard('jwt'))
@Controller('invoice')
export class InvoiceController {
  constructor(
    @Inject(InvoiceService)
    private readonly invoiceService: InvoiceService,
  ) {}

  @Post("/draft")
  async createDraft(@CurrentUser() currentUser:CurrentUserType,@Body() body: NewInvoiceRequestSchema){
    return await this.invoiceService.createDraft(body, currentUser)
  }

  @Put(":id/draft")
  async updateDraft(@Param('id') id: number, @Body() body, @CurrentUser() currentUser:CurrentUserType){
    return await this.invoiceService.updateDraft(body, id, currentUser)
  }

  @Get(':id/preview')
  async getPreview(@Param('id') id: number,@Res() res: Response){
    const fileBuffer =  await this.invoiceService.previewInvoice(id)

    res.set({
      'Content-Type':
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=Invoice_${id}.docx`,
      'Content-Length': fileBuffer.length,
    });

    res.send(fileBuffer);
  }

  @Delete(":id")
  async deleteDraft(@Param('id') id: number){
    return await this.invoiceService.deleteDraft(id)
  }

  @Post(':id/issue')
  async issueInvoice(@Param('id') id: number,@Res() res: Response){
    const fileBuffer = await this.invoiceService.issueInvoice(id)

    res.set({
      'Content-Type':
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=Invoice_${id}.docx`,
      'Content-Length': fileBuffer.length,
    });

    res.send(fileBuffer);
  }

  @Get(":id/download")
  async downloadInvoice(@Param('id') id: number,@Res() res: Response){
        const fileBuffer = await this.invoiceService.downloadInvoice(id)

    // res.set({
    //   'Content-Type':
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    //   'Content-Disposition': `attachment; filename=Invoice_${id}.docx`,
    //   'Content-Length': fileBuffer.length,
    // });

    res.send(fileBuffer);
  }

  @Get(':id')
  async getJobDetails(@Param('id') id: number){
    return await this.invoiceService.getJobDetails(id)
  }

  @Post(':id/pay')
  async recordPayment(@Param('id') id: number, @CurrentUser() currentUser:CurrentUserType){
    return await this.invoiceService.recordPayment(id, currentUser)
  }

  @Post(':id/void')
  async voidInvoice(@Param('id') id: number){
    return await this.invoiceService.voidInvoice(id)
  }

  @Get()
  async findAllByQuery(){
    return await this.invoiceService.listInvoiceByFilter({})
  }



  // @Post()
  // async newInvoice(@Body() body: NewInvoiceRequestSchema, @Res() res: Response) {
  //   const fileBuffer = await this.invoiceService.newInvoice(body);

  //   res.set({
  //     'Content-Type':
  //       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //     'Content-Disposition': `attachment; filename=Invoice_${body.invoice_number}.docx`,
  //     'Content-Length': fileBuffer.length,
  //   });

  //   res.send(fileBuffer);
  // }
}
