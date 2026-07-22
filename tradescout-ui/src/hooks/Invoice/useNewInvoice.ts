import { useMutation } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";

export const useNewInvoice = () =>
  useMutation({
    mutationKey: ["NewInvoice"],
    mutationFn: () => invoiceApiClient.newInvoice(),
  });
