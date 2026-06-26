import { useQuery } from "@tanstack/react-query";
import { incomeApiClient } from "../../api/IncomeApiClient";

export const useGetIncome = () => {
  return useQuery({
    queryKey: ["getIncome"],
    queryFn: () => incomeApiClient.getIncome(),
  });
};
