import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../useAuth/useAuth";
import { invoiceApiClient } from "../../api/InvoiceApiClient";

export const useGetInvoices = () => {
    const { selectedBusiness } = useAuth();
    
    return useQuery({
        queryKey: ["useGetInvoices"],
        queryFn: () => invoiceApiClient.getInovices(selectedBusiness),
    })
}