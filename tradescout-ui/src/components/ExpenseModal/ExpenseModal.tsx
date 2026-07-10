import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { CategoryLabels } from "./DropdownOptions";
import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "../Modal/Modal";

const ExpenseModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    job: 0,
    category: "",
    comments: "",
    dateReceived: dayjs(),
  });

  const closeModal = () => {
    setFormData({
      amount: 0,
      category: "Bank Transfer",
      job: 0,
      dateReceived: dayjs(),
      comments: "",
    });

    handleClose();
  };

  const handleChange = (name: string, value: unknown) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log(formData);
    //TODO: send data away
    //validation
  };

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title={"New Expense"}
      handleSave={handleSave}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography>Gross amount (£):</Typography>
        <TextField
          type="number"
          name="amount"
          value={formData.amount}
          onChange={(event) => handleChange("amount", event.target.value)}
        />
        <Typography>HMRC Category:</Typography>
        <Autocomplete
          options={Object.values(CategoryLabels)}
          getOptionLabel={(option) => String(option)}
          onChange={(newValue) => handleChange("category", newValue)}
          renderInput={(params) => <TextField {...params} label="HMRC Cat" />}
        />
        <Typography>Attach to an ongoing job</Typography>
        <Autocomplete
          options={[]}
          onChange={(newValue) => handleChange("job", newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Attach to job" />
          )}
        />
        <Typography>Date Recieved</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            name="dateReceived"
            value={formData.dateReceived}
            onChange={(newValue) => handleChange("dateReceived", newValue)}
          />
        </LocalizationProvider>
        <Typography>Comments (Options)</Typography>

        <TextField
          type="text"
          name="comments"
          onChange={(event) => handleChange("comments", event.target.value)}
        />
      </Box>
    </Modal>
  );
};

export default ExpenseModal;

// +---------------------------------------------------+
// |  [< Back]              New Expense                |
// +---------------------------------------------------+
// |                                                   |
// |     +---------------------------------------+     |
// |     |                                       |     |
// |     |           [ RECEIPT PHOTO ]           |     |
// |     |              (Retake)                 |     |
// |     |                                       |     |
// |     +---------------------------------------+     |
// |                                                   |
// |  Gross Amount (£):                                |
// |  [  145.20                                     ]  |
// |                                                   |
// |  HMRC Category:                                   |
// |  [  Materials & Tools (Cost of Goods)        v ]  |
// |                                                   |
// |  Quick Note (Optional):                           |
// |  [  Timber for Smith job                       ]  |
// |                                                   |
// |                                                   |
// |  +---------------------------------------------+  |
// |  |                SAVE EXPENSE                 |  |
// |  +---------------------------------------------+  |
// |                                                   |
// |                 [Save for later]                  |
// +---------------------------------------------------+
