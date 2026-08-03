interface InvoicePreviewModalProps {
  blob: Blob | null;
  open: boolean;
  onClose: () => void;
}

import { renderAsync } from "docx-preview";
import { Box } from "@mui/material";
import Modal from "../Modal/Modal";

export const InvoicePreviewModal = ({
  blob,
  open,
  onClose,
}: InvoicePreviewModalProps) => {
  const handleRef = (element: HTMLDivElement | null) => {
    if (element && blob && open) {
      element.innerHTML = "";

      renderAsync(blob, element, undefined, {
        className: "docx-viewer",
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
      })
        .then(() => console.log("DOCX Rendered successfully on screen!"))
        .catch((err) => console.error("Error rendering docx:", err));
    }
  };

  if (!blob) return null;

  return (
    <Modal
      open={open}
      handleClose={onClose}
      title={"Preview"}
      handleSave={undefined}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Box
          ref={handleRef}
          sx={{
            overflowY: "auto",
            maxHeight: "80vh",
            minHeight: "500px",
            width: "100%",
            backgroundColor: "#fff",
            "& .docx-wrapper": {
              background: "transparent",
              padding: 0,
            },
          }}
        />
      </Box>
    </Modal>
  );
};
