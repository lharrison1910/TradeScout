import { ArrowBack } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import Button from "../Button/Button";

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
    <Dialog open={open} onClose={closeModal} sx={{ maxWidth: "75%" }}>
      <DialogTitle>
        <Button
          title="Back"
          startIcon={<ArrowBack />}
          onClick={closeModal}
          size="small"
          sx={{ marginRight: 1 }}
          // sx={{ position: "absolute", left: 10, top: 5 }}
        />
        {title}
      </DialogTitle>
      <DialogContent>
        <Box>{children}</Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "space-around",
            marginTop: 1,
          }}
        >
          <Button title="Cancel" onClick={handleClose} />
          <Button title="Save" onClick={handleSave} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
