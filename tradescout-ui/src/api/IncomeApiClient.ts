import { BaseApi } from "./BaseApi";

class IncomeApiClient extends BaseApi {
  private readonly income = "income";
  private static instance: IncomeApiClient;

  constructor() {
    super();
    this.getIncome.bind(this);
    this.getRecentIncome.bind(this);
    this.createIncome.bind(this);
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

  async getRecentIncome() {
    return await this.get(`${this.income}/recents`);
  }

  async createIncome(payload: FormData) {
    return await this.post(this.income, payload);
  }
}

export const incomeApiClient = IncomeApiClient.getInstance();
