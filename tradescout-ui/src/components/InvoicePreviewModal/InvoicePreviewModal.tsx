import { useEffect, useRef } from "react";
import { renderAsync } from "docx-preview";

interface InvoicePreviewModalProps {
  blob: Blob | null;
  onClose: () => void;
}

const InvoicePreviewModal = ({ blob, onClose }: InvoicePreviewModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blob && containerRef.current) {
      containerRef.current.innerHTML = "";

      renderAsync(blob, containerRef.current, undefined, {
        className: "docx-viewer",
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
      }).catch((err) => console.error("Error rendering docx:", err));
    }
  }, [blob]);

  if (!blob) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={headerStyle}>
          <h3>Invoice Preview (.docx)</h3>
          <button onClick={onClose}>Close</button>
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
