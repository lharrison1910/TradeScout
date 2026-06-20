import { v4 as uuidv4 } from 'uuid';
import { MtdExpenseCategory } from '../Expense/ExpernseCategory';

const mockBusinessId: string = uuidv4();

export const mockExpenseData = [
  {
    businessId: mockBusinessId,
    datePaid: '2026-04-12T08:00:00Z',
    amount: 145.2,
    category: MtdExpenseCategory.COST_OF_GOODS,
    isMileageClaim: false,
    isCapitalAsset: false,
    description: 'Screwfix - Copper pipes and fittings',
    receiptImageUrl: 'https://s3.tradescout.mock/receipts/exp-001.jpg',
  },
  {
    businessId: mockBusinessId,
    datePaid: '2026-04-18T16:30:00Z',
    amount: 54.0,
    category: MtdExpenseCategory.VEHICLES_TRAVEL,
    isMileageClaim: true,
    isCapitalAsset: false,
    description: '120 Business Miles - Travel to site',
    receiptImageUrl: null,
  },
  {
    businessId: mockBusinessId,
    datePaid: '2026-04-25T09:15:00Z',
    amount: 280.0,
    category: MtdExpenseCategory.TOTAL_EXPENSES,
    isMileageClaim: false,
    isCapitalAsset: false,
    description: 'Weekly consolidated expenses',
    receiptImageUrl: null,
  },
  {
    businessId: mockBusinessId,
    datePaid: '2026-05-05T14:00:00Z',
    amount: 45.0,
    category: MtdExpenseCategory.OFFICE_PHONE,
    isMileageClaim: false,
    isCapitalAsset: false,
    description: 'O2 Mobile Bill (Business Portion)',
    receiptImageUrl: 'https://s3.tradescout.mock/receipts/exp-004.pdf',
  },
  {
    businessId: mockBusinessId,
    datePaid: '2026-05-20T10:00:00Z',
    amount: 28000.0,
    category: MtdExpenseCategory.OTHER_EXPENSES,
    isMileageClaim: false,
    isCapitalAsset: true,
    description: 'New Ford Transit Custom Van',
    receiptImageUrl: 'https://s3.tradescout.mock/receipts/exp-005-invoice.pdf',
  },
];
