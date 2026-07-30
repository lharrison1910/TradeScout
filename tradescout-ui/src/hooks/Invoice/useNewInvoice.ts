import { useMutation } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";
import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";
import { useAuth } from "../useAuth/useAuth";

export const useNewInvoice = () => {
  const { selectedBusiness } = useAuth();
  return useMutation({
    mutationKey: ["NewInvoice"],
    mutationFn: (payload: NewInvoiceRequestSchema) =>
      invoiceApiClient.createInvoice({
        ...payload,
        businessId: selectedBusiness,
      }),
  });
};
