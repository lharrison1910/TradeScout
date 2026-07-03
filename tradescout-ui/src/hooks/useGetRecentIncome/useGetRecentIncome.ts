import { useQuery } from "@tanstack/react-query";
import { incomeApiClient } from "../../api/IncomeApiClient";

export const useGetRecentIncome = () => {
  return useQuery({
    queryKey: ["getRecentIncome"],
    queryFn: () => incomeApiClient.getRecentIncome(),
  });
};
