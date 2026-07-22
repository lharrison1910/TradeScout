import {
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";

interface InputProps {
  formData: NewInvoiceRequestSchema;
  handleChange: (name: string, value: unknown) => void;
}

export const InvoiceDetails = ({ formData, handleChange }: InputProps) => {
  const { user } = useAuth();
  return (
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
          onChange={(newValue) => handleChange("businessId", newValue)}
        />
        <TextField
          label="Invoice Number"
          sx={{ width: "50%" }}
          name="invoice_number"
          value={formData.invoice_number}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date issued"
            sx={{ width: "50%" }}
            name="invoice_date"
            // value={formData.invoice_date}
            onChange={(newValue) =>
              handleChange("invoice_date", newValue.toISOString().split("T")[0])
            }
          />
          <DatePicker
            label="Due date"
            sx={{ width: "50%" }}
            name="due_date"
            // value={formData.due_date}
            onChange={(newValue) =>
              handleChange("due_date", newValue.toISOString().split("T")[0])
            }
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export const CustomerDetails = ({ formData, handleChange }: InputProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Typography>Customer Details</Typography>
      <Box sx={{ justifyContent: "space-evenly" }}>
        <TextField
          label="Name"
          name="customer_name"
          value={formData.customer_name}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
        <TextField
          label="Address"
          name="customer_address"
          value={formData.customer_address}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </Box>
      <Box sx={{ justifyContent: "space-evenly" }}>
        <TextField
          label="Phone"
          name="customer_phone"
          value={formData.customer_phone}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
        <TextField
          label="Email"
          name="customer_email"
          value={formData.customer_email}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </Box>
    </Box>
  );
};

export const JobDetails = ({ formData, handleChange }: InputProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography>Job Details</Typography>
      <TextField
        label="Location"
        name="job_location"
        value={formData.job_location}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField
        label="Reference"
        name="job_reference"
        value={formData.job_reference}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
    </Box>
  );
};

export const MaterialsTable = () => {
  return (
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
  );
};

export const PaymentDetails = ({ formData, handleChange }: InputProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography>Payment Details</Typography>
      <TextField
        label="Sub total"
        name="subtotal"
        value={formData.subtotal}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField
        label="VAT"
        name="vat_amount"
        value={formData.vat_amount}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField
        label="Discount"
        name="discount"
        value={formData.discount}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField label="Total" name="amount_due" value={formData.amount_due} />
    </Box>
  );
};

export const BankDetails = ({ formData, handleChange }: InputProps) => {
  return (
    <Box>
      <Typography>Bank Details</Typography>
      <TextField
        label="Bank Name"
        name="bank_name"
        value={formData.bank_name}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField
        label="Account Name"
        name="account_name"
        value={formData.account_name}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField
        label="Sort Code"
        name="sort_code"
        value={formData.sort_code}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField
        label="Account Number"
        name="account_number"
        value={formData.account_number}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <TextField
        label="Payment term days"
        name="payment_terms_days"
        value={formData.payment_terms_days}
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
    </Box>
  );
};
