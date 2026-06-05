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

const Homepage = () => {
  const [daysTill, setDaysTill] = useState(30);
  return (
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
        <Typography>Current MTD Quarter: Q2 (Apr 26 - Jun 26)</Typography>
        <Typography>
          <LinearProgress
            variant="determinate"
            value={daysTill}
            sx={{ width: "75%" }}
          />
          {daysTill} Days left
        </Typography>
      </Paper>
      <Paper>
        <Typography>Log expense</Typography>
        <SnapReceiptCard />
        <Button>Log Income</Button>
        <Button>Log Expense</Button>
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
