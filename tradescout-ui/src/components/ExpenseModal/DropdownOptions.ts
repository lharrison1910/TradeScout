import { HmrcCategoryEnum } from "../../types/HmrcCategoryEnum";

export const CategoryLabels: Record<HmrcCategoryEnum, string> = {
  [HmrcCategoryEnum.COST_OF_GOODS]: "Materials & Stock",
  [HmrcCategoryEnum.CIS_SUBCONTRACTORS]: "Subcontractors (CIS)",
  [HmrcCategoryEnum.STAFF_WAGES]: "Staff Wages & Payroll",
  [HmrcCategoryEnum.CAR_AND_TRAVEL]: "Van, Fuel & Travel",
  [HmrcCategoryEnum.RENT_RATES_POWER]: "Workshop Rent & Utilities",
  [HmrcCategoryEnum.REPAIRS_MAINTENANCE]: "Tool & Equipment Repairs",
  [HmrcCategoryEnum.ADMIN_OFFICE]: "Office, Phone & Software",
  [HmrcCategoryEnum.ADVERTISING]: "Advertising (Checkatrade, Flyers)",
  [HmrcCategoryEnum.FINANCIAL_CHARGES]: "Bank Fees & Interest",
  [HmrcCategoryEnum.BAD_DEBTS]: "Unpaid Bills (Bad Debts)",
  [HmrcCategoryEnum.PROFESSIONAL_FEES]: "Accountant & Insurance",
  [HmrcCategoryEnum.DEPRECIATION]: "Equipment Depreciation",
  [HmrcCategoryEnum.OTHER]: "Other Business Expenses",
};
