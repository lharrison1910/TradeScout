import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { useGetIncome } from "../../hooks/useGetIncome/useGetIncome";
import Grid from "../../components/Grid/Grid";
import { columns } from "./columns";
import Button from "../../components/Button/Button";
import { useState } from "react";
import IncomeModal from "../../components/IncomeModal/IncomeModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useGetUser } from "../../hooks/User/useGetUser/useGetUser";

const IncomePage = () => {
  const [editData, setEditData] = useState();
  const [deleteData, setDeleteData] = useState<number>();
  const deleteOpen = Boolean(deleteData);

  //filter income on business
  const { data: income, isLoading: incomeLoading } = useGetIncome();
  const { data: user, isLoading: userLoading } = useGetUser();

  const handleClose = () => {
    setEditData(undefined);
  };

  if (incomeLoading || userLoading) {
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
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "75%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Autocomplete
            options={user.businesses}
            defaultValue={user.businesses[0]}
            getOptionLabel={(option) => option.name}
            sx={{ width: "25%" }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Businesses" />
            )}
          />
          <Button
            title="Export this Quarter"
            onClick={() => console.log("will export csv")}
          />
        </Box>

        <Box sx={{ width: "75%", maxHeight: "50%" }}>
          <Grid
            columns={columns(setEditData, handleClose, setDeleteData)}
            rows={income}
          />
        </Box>
      </Box>
      <IncomeModal open={editData} handleClose={handleClose} data={editData} />
      <DeleteModal open={deleteOpen} handleClose={() => setDeleteData(null)} />
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
