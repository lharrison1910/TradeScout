import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Divider,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import { Add, TrendingUp, TrendingDown } from "@mui/icons-material";

import { useAuth } from "../../hooks/useAuth/useAuth";
import Button from "../../components/Button/Button";
// import RecentTable from "./RecentTable";

import ExpenseModal from "../../components/ExpenseModal/ExpenseModal";
import IncomeModal from "../../components/IncomeModal/IncomeModal";
import InvoiceModal from "../../components/InvoiceModal/InvoiceModal";
// import InvoicePreviewModal from "../../components/InvoicePreviewModal/InvoicePreviewModal";

const Home = () => {
  const [expenseModal, setExpenseModal] = useState<boolean>(false);
  const [incomeModal, setIncomeModal] = useState<boolean>(false);
  const [invoiceModal, setInvoiceModal] = useState<boolean>(false);
  // const [invoiceBlob, setInvoiceBlob] = useState<Blob | null>(null);

  const { user } = useAuth();

  const getFiscalQuarterInfo = (
    fiscalStartMonth: number = 4,
    date: Date = new Date(),
  ) => {
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
    const startMonthIndex = fiscalStartMonth - 1;

    // 1. Calculate Quarter Label & Month Range
    const elapsedMonths = (currentMonth - startMonthIndex + 12) % 12;
    const quarterIndex = Math.floor(elapsedMonths / 3);
    const quarterLabel = `Q${quarterIndex + 1}`;

    const qStartMonthIndex = (startMonthIndex + quarterIndex * 3) % 12;
    const qEndMonthIndex = (qStartMonthIndex + 2) % 12;
    const range = `${monthNames[qStartMonthIndex]}-${monthNames[qEndMonthIndex]}`;

    let endYear = date.getFullYear();
    if (qEndMonthIndex < currentMonth) {
      endYear += 1;
    }

    let startYear = date.getFullYear();
    if (qStartMonthIndex > currentMonth) {
      startYear -= 1;
    }

    const quarterStart = new Date(startYear, qStartMonthIndex, 1);
    const quarterEnd = new Date(endYear, qEndMonthIndex + 1, 0, 23, 59, 59);

    const msPerDay = 1000 * 60 * 60 * 24;
    const todayMs = date.getTime();

    const daysRemaining = Math.max(
      0,
      Math.ceil((quarterEnd.getTime() - todayMs) / msPerDay),
    );

    const totalQuarterDays = Math.ceil(
      (quarterEnd.getTime() - quarterStart.getTime()) / msPerDay,
    );
    const daysElapsed = totalQuarterDays - daysRemaining;
    const progressPercent = Math.min(
      100,
      Math.max(0, Math.round((daysElapsed / totalQuarterDays) * 100)),
    );

    return { quarterLabel, range, daysRemaining, progressPercent };
  };

  const { quarterLabel, range, daysRemaining, progressPercent } =
    getFiscalQuarterInfo(4);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* ==========================================
            1. WELCOME & QUICK ACTIONS HEADER
        ========================================== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Welcome back, {user?.name || "User"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Here is what's happening with your business today.
            </Typography>
          </Box>

          {/* Action Button Group */}
          <Stack direction="row" spacing={1.5}>
            <Button
              title="Log Income"
              onClick={() => setIncomeModal(true)}
              startIcon={<TrendingUp />}
              // variant="outlined"
            />
            <Button
              title="Log Expense"
              onClick={() => setExpenseModal(true)}
              startIcon={<TrendingDown />}
              // variant="outlined"
            />
            <Button
              title="New Invoice"
              onClick={() => setInvoiceModal(true)}
              startIcon={<Add />}
            />
          </Stack>
        </Box>

        {/* ==========================================
            2. DASHBOARD KPI & PROGRESS CARDS
        ========================================== */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Making Tax Digital (MTD)
              </Typography>

              <Box sx={{ my: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Current MTD Quarter: {quarterLabel} ({range})
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    height: 8,
                    mt: 1.5,
                    mb: 1,
                  }}
                />
              </Box>

              <Typography variant="caption" color="text.secondary">
                ⏱️ <b>{daysRemaining} Days</b> left in current tax quarter
              </Typography>
            </Paper>
          </Grid>

          {/* Placeholder KPI: Total Revenue */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Total Income (YTD)
              </Typography>
              <Typography
                variant="h4"
                sx={{ my: 1, fontWeight: "bold" }}
                color="success.main"
              >
                £0.00
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Updated in real-time
              </Typography>
            </Paper>
          </Grid>

          {/* Placeholder KPI: Total Expenses */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Total Expenses (YTD)
              </Typography>
              <Typography
                variant="h4"
                color="error.main"
                sx={{ my: 1, fontWeight: "bold" }}
              >
                £0.00
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ready for tax calculation
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* ==========================================
            3. RECENT ACTIVITY TABLE
        ========================================== */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid #e2e8f0",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Recent Activity
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Invoices, Expenses & Income
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* Render your recent items table */}
          {/* <RecentTable /> */}
        </Paper>
      </Stack>

      {/* ==========================================
          4. MODALS
      ========================================== */}
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
      {/* <InvoicePreviewModal
        blob={invoiceBlob}
        onClose={() => setInvoiceBlob(null)}
        open={false}
      /> */}
    </Container>
  );
};

export default Home;
