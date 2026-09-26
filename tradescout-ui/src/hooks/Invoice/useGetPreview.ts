import { useQuery } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";

export const useGetPreview = (id?: number) =>
  useQuery({
    queryKey: ["useGetPreview"],
    queryFn: () => invoiceApiClient.getPreview(id),
    enabled: !!id,
  });
