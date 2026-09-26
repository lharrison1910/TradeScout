import { InvoiceStatusEnum } from '../Invoice/InvoiceEnums'; 

export const mockInvoices = [
  {
    invoiceNumber: 'INV-2023-001',
    customerName: 'Acme Corporation',
    totalAmount: 1500.50,
    status: InvoiceStatusEnum.PAID,
    issuedAt: new Date('2023-01-15T09:00:00Z'),
  },
  {
    invoiceNumber: 'INV-2023-002',
    customerName: 'Globex Inc',
    totalAmount: 340.00,
    status: InvoiceStatusEnum.UNPAID,
    issuedAt: new Date('2023-02-10T10:30:00Z'),
  },
  {
    invoiceNumber: 'INV-2023-003',
    customerName: 'Soylent Corp',
    totalAmount: 5200.75,
    status: InvoiceStatusEnum.DRAFT,
    issuedAt: null,
  },
  {
    invoiceNumber: 'INV-2023-004',
    customerName: 'Initech',
    totalAmount: 899.99,
    status: InvoiceStatusEnum.PARTIAL,
    issuedAt: new Date('2023-03-05T14:15:00Z'),
  },
  {
    invoiceNumber: 'INV-2023-005',
    customerName: 'Umbrella Corporation',
    totalAmount: 125.00,
    status: InvoiceStatusEnum.UNPAID,
    issuedAt: new Date('2023-04-20T11:45:00Z'),
  },
  {
    invoiceNumber: 'INV-2023-006',
    customerName: 'Massive Dynamic',
    totalAmount: 8450.00,
    status: InvoiceStatusEnum.DRAFT,
    issuedAt: null,
  },
  {
    invoiceNumber: 'INV-2023-007',
    customerName: 'Stark Industries',
    totalAmount: 10500.25,
    status: InvoiceStatusEnum.PAID,
    issuedAt: new Date('2023-05-12T08:20:00Z'),
  },
  {
    invoiceNumber: 'INV-2023-008',
    customerName: 'Wayne Enterprises',
    totalAmount: 450.50,
    status: InvoiceStatusEnum.VOID,
    issuedAt: new Date('2023-06-01T16:00:00Z'),
  },
];