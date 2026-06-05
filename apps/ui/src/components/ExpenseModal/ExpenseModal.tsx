import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { HmrcCategoryEnum } from "@tradescout/shared/HmrcCategoryEnum";

const ExpenseModal = ({ open, handleClose }) => {
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
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box>
          <Button
            onClick={handleClose}
            size="small"
            sx={{ position: "absolute", left: 10, top: 5 }}
          >
            Back
          </Button>
          <Typography>New Expense</Typography>
        </Box>
        <Box>
          <Typography>Gross amount (£):</Typography>
          <TextField type="number" />
          <Typography>HMRC Category:</Typography>
          <Autocomplete
            options={Object.values(HmrcCategoryEnum)}
            getOptionLabel={(option) => String(option)}
            renderInput={(params) => <TextField {...params} label="HMRC Cat" />}
          />
          <Typography>Attach to an ongoing job</Typography>
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <TextField {...params} label="Attach to job" />
            )}
          />
          <Typography>Comments (Options)</Typography>
          <TextField />
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
