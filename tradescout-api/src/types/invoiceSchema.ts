interface MaterialDto {
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  line_total: number;
}
export interface InvoiceSchema {
  invoice_number: string;
  invoice_date: string;
  due_date: string;

  customer_name: string;
  customer_address: string;
  customer_phone: string;
  customer_email: string;

  job_location: string;
  job_reference: string;

  materials: MaterialDto[];

  subtotal: string;
  vat_rate: string;
  vat_amount: string;
  discount: string;
  amount_due: string;

  bank_name: string;
  account_name: string;
  sort_code: string;
  account_number: string;
  payment_terms_days: string;
}

export enum InvoiceStatusEnum {
  DRAFT = 'DRAFT',
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PARTIAL = 'PARTIAL',
  VOID = 'VOID',
}
export interface NewInvoiceRequestSchema {
  invoiceNumber: string;
  customerName: string;
  totalAmount: string;
  status: InvoiceStatusEnum;
  snapshotData?: InvoiceSchema;
  fileUrl?: string;
  businessId: number;
}

export interface UpdateInvoiceRequestSchema extends NewInvoiceRequestSchema {
  id: number;
}
