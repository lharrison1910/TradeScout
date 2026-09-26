import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";
import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";

export type UpdateInvoicePayload = NewInvoiceRequestSchema & { id: number };

export const useEditInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateInvoice"],
    mutationFn: (body: UpdateInvoicePayload) =>
      invoiceApiClient.updateDraft(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
