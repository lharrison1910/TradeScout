import { BaseApi } from "./BaseApi";

class IncomeApiClient extends BaseApi {
  private readonly income = "income";
  private static instance: IncomeApiClient;

  constructor() {
    super();
  }

  static getInstance(): IncomeApiClient {
    if (!IncomeApiClient.instance) {
      IncomeApiClient.instance = new IncomeApiClient();
    }
    return IncomeApiClient.instance;
  }

  async getIncome() {
    return await this.get(this.income);
  }

  async createIncome(payload: FormData) {
    return await this.post(this.income, payload);
  }
}

export const incomeApiClient = IncomeApiClient.getInstance();
