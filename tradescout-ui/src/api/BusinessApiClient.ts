import { BaseApi } from "./BaseApi";

class BusinessApiClient extends BaseApi {
  private static instance: BusinessApiClient;
  private readonly business = "business";

  static getInstance(): BusinessApiClient {
    if (!BusinessApiClient.instance) {
      BusinessApiClient.instance = new BusinessApiClient();
    }
    return BusinessApiClient.instance;
  }

  async getBusinesses() {
    return await this.get(`${this.business}`);
  }

  async recentTransaction() {
    return await this.get(`${this.business}/recent`);
  }

  async newBusiness(payload) {
    const body = JSON.stringify(payload);
    return await this.post(`${this.business}`, body);
  }

  async updateBusiness(payload) {
    const body = JSON.stringify(payload);
    return await this.put(`${this.business}`, body);
  }

  async deleteBusiness(businessId: string) {
    return await this.delete(`${this.business}/${businessId}`);
  }
}

export const businessApiClient = BusinessApiClient.getInstance();
