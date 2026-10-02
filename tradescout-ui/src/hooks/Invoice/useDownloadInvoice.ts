import { useMutation } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";

export const useDownloadInvoice = () => {
  return useMutation({
    mutationFn: (invoiceId: number) =>
      invoiceApiClient.downloadInvoice(invoiceId),
    onSuccess: (blob, invoiceId) => {
      console.log("success");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice ${invoiceId}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Failed to download invoice:", error);
    },
  });
};
