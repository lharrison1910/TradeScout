import {
  // Autocomplete,
  Box,
  CircularProgress,
  // TextField,
} from "@mui/material";
import { useGetIncome } from "../../hooks/useGetIncome/useGetIncome";
import Grid from "../../components/Grid/Grid";
import { columns } from "./columns";
import Button from "../../components/Button/Button";
import { useState } from "react";
import IncomeModal from "../../components/IncomeModal/IncomeModal";
// import { useGetBusiness } from "../../hooks/Business/useGetBusiness/useGetBusiness";

const IncomePage = () => {
  const [editData, setEditData] = useState();

  const { data: income, isLoading: incomeLoading } = useGetIncome();
  // const { data: businesses, isLoading: businessesLoading } = useGetBusiness();

  const handleClose = () => {
    setEditData(undefined);
  };
  if (incomeLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Autocomplete
        options={businesses}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} />}
      /> */}
        <Box sx={{ width: "75%", display: "flex", justifyContent: "flex-end" }}>
          <Button
            title="Export this Quarter"
            onClick={() => console.log("will export csv")}
          />
        </Box>

        <Box sx={{ width: "75%", maxHeight: "50%" }}>
          <Grid columns={columns(setEditData, handleClose)} rows={income} />
        </Box>
      </Box>
      <IncomeModal open={editData} handleClose={undefined} data={editData} />
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
