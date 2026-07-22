import { useState } from "react";
import Modal from "../Modal/Modal";
import {
  Autocomplete,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "../../hooks/useAuth/useAuth";
import Button from "../Button/Button";

const InvoiceModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState();
  const { user } = useAuth();

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="New Invoice"
      handleSave={() => {}}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography>Invoice Details</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Autocomplete
              options={user.businesses}
              defaultValue={user.businesses[0]}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "50%" }}
            />
            <TextField placeholder="Invoice Number" sx={{ width: "50%" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date issued" sx={{ width: "50%" }} />
              <DatePicker label="Due date" sx={{ width: "50%" }} />
            </LocalizationProvider>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography>Customer Details</Typography>
          <Box sx={{ justifyContent: "space-evenly" }}>
            <TextField placeholder="Name" />
            <TextField placeholder="Address" />
          </Box>
          <Box sx={{ justifyContent: "space-evenly" }}>
            <TextField placeholder="Phone" />
            <TextField placeholder="Email" />
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <Typography>Job Details</Typography>
          <TextField placeholder="Location" />
          <TextField placeholder="Reference" />
        </Box>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
          <TableFooter
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Button title="Add Row" onClick={() => {}} />
            <Typography>Total</Typography>
          </TableFooter>
        </Table>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <Typography>Payment Details</Typography>
          <TextField placeholder="Sub total" />
          <TextField placeholder="VAT" />
          <TextField placeholder="Discount" />
          <TextField placeholder="Total" />
        </Box>
        <Divider />
        <Box>
          <Typography>Bank Details</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
