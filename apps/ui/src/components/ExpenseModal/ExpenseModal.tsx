import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { CategoryLabels } from "./DropdownOptionts";
import { useState } from "react";

const ExpenseModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    job: 0,
    category: "",
    comments: "",
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const closeModal = () => {
    setFormData({
      total: 0,
      paymentType: "Bank Transfer",
      job: 0,
      dateReceived: dayjs(),
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box>
          <Button
            onClick={closeModal}
            size="small"
            sx={{ position: "absolute", left: 10, top: 5 }}
          >
            Back
          </Button>
          <Typography>New Expense</Typography>
        </Box>
        <Box>
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
          <Typography>Comments (Options)</Typography>

          <TextField
            type="text"
            name="comments"
            onChange={(event) => handleChange("comments", event.target.value)}
          />
        </Box>
        <Box>
          <Button color="success">Save</Button>
          <Button color="error" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
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
