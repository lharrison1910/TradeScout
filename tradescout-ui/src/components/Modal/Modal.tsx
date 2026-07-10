import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  handleSave: any;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  open,
  handleClose,
  title,
  handleSave,
}) => {
  const closeModal = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Button
          startIcon={<ArrowBack />}
          onClick={closeModal}
          size="small"
          sx={{ position: "absolute", left: 10, top: 5 }}
        >
          Back
        </Button>
        <Box>{children}</Box>
        <Box>
          <Button onClick={handleSave}>Save</Button>
          <Button>Cancel</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
