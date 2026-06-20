import { v4 as uuidv4 } from 'uuid';
import { MtdIncomeCategory } from '../Income/IncomeCategory';

const mockBusinessId: string = uuidv4();

export const mockIncomeData = [
  {
    businessId: mockBusinessId,
    dateReceived: '2026-04-10T09:30:00Z',
    amount: 850.0,
    category: MtdIncomeCategory.TURNOVER,
    isDailyTotal: false,
    reference: 'Invoice #1042 - Boiler Installation',
  },
  {
    businessId: mockBusinessId,
    dateReceived: '2026-04-14T14:15:00Z',
    amount: 120.5,
    category: MtdIncomeCategory.TURNOVER,
    isDailyTotal: false,
    reference: 'Invoice #1043 - Emergency Callout (Leak)',
  },
  {
    businessId: mockBusinessId,
    dateReceived: '2026-04-20T17:00:00Z',
    amount: 340.0,
    category: MtdIncomeCategory.TOTAL_INCOME,
    isDailyTotal: true,
    reference: 'Daily Cash Takings - Hardware Counter',
  },
  {
    businessId: mockBusinessId,
    dateReceived: '2026-05-02T11:00:00Z',
    amount: 2200.0,
    category: MtdIncomeCategory.TURNOVER,
    isDailyTotal: false,
    reference: 'Invoice #1044 - Full Bathroom Refit Deposit',
  },
  {
    businessId: mockBusinessId,
    dateReceived: '2026-05-15T08:45:00Z',
    amount: 60.0,
    category: MtdIncomeCategory.TOTAL_INCOME,
    isDailyTotal: true,
    reference: 'Daily Cash Takings',
  },
];
