import { MtdExpenseCategory } from './ExpernseCategory';

export interface CreateExpenseDto {
  businessId: string;
  datePaid: string;
  amount: number;
  category: MtdExpenseCategory;
  isMileageClaim: boolean;
  isCapitalAsset: boolean;
  description?: string;
}
