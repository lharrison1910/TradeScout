import { BaseApi } from "./BaseApi";

class ExpenseApiClient extends BaseApi {
  private readonly expense = "expense";
  private static instance: ExpenseApiClient;

  constructor() {
    super();
  }

  static getInstance(): ExpenseApiClient {
    if (!ExpenseApiClient.instance) {
      ExpenseApiClient.instance = new ExpenseApiClient();
    }

    return ExpenseApiClient.instance;
  }

  async getExpense() {
    return await this.get(this.expense);
  }
}

export const expenseApiClient = ExpenseApiClient.getInstance();
