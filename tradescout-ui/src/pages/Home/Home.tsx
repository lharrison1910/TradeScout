import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { SnapRecieptCard } from "../../components/SnapRecieptCard/SnapRecieptCard";
import ExpenseModal from "../../components/ExpenseModal/ExpenseModal";
import IncomeModal from "../../components/IncomeModal/IncomeModal";
import { useState } from "react";
import { useGetIncome } from "../../hooks/useGetIncome/useGetIncome";
import { useAuth } from "../../hooks/useAuth/useAuth";

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

  const { data: income } = useGetIncome();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          height: "100%",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "15%",
            justifyContent: "space-around",
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

        <Paper>
          <Typography>Log expense</Typography>
          <SnapRecieptCard
            title="Snap Reciept"
            handleFormChange={(formData) => console.log(formData)}
          />
          <Button onClick={() => setIncomeModal(true)}>Log Income</Button>
          <Button>Log Expense</Button>
          <Button>Pending (3)</Button>
        </Paper>

        <Paper>
          <Typography>Recent Activity</Typography>
          <List>
            {/*map items*/}
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
      />
    </>
  );
};

export default Home;
