import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";

export const useDeleteDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteDraft"],
    mutationFn: (invoiceId: number) =>
      invoiceApiClient.deleteInvoice(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetInvoices"] });
    },
  });
};
