import { Box, Paper, Typography, LinearProgress, Divider } from "@mui/material";
import { SnapRecieptCard } from "../../components/SnapRecieptCard/SnapRecieptCard";
import ExpenseModal from "../../components/ExpenseModal/ExpenseModal";
import IncomeModal from "../../components/IncomeModal/IncomeModal";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth/useAuth";
import Button from "../../components/Button/Button";
import RecentTable from "./RecentTable";
import InvoiceModal from "../../components/InvoiceModal/InvoiceModal";
import { InvoicePreviewModal } from "../../components/InvoicePreviewModal/InvoicePreviewModal";

const Home = () => {
  const [expenseModal, setExpenseModal] = useState<boolean>(false);
  const [incomeModal, setIncomeModal] = useState<boolean>(false);
  const [invoiceModal, setInvoiceModal] = useState<boolean>(false);
  const [invoiceBlob, setInvoiceBlob] = useState<Blob | null>(null);

  const { user } = useAuth();

  const getFiscalQuarter = (
    startMonth: number,
    date: Date = new Date(),
  ): string => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentMonth = date.getMonth();

    const startMonthIndex = startMonth - 1;

    const elapsedMonths = (currentMonth - startMonthIndex + 12) % 12;

    const quarterStartElapsed = elapsedMonths - (elapsedMonths % 3);

    const qStartMonthIndex = (startMonthIndex + quarterStartElapsed) % 12;
    const qEndMonthIndex = (qStartMonthIndex + 2) % 12;

    return `${monthNames[qStartMonthIndex]}-${monthNames[qEndMonthIndex]}`;
  };

  const currentQuater = getFiscalQuarter(new Date().getMonth() + 1);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "15%",
            width: "50%",
            justifyContent: "space-around",
            padding: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Hello {user.name}!</Typography>

          <Box
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>
              Current MTD Quarter: Q2 ({currentQuater})
            </Typography>

            <LinearProgress
              variant="determinate"
              value={30}
              sx={{
                width: "100%",
                borderRadius: 2,
                height: 6,
              }}
            />

            <Typography
              variant="body2"
              sx={{ textAlign: "right", color: "text.secondary" }}
            >
              {30} Days left
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ padding: 2, width: "50%" }}>
          <SnapRecieptCard
            title="Snap Reciept"
            handleFormChange={(formData) => console.log(formData)}
          />
          <Box
            sx={{
              display: "flex",
              gap: 1,
              margin: 2,
              justifyContent: "center",
            }}
          >
            <Button onClick={() => setIncomeModal(true)} title="Log Income" />
            <Button title="Log Expense" onClick={() => setExpenseModal(true)} />

            <Button title="New Invoice" onClick={() => setInvoiceModal(true)} />
          </Box>
        </Paper>

        <Paper sx={{ width: "50%", padding: 2 }}>
          <Typography variant="h5">Recent Activity</Typography>
          <Divider />
          <RecentTable />
        </Paper>
      </Box>
      <ExpenseModal
        open={expenseModal}
        handleClose={() => setExpenseModal(false)}
      />
      <IncomeModal
        open={incomeModal}
        handleClose={() => setIncomeModal(false)}
        data={undefined}
      />
      <InvoiceModal
        open={invoiceModal}
        handleClose={() => setInvoiceModal(false)}
      />

      <InvoicePreviewModal
        blob={invoiceBlob}
        onClose={() => setInvoiceBlob(null)}
      />
    </>
  );
};

export default Home;
