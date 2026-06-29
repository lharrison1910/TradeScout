import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnapRecieptCard } from "../SnapRecieptCard/SnapRecieptCard";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
// import { IncomeBaseSchema } from "@tradescout/shared/schema/IncomeSchema";

interface incomeType {
  total: number;
  paymentType: string;
  job: number;
  dateReceived: Dayjs;
}

const IncomeModal = ({ open, handleClose }) => {
  const [form, setForm] = useState<incomeType>({
    total: 0,
    paymentType: "Bank Transfer",
    job: 0,
    dateReceived: dayjs(),
  });

  const formData = new FormData();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const closeModal = () => {
    setForm({
      total: 0,
      paymentType: "Bank Transfer",
      job: 0,
      dateReceived: dayjs(),
    });
    setErrors({});

    handleClose();
  };

  const handleChange = (name: string, value: unknown) => {
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    const formattedData = {
      ...form,
      dateReceived: form.dateReceived.toISOString(),
    };

    console.log(formattedData);

    formData.append("incomeDetails", JSON.stringify(form));

    // const result = IncomeBaseSchema.safeParse(formattedData);

    // if (!result.success) {
    //   const formattedErrors: Record<string, string> = {};
    //   result.error.issues.forEach((issue) => {
    //     const key = String(issue.path[0] ?? "");
    //     formattedErrors[key] = issue.message;
    //   });
    //   console.log(formattedErrors);
    //   setErrors(formattedErrors);
    //   return;
    // }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={style}>
        <Box>
          <Button
            onClick={closeModal}
            size="small"
            sx={{ position: "absolute", left: 10, top: 5 }}
          >
            Back
          </Button>
          <Typography>New Income</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Totla Received (£)</Typography>
          <TextField
            type="number"
            name="total"
            value={form.total}
            onChange={(event) =>
              handleChange(event.target.name, Number(event.target.value))
            }
            error={!!errors.total}
            helperText={errors.total}
          />

          <Typography>Client / Job Reference</Typography>
          <Select
            fullWidth
            name="paymentType"
            value={form.paymentType}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
            error={!!errors.paymentType}
          >
            <MenuItem value={"Bank Transfer"}>Bank Transfer</MenuItem>
            <MenuItem value={"Cash"}>Cash</MenuItem>
            <MenuItem value={"Card Reader"}>Card Reader</MenuItem>
            <MenuItem value={"Cheque"}>Cheque</MenuItem>
          </Select>

          <Typography>Date Recieved</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              name="dateReceived"
              value={form.dateReceived}
              onChange={(newValue) => handleChange("dateReceived", newValue)}
            />
          </LocalizationProvider>

          <Divider />
          <Box>
            <SnapRecieptCard
              title="Snap Income"
              handleFormChange={(file) => {
                formData.append("proof", file);
              }}
            />
          </Box>
        </Box>
        <Box>
          <Button color="success" onClick={handleSave}>
            Save
          </Button>
          <Button color="error" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default IncomeModal;

// +---------------------------------------------------+
// |  [< Back]               Log Income                |
// +---------------------------------------------------+
// |                                                   |
// |  Total Received (£):                              |
// |  [  850.00                                     ]  |
// |                                                   |
// |  Client / Job Reference (Required):               |
// |  [  Mrs. Smith - Bathroom Fit                  ]  |
// |                                                   |
// |  Payment Method:                                  |
// |  [ Bank Transfer v ]                              |
// |  (Options: Bank, Cash, Card Reader, Cheque)       |
// |                                                   |
// |  Date Received:                                   |
// |  [  06 / 06 / 2026                           📅]  |
// |                                                   |
// |  -----------------------------------------------  |
// |                                                   |
// |  [ 📎 Attach Invoice Photo (Optional) ]           |
// |                                                   |
// |                                                   |
// |  +---------------------------------------------+  |
// |  |           SAVE INCOME TO LEDGER             |  |
// |  +---------------------------------------------+  |
// |                                                   |
// +---------------------------------------------------+
