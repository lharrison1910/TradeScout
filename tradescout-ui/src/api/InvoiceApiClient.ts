// import type { NewInvoiceRequestSchema } from "../types/invoiceSchema";
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

  async createInvoice(payload) {
    const body = JSON.stringify(payload);

    return await this.post(`${this.invoice}/draft`, body);
  }

  async udpdateDraft(payload) {
    const body = JSON.stringify(payload);

    return await this.put(`${this.invoice}/${payload.id}/draft`, body);
  }

  async getPreview(id: number) {
    return await this.blob(`${this.invoice}/${id}/preview`);
  }

  async deleteDraft(id: number) {
    return await this.delete(`${this.invoice}/${id}`);
  }

  async issueInvoice(id: number) {
    return await this.post(`${this.invoice}/${id}/issue`, "");
  }

  async downloadInvoice(id: number) {
    console.log("Not working");
    return await this.get(`${this.invoice}/${id}/download`);
  }

  async getInvoicesByQuery() {
    return await this.get(this.invoice);
  }

  async payInvoice(id: number) {
    return await this.post(`${this.invoice}/${id}/pay`, "");
  }

  async voidInvoice(id: number) {
    return await this.post(`${this.invoice}/${id}/void`, "");
  }
}

export const invoiceApiClient = InvoiceApiClient.getInstance();
