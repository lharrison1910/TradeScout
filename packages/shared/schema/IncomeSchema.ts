import { z } from "Zod";

export const IncomeBaseSchema = z.object({
  amount: z.number().min(1, { message: "Must be greater than 0" }),
  paymentType: z.string().min(1, { message: "Please select an option" }),
  source: z.string(),
  dateReceived: z.string(),
});
