import { InvoiceStatusEnum } from "src/Invoice/InvoiceEnums";

interface MaterialDto  {
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  line_total: number;
};
export interface InvoiceDto  {
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
};

export interface NewInvoiceRequestSchema {
  businessId: string
  totalAmount: number;
  status: InvoiceStatusEnum;
  snapshotData: InvoiceDto;
}
