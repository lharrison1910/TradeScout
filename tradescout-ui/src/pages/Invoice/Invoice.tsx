import { useEffect, useState } from "react";
import Grid from "../../components/Grid/Grid";
import SkeletonTable from "../../components/Skeleton/SkeletonTable";
import { useGetInvoices } from "../../hooks/Invoice/useGetInvoice";
import { useToast } from "../../hooks/useToast/useToast";
import { columns } from "./columns";
import { Box } from "@mui/material";
import Button from "../../components/Button/Button";
import InvoiceModal from "../../components/InvoiceModal/InvoiceModal";
import { useGetPreview } from "../../hooks/Invoice/useGetPreview";
import { InvoicePreviewModal } from "../../components/InvoicePreviewModal/InvoicePreviewModal";
import { usePayInvoice } from "../../hooks/Invoice/usePayInvoice";

const InvoicePage = () => {
  const [invoiceOpen, setInvoiceOpen] = useState<boolean>(false);
  const [previewId, setPreviewId] = useState();

  const toast = useToast();
  const {
    data: invoices,
    isFetching: fetchingInvoices,
    error,
  } = useGetInvoices();
  const {
    data: preview,
    isFetching: fetchingPreview,
    refetch: refetchPreview,
  } = useGetPreview(previewId);

  const { mutateAsync: payInvoice } = usePayInvoice();

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred while fetching data.");
    }
  }, [error, toast]);

  const handleInvoiceClose = () => {
    setInvoiceOpen(false);
  };

  const handlePreviewRefetch = (newId) => {
    setPreviewId(newId);
    refetchPreview();
  };

  const handlePreviewClose = () => {
    setPreviewId(null);
  };

  const isLoading = fetchingInvoices || fetchingPreview;

  if (isLoading || error) {
    return <SkeletonTable />;
  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 4,
      }}
    >
      <Box>
        <Button title="New Invoice" onClick={() => setInvoiceOpen(true)} />
      </Box>
      <Box sx={{ width: "90%", alignSelf: "center", height: "80%" }}>
        <Grid
          rows={invoices}
          columns={columns(handlePreviewRefetch, payInvoice)}
        />
      </Box>

      <InvoiceModal open={invoiceOpen} handleClose={handleInvoiceClose} />
      <InvoicePreviewModal
        blob={preview}
        open={Boolean(previewId)}
        onClose={handlePreviewClose}
      />
    </Box>
  );
};

export default InvoicePage;
