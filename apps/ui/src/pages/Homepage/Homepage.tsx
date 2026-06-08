import {
  Box,
  Button,
  LinearProgress,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SnapReceiptCard } from "../../components/SnapRecieptCard/SnapRecieptCard";
import ExpenseModal from "../../components/ExpenseModal/ExpenseModal";
import IncomeModal from "../../components/IncomeModal/IncomeModal";

const Homepage = () => {
  const [expenseModal, setExpenseModal] = useState<boolean>(false);
  const [incomeModal, setIncomeModal] = useState<boolean>(false);

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

  const currentQuarter = getFiscalQuarter(4);

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
          <Typography variant="h2">Hello User!</Typography>
          <Typography>Current MTD Quarter: Q2 ({currentQuarter})</Typography>
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
          <SnapReceiptCard title="Snap Reciept" />
          <Button onClick={() => setIncomeModal(true)}>Log Income</Button>
          <Button onClick={() => setExpenseModal(true)}>Log Expense</Button>
          <Button>Pending (3)</Button>
        </Paper>

        <Paper>
          <Typography>Recent Activity</Typography>
          <List>
            {/*map for items */}
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

export default Homepage;

// |  Hello, Dave.                                     |
// |                                                   |
// |  Current MTD Quarter: Q1 (Apr 6 - Jul 5)          |
// |  [======================---------] 30 Days Left   |
// |                                                   |
// |  -----------------------------------------------  |
// |                                                   |
// |       +-----------------------------------+       |
// |       |                                   |       |
// |       |         📸 SNAP RECEIPT           |       |
// |       |         (Log an Expense)          |       |
// |       |                                   |       |
// |       +-----------------------------------+       |
// |                                                   |
// |  [ 💰 LOG INCOME ]         [ 📥 PENDING (3) ]     |
// |                                                   |
// |  -----------------------------------------------  |
// |  Recent Activity:                                 |
// |  > Travis Perkins       - £145.20      [Done]     |
// |  > Client: Smith Bath   + £850.00      [Done]     |
// |  > Screwfix             - £---.--   [Missing!]    |
// +---------------------------------------------------+
// |  [Home]        [History]       [Accountant Export]|
// +---------------------------------------------------+

// snap reciept is a fast on the go element
// pending is for expendatures with reciept evidence but no details
