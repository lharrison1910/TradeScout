import type { Dayjs } from "dayjs";

export type MaterialDto = {
  description: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type InvoiceDetails = {
  invoice_number: string;
  invoice_date: Dayjs;
  due_date: Dayjs;
};

export type InvoiceCustomerDetails = {
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  customer_email: string;
};

export type InvoiceJobDetails = {
  job_location: string;
  job_reference: string;
  materials: MaterialDto[];
};

export type InvoicePaymentDetails = {
  subtotal: string;
  vat_rate: string;
  vat_amount: string;
  discount: string;
  amount_due: string;
};

export type InvoiceBankDetails = {
  bank_name: string;
  account_name: string;
  sort_code: string;
  account_number: string;
  payment_terms_days: string;
};

export type NewInvoiceRequestSchema = InvoiceDetails &
  InvoiceCustomerDetails &
  InvoiceJobDetails &
  InvoicePaymentDetails &
  InvoiceBankDetails;
