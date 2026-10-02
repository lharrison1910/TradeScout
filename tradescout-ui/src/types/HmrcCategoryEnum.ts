export const HmrcCategoryEnum = {
  COST_OF_GOODS: "COST_OF_GOODS",
  CIS_SUBCONTRACTORS: "CIS_SUBCONTRACTORS",
  STAFF_WAGES: "STAFF_WAGES",
  CAR_AND_TRAVEL: "CAR_AND_TRAVEL",
  RENT_RATES_POWER: "RENT_RATES_POWER",
  REPAIRS_MAINTENANCE: "REPAIRS_MAINTENANCE",
  ADMIN_OFFICE: "ADMIN_OFFICE",
  ADVERTISING: "ADVERTISING",
  FINANCIAL_CHARGES: "FINANCIAL_CHARGES", // Bank charges, interest
  BAD_DEBTS: "BAD_DEBTS", // Unpaid invoices written off
  PROFESSIONAL_FEES: "PROFESSIONAL_FEES", // Accountant, legal, public liability
  DEPRECIATION: "DEPRECIATION", // Capital allowances/equipment depreciation
  OTHER: "OTHER",
} as const;

export type HmrcCategoryEnum =
  (typeof HmrcCategoryEnum)[keyof typeof HmrcCategoryEnum];

export const MtdIncomeCategory = {
  TURNOVER: "turnover",
  OTHER_BUSINESS_INCOME: "other_business_income",
  RENT_RECEIVED: "rent_received",
  TOTAL_INCOME: "total_income",
} as const;

export type MtdIncomeCategory =
  (typeof MtdIncomeCategory)[keyof typeof MtdIncomeCategory];
