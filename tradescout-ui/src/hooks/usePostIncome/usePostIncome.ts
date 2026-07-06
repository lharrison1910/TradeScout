import { useMutation } from "@tanstack/react-query";
import { incomeApiClient } from "../../api/IncomeApiClient";

export const usePostIncome = () => {
  return useMutation({
    mutationKey: ["postIncome"],
    mutationFn: (payload: FormData) => incomeApiClient.createIncome(payload),
  });
};
