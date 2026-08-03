import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";
import { useToast } from "../useToast/useToast";

export const usePayInvoice = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["payinvoice"],
    mutationFn: (id: number) => invoiceApiClient.payInvoice(id),
    onSuccess: () => {
      toast.success("Successfully updated");
      queryClient.invalidateQueries({ queryKey: ["useGetInvoice"] });
    },
  });
};
