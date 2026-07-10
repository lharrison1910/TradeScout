import { Box, Typography, TextField } from "@mui/material";
import Modal from "../Modal/Modal";

interface BusinessModalProps {
  open: boolean;
  handleClose: () => void;
  data?: unknown;
  handleSave: any;
}

const BusinessModal = ({
  open,
  handleClose,
  data,
  handleSave,
}: BusinessModalProps) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={data ? `Edit ${data.name}` : "Add Business"}
      handleSave={handleSave}
    >
      <Box>
        <Typography>Name</Typography>
        <TextField
          name="name"
          value={data ? data.name : ""}
          onChange={(event) => console.log(event)}
        />
        <Typography>Tax reference code</Typography>
        <TextField
          name="taxRefence"
          value={data ? data.taxReference : ""}
          onChange={(event) => console.log(event)}
        />
      </Box>
    </Modal>
  );
};

export default BusinessModal;
