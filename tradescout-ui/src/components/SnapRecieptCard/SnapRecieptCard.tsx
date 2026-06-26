import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import { useNavigate } from "@tanstack/react-router";

interface SnapRecieptCardProps {
  title: string;
  handleFormChange: (receipt: FormData) => void;
}

export const SnapRecieptCard = ({
  title,
  handleFormChange,
}: SnapRecieptCardProps) => {
  // const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      setError("Please snap a picture of a receipt (JPG, PNG).");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", file);
    handleFormChange(formData);

    try {
      setIsUploading(true);

      // --- TODO: Connect to NestJS API ---
      // const response = await api.post('/expenses/upload-temp', formData);
      // const tempReceiptId = response.data.id;
      // ------------------------------------

      // Fake upload delay for MVP simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // navigate({
      //   to: "/expense/new",
      //   search: { tempReceiptId: mockTempReceiptId },
      // });
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload receipt. Please check your signal.");
    } finally {
      setIsUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: isUploading ? "primary.main" : "divider",
        transition: "border-color 0.3s ease",
      }}
    >
      <CardContent sx={{ textAlign: "center", p: 3 }}>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2, textAlign: "left" }}>
            {error}
          </Alert>
        )}
        <Box sx={{ position: "relative" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={!isUploading && <PhotoCameraIcon />}
            onClick={handleButtonClick}
            disabled={isUploading}
            sx={{
              py: 3,
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            {isUploading ? "Uploading..." : title}
          </Button>

          {/* Loading Spinner */}
          {isUploading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
