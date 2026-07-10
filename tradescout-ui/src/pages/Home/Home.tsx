import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import { SnapRecieptCard } from "../../components/SnapRecieptCard/SnapRecieptCard";
import ExpenseModal from "../../components/ExpenseModal/ExpenseModal";
import IncomeModal from "../../components/IncomeModal/IncomeModal";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { useGetExpense } from "../../hooks/useGetExpense/useGetExpense";
import { useGetRecentIncome } from "../../hooks/useGetRecentIncome/useGetRecentIncome";
import Button from "../../components/Button/Button";

const Home = () => {
  const [expenseModal, setExpenseModal] = useState<boolean>(false);
  const [incomeModal, setIncomeModal] = useState<boolean>(false);
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

  const { data: income, isLoading: incomeLoading } = useGetRecentIncome();
  const { data: expense, isLoading: expenseLoading } = useGetExpense();

  if (incomeLoading || expenseLoading) {
    return <CircularProgress />;
  }

  const recents = [...income, ...expense];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "15%",
            justifyContent: "space-around",
            padding: 1,
          }}
        >
          <Typography variant="h2">Hello {user.name}!</Typography>
          <Typography>Current MTD Quarter: Q2 ({currentQuater})</Typography>
          <Typography>
            <LinearProgress
              variant="determinate"
              value={30}
              sx={{ width: "75%" }}
            />
            {30} Days left
          </Typography>
        </Paper>

        <Paper sx={{ padding: 2 }}>
          <SnapRecieptCard
            title="Snap Reciept"
            handleFormChange={(formData) => console.log(formData)}
          />
          <Box sx={{ display: "flex", gap: 1, margin: 2 }}>
            <Button onClick={() => setIncomeModal(true)} title="Log Income" />
            <Button title="Log Expense" onClick={() => setExpenseModal(true)} />
            <Button title={`Pending (${3})`} onClick={() => {}} />
          </Box>
        </Paper>

        <Paper>
          <Typography>Recent Activity</Typography>
          <List>
            {/*map items*/}
            {recents.map((row) => (
              <ListItem>{row.amount}</ListItem>
            ))}
            <ListItem></ListItem>
          </List>
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
    </>
  );
};

export default Home;
