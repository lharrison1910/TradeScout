import { MtdIncomeCategory } from './IncomeCategory';

export interface CreateIncomeDto {
  businessId: string;
  dateReceived: string;
  amount: number;
  category: MtdIncomeCategory;
  isDailyTotal: boolean;
  reference: string;
}
