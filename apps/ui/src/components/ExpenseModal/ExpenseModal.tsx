import { Box, Button, Modal, Typography } from "@mui/material";

const ExpenseModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <Button onClick={handleClose}>Back</Button>
        <Typography>New Expense</Typography>
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
