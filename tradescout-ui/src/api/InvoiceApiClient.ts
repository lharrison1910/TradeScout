import type { NewInvoiceRequestSchema } from "../types/invoiceSchema";
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

  async newInvoice(payload: NewInvoiceRequestSchema) {
    const body = JSON.stringify(payload);

    return await this.blob(`${this.invoice}`, body);
  }
}

export const invoiceApiClient = InvoiceApiClient.getInstance();
