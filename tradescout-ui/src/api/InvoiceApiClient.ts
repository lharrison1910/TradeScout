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

  async createInvoice(payload) {
    const body = JSON.stringify(payload);

    return await this.post(`${this.invoice}/draft`, body);
  }

  async updateDraft(payload) {
    const body = JSON.stringify(payload);

    return await this.put(`${this.invoice}/${payload.id}/preview`, body);
  }

  async getPreview(id: number) {
    return await this.blob(`${this.invoice}/${id}/preview`);
  }

  async deleteInvoice(id: number) {
    return await this.delete(`${this.invoice}/${id}`);
  }
}

export const invoiceApiClient = InvoiceApiClient.getInstance();
