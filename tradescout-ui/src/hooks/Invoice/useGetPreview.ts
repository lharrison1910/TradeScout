import { useQuery } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";

export const useGetPreview = (id: number | null) => {
  return useQuery({
    queryKey: ["useGetPreview", id],
    queryFn: () => invoiceApiClient.getPreview(id),
    enabled: !!id,
  });
};
