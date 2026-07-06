import { Box, Button, CircularProgress } from "@mui/material";
import { useGetIncome } from "../../hooks/useGetIncome/useGetIncome";
import Grid from "../../components/Grid/Grid";
import { columns } from "./columns";

const IncomePage = () => {
  const { data: income, isLoading } = useGetIncome();

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box sx={{ width: "50%", maxHeight: "50%" }}>
          <Grid columns={columns()} rows={income} />
        </Box>
        <Button>Export this Quarter</Button>
      </Box>
    </>
  );
};

export default IncomePage;

// <Table>
//   <TableHead>
//     <TableRow>
//       <TableCell>Actions</TableCell>
//       <TableCell>Date Received</TableCell>
//       <TableCell>Amount</TableCell>
//       <TableCell>Category</TableCell>
//       <TableCell>Payment Method</TableCell>
//       <TableCell>Job Reference</TableCell>
//     </TableRow>
//   </TableHead>
//   <TableBody>
//     {income.map((row) => (
//       <TableRow key={row.id}>
//         <TableCell>
//           <IconButton onClick={() => setMenuOpen(true)}>
//             <MoreVertOutlined />
//           </IconButton>
//           <ActionMenu
//             open={menuOpen}
//             handleClose={() => setMenuOpen(false)}
//           />
//         </TableCell>
//         <TableCell>{row.dateReceived}</TableCell>
//         <TableCell>{row.amount}</TableCell>
//         <TableCell>{row.category}</TableCell>
//         <TableCell>{row.paymentMethod}</TableCell>
//         <TableCell>{row.jobReference}</TableCell>
//       </TableRow>
//     ))}
//   </TableBody>
// </Table>;
