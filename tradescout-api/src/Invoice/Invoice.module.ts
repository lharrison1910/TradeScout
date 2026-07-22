import { Module } from '@nestjs/common';
import { InvoiceService } from './Invoice.service';
import { InvoiceController } from './Invoice.controller';

@Module({
  imports: [],
  providers: [InvoiceService],
  controllers: [InvoiceController],
  exports: [InvoiceService],
})
export class InvoiceModule {}
