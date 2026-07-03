import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const IncomePage = () => {
  const income = [];
  return (
    <>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date Received</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Job Reference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {income.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.dateReceived}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{row.jobReference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default IncomePage;
