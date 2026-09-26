import { Box, Paper, Stack, Typography } from "@mui/material";
import Grid from "../../components/Grid/Grid";
import { getColumns } from "./columns";
import { useGetInvoices } from "../../hooks/Invoice/useGetInvoices";
import Button from "../../components/Button/Button";
import { useMemo, useState } from "react";
import InvoiceModal from "../../components/InvoiceModal/InvoiceModal";
import InvoicePreviewModal from "../../components/InvoicePreviewModal/InvoicePreviewModal";
import { useGetPreview } from "../../hooks/Invoice/useGetPreview";
import { useDeleteDraft } from "../../hooks/Invoice/useDeleteInvoiceDraft";

const Invoice = () => {
  const { data: invoices } = useGetInvoices();

  const [selectedId, setSelectedId] = useState<number | undefined>();
  const { data: blob } = useGetPreview(selectedId);

  const { mutateAsync: deleteDraft } = useDeleteDraft();

  const [invoiceToEdit, setInvoiceToEdit] = useState();

  const [invoiceModal, setInvoiceModal] = useState<boolean>(false);
  const [_previewModal, setPreviewModal] = useState<boolean>(false);
  const stats = useMemo(() => {
    if (!invoices) return { paid: 0, unpaid: 0, overdue: 0 };

    const today = new Date().getTime();

    return invoices.reduce(
      (acc, invoice) => {
        if (invoice.status === "PAID") {
          acc.paid += 1;
        }

        if (invoice.status === "UNPAID") {
          acc.unpaid += 1;
        }

        if (invoice.issuedAt && invoice.status !== "PAID") {
          const issueDate = new Date(invoice.issuedAt).getTime();
          const diffInDays = (today - issueDate) / (1000 * 3600 * 24);
          if (diffInDays > 14) {
            acc.overdue += 1;
          }
        }

        return acc;
      },
      { paid: 0, unpaid: 0, overdue: 0 },
    );
  }, [invoices]);

  const openEditModal = (invoiceData) => {
    setInvoiceToEdit(invoiceData);
    setInvoiceModal(true);
  };

  const columns = getColumns({ setSelectedId, openEditModal, deleteDraft });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Invoices</Typography>
          <Button title="New Invoice" onClick={() => setInvoiceModal(true)} />
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Paper
            elevation={0}
            sx={{ p: 2, flex: 1, border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Paid Invoices
            </Typography>
            <Typography
              variant="h4"
              color="success.main"
              sx={{ fontWeight: "bold" }}
            >
              {stats.paid}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{ p: 2, flex: 1, border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Unpaid Invoices
            </Typography>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {stats.unpaid}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              flex: 1,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              bgcolor: stats.overdue > 0 ? "#fef2f2" : "transparent",
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Overdue (14+ Days)
            </Typography>
            <Typography
              variant="h4"
              color="error.main"
              sx={{ fontWeight: "bold" }}
            >
              {stats.overdue}
            </Typography>
          </Paper>
        </Stack>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid columns={columns} rows={invoices} />
        </Box>
      </Box>
      <InvoiceModal
        open={invoiceModal}
        handleClose={() => setInvoiceModal(false)}
        invoiceToEdit={invoiceToEdit}
      />

      <InvoicePreviewModal
        blob={blob}
        open={!!selectedId}
        onClose={() => {
          setSelectedId(undefined);
          setPreviewModal(false);
        }}
      />
    </>
  );
};

export default Invoice;
