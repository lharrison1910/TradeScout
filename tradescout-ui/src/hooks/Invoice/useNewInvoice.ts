import { useMutation } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";
import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";

export const useNewInvoice = () =>
  useMutation({
    mutationKey: ["NewInvoice"],
    mutationFn: (payload: NewInvoiceRequestSchema) =>
      invoiceApiClient.newInvoice(payload),
  });
