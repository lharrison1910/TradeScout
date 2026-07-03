import { MtdIncomeCategory } from './IncomeCategory';

export interface CreateIncomeDto {
  businessId: string;
  dateReceived: string;
  amount: number;
  category: MtdIncomeCategory;
  paymentMethod: string;
  isDailyTotal: boolean;
  reference: string;
}

export interface UpdateIncomeDto extends CreateIncomeDto {
  id: number;
}
