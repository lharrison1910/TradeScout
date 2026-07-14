import Modal from "../Modal/Modal";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnapRecieptCard } from "../SnapRecieptCard/SnapRecieptCard";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { usePostIncome } from "../../hooks/usePostIncome/usePostIncome";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { MtdIncomeCategory } from "../../types/HmrcCategoryEnum";

interface incomeType {
  amount: number;
  businessId: string;
  category: string;
  dateReceived: string | Dayjs;
  id?: number;
  isDailyTotal?: boolean;
  reference?: string;
  paymentMethod?: string;
  userId?: number;
}

const IncomeModal = ({ open, handleClose, data }) => {
  const [form, setForm] = useState<incomeType>({
    amount: 0,
    paymentMethod: "Bank Transfer",
    reference: "",
    dateReceived: dayjs(),
  });

  const formData = new FormData();

  useEffect(() => {
    if (open) {
      if (data) {
        setForm({
          ...data,
          dateReceived: dayjs(data.dateReceived),
        });
      } else {
        setForm({
          amount: 0,
          paymentMethod: "Bank Transfer",
          reference: "",
          dateReceived: dayjs(),
        });
      }
      // setErrors({});
    }
  }, [data, open]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending, error } = usePostIncome();

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
      dateReceived: dayjs(form.dateReceived).toISOString(),
    };

    formData.append("incomeData", JSON.stringify(formattedData));
    mutate(formData);
  };

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title={"New Income"}
      handleSave={handleSave}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography>Total Received (£)</Typography>
        <TextField
          type="number"
          name="amount"
          value={form.amount}
          onChange={(event) =>
            handleChange(event.target.name, Number(event.target.value))
          }
          error={!!errors.total}
          helperText={errors.total}
        />

        <Typography>Client / Job Reference</Typography>
        <TextField />

        <Typography>Payment type</Typography>
        <Select
          fullWidth
          name="paymentMethod"
          value={form.paymentMethod}
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

        <Typography>Income Category</Typography>
        <Select
          fullWidth
          name="category"
          value={form.category}
          onChange={(event) => handleChange("category", event.target.value)}
        >
          {Object.values(MtdIncomeCategory).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
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
