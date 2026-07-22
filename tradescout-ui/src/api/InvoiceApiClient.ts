import { BaseApi } from "./BaseApi";

class InvoiceApiClient extends BaseApi {
  private static instance: InvoiceApiClient;
  private readonly invoice = "invoice";

  static getInstance(): InvoiceApiClient {
    if (!InvoiceApiClient.instance) {
      InvoiceApiClient.instance = new InvoiceApiClient();
    }
    return InvoiceApiClient.instance;
  }

  async newInvoice() {
    const body = JSON.stringify({
      businessId: "3ab24cb9-0aff-47d7-8f50-4e941672feb3",
      invoice_number: "INV-2026-0089",
      invoice_date: "2026-07-21",
      due_date: "2026-08-04",

      customer_name: "Sarah Jenkins",
      customer_address: "42 High Street, Hounslow, London, TW3 1AA",
      customer_phone: "+44 7911 123456",
      customer_email: "s.jenkins@example.co.uk",

      job_location: "42 High Street (Bathroom Plumbing & Tiling)",
      job_reference: "JOB-2026-042",

      materials: [
        {
          description: "15mm Copper Pipe (3m length)",
          quantity: 4,
          unit: "lengths",
          unit_price: 12.5,
          line_total: 50.0,
        },
        {
          description: "Thermostatic Mixer Shower Valve",
          quantity: 1,
          unit: "unit",
          unit_price: 185.0,
          line_total: 185.0,
        },
        {
          description: "Flexible Pipe Connectors & Fittings",
          quantity: 6,
          unit: "pack",
          unit_price: 4.25,
          line_total: 25.5,
        },
        {
          description: "Plumbing & Installation Labor",
          quantity: 8,
          unit: "hrs",
          unit_price: 45.0,
          line_total: 360.0,
        },
      ],

      subtotal: "620.50",
      vat_rate: "20",
      vat_amount: "124.10",
      discount: "0.00",
      amount_due: "744.60",

      bank_name: "Barclays Bank UK",
      account_name: "Apex Trade Services Ltd",
      sort_code: "20-40-60",
      account_number: "87654321",
      payment_terms_days: "14",
    });

    return await this.blob(`${this.invoice}`, body);
  }
}

export const invoiceApiClient = InvoiceApiClient.getInstance();
