import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "@tanstack/react-router";

export const SnapReceiptCard: React.FC = () => {
  const navigate = useNavigate();

  // 1. Ref for the hidden HTML file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for upload simulation
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Triggers the hidden input's click event when the MUI button is tapped
  const handleButtonClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  // 3. Handles the file after the user snaps the photo
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Basic Validation (ensure it's actually an image)
    if (!file.type.startsWith("image/")) {
      setError("Please snap a picture of a receipt (JPG, PNG).");
      return;
    }

    // Prepare data for upload
    const formData = new FormData();
    formData.append("receipt", file);

    try {
      setIsUploading(true);

      // --- TODO: Connect to NestJS API ---
      // const response = await api.post('/expenses/upload-temp', formData);
      // const tempReceiptId = response.data.id;
      // ------------------------------------

      // Fake upload delay for MVP simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockTempReceiptId = "temp_123_abc";

      // 4. Redirect to the Quick Log screen, passing the temp ID
      navigate({
        to: "/expense/new",
        search: { tempReceiptId: mockTempReceiptId },
      });
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload receipt. Please check your signal.");
    } finally {
      setIsUploading(false);

      // Clear the input so the user can snap again if needed
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
        {/*
          Crucial Part: Hidden HTML File Input
          'accept="image/*"' restricts to image files.
          'capture="environment"' specifically tells mobile browsers to use the rear camera.
        */}
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
        {/* 5. Giant "Van-Ready" MUI Button */}
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
              py: 3, // Very tall for easy tapping on site
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            {isUploading ? "Uploading..." : "SNAP RECEIPT"}
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
