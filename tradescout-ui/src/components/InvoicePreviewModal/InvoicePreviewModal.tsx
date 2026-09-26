import { useEffect, useRef } from "react";
import { renderAsync } from "docx-preview";

interface InvoicePreviewModalProps {
  blob: Blob | null;
  onClose: () => void;
}

interface InvoicePreviewModalProps {
  open: boolean;
  blob: Blob | null | undefined;
  onClose: () => void;
}

const InvoicePreviewModal = ({
  open,
  blob,
  onClose,
}: InvoicePreviewModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && blob && containerRef.current) {
      containerRef.current.innerHTML = "";

      renderAsync(blob, containerRef.current, undefined, {
        className: "docx-viewer",
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
      }).catch((err) => console.error("Error rendering docx:", err));
    }
  }, [open, blob]);

  // Hide modal if open is false or blob isn't loaded yet
  if (!open || !blob) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h3>Invoice Preview (.docx)</h3>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div
          ref={containerRef}
          style={{ overflowY: "auto", maxHeight: "80vh" }}
        />
      </div>
    </div>
  );
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "80%",
  maxWidth: "900px",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

export default InvoicePreviewModal;
