import { z } from "Zod";

export const IncomeBaseSchema = z.object({
  total: z.number().min(1, { message: "Must be greater than 0" }),
  paymentType: z.string().min(1, { message: "Please select an option" }),
  job: z.number(),
  dateRecieved: z.string(),
});
