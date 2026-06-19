export enum MtdExpenseCategory {
  COST_OF_GOODS = 'cost_of_goods', // Materials, stock, direct production costs
  SUBCONTRACTORS = 'subcontractors', // CIS payments to subcontractors
  WAGES_STAFF = 'wages_staff', // Salaries, employer NICs, pensions
  VEHICLES_TRAVEL = 'vehicles_travel', // Fuel, parking, train fares, simplified mileage
  PREMISES_UTILITIES = 'premises_utilities', // Rent, rates, water, electricity, property insurance
  REPAIRS_MAINTENANCE = 'repairs_maintenance', // Repairs to property or equipment
  OFFICE_PHONE = 'office_phone', // Mobile bills, internet, stationery, printing
  ADVERTISING_MARKETING = 'advertising_marketing', // Website costs, online ads, printed flyers
  FINANCE_CHARGES = 'finance_charges', // Bank fees, credit card charges, loan interest
  PROFESSIONAL_FEES = 'professional_fees', // Accountants, lawyers, insurance premiums
  OTHER_EXPENSES = 'other_expenses', // Trade journals, subscriptions, training courses
  PROPERTY_FINANCE = 'property_finance', // Mortgage interest on residential lettings (strictly separated)
  TOTAL_EXPENSES = 'total_expenses',
}
