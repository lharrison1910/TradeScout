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
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnapRecieptCard } from "../SnapRecieptCard/SnapRecieptCard";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { usePostIncome } from "../../hooks/usePostIncome/usePostIncome";
import { useAuth } from "../../hooks/useAuth/useAuth";

interface incomeType {
  amount: number;
  paymentMethod: string;
  jobReference: string;
  dateReceived: Dayjs;
}

const IncomeModal = ({ open, handleClose, data }) => {
  const { user } = useAuth();
  const [form, setForm] = useState<incomeType>({
    amount: 0,
    paymentMethod: "Bank Transfer",
    jobReference: "",
    dateReceived: dayjs(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending } = usePostIncome();
  const formData = new FormData();

  useEffect(() => {
    if (data) {
      setForm({
        amount: Number(data.amount) || 0,
        paymentMethod: data.paymentMethod || "Bank Transfer",
        jobReference: data.jobReference || "",
        dateReceived: data.dateReceived ? dayjs(data.dateReceived) : dayjs(),
      });
    } else {
      setForm({
        amount: 0,
        paymentMethod: "Bank Transfer",
        jobReference: "",
        dateReceived: dayjs(),
      });
    }
  }, [data, open]);

  const closeModal = () => {
    setForm({
      amount: 0,
      paymentMethod: "Bank Transfer",
      jobReference: "",
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

    formData.append("incomeData", JSON.stringify(formattedData));

    mutate(formData);
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
        <Box
          sx={{
            width: "100%",
            position: "relative",
            textAlign: "center",
            mb: 2,
          }}
        >
          <Button
            onClick={closeModal}
            size="small"
            sx={{ position: "absolute", left: -20, top: -5 }}
          >
            Back
          </Button>
          <Typography variant="h6">
            {data ? "Edit Income" : "New Income"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <Typography>Business</Typography>
          <TextField value={user.name} />
          <Typography variant="body2">Total Received (£)</Typography>
          <TextField
            type="number"
            name="amount"
            value={form.amount}
            onChange={(event) =>
              handleChange(event.target.name, Number(event.target.value))
            }
            error={!!errors.amount}
            helperText={errors.amount}
          />

          <Typography variant="body2">Client / Job Reference</Typography>

          <TextField
            name="jobReference"
            value={form.jobReference}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
          />

          <Typography variant="body2">Payment type</Typography>
          <Select
            fullWidth
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
          >
            <MenuItem value={"Bank Transfer"}>Bank Transfer</MenuItem>
            <MenuItem value={"Cash"}>Cash</MenuItem>
            <MenuItem value={"Card Reader"}>Card Reader</MenuItem>
            <MenuItem value={"Cheque"}>Cheque</MenuItem>
          </Select>

          <Typography variant="body2">Date Received</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={form.dateReceived}
              onChange={(newValue) => handleChange("dateReceived", newValue)}
            />
          </LocalizationProvider>

          <Divider />
          <Box>
            <SnapRecieptCard
              title="Snap Income"
              handleFormChange={(file) => {
                formData.append("receipt", file);
              }}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            disabled={isPending}
            color="success"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button color="error" variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default IncomeModal;
