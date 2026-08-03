import { useQuery } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";

export const useGetInvoices = () =>
  useQuery({
    queryKey: ["useGetInvoice"],
    queryFn: () => invoiceApiClient.getInvoicesByQuery(),
  });
