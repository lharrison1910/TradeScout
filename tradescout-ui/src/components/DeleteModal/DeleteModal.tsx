import { Typography } from "@mui/material";
import Modal from "../Modal/Modal";

const DeleteModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={"Are you sure you want to delete?"}
      handleSave={undefined}
    >
      <Typography>
        Deleting this will remove it from view but will still be apart of the
        tax report
      </Typography>
    </Modal>
  );
};

export default DeleteModal;
