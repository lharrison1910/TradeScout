import { useQuery } from "@tanstack/react-query";
import { expenseApiClient } from "../../api/ExpenseApiClient";

export const useGetExpense = () => {
  return useQuery({
    queryKey: ["getExpense"],
    queryFn: () => expenseApiClient.getExpense(),
  });
};
