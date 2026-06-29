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

interface SnapRecieptCardProps {
  title: string;
  handleFormChange: (file: File) => void;
}

export const SnapRecieptCard = ({
  title,
  handleFormChange,
}: SnapRecieptCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    handleFormChange(file);
  };

  return (
    <Card
      variant="outlined"
      sx={{
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
            startIcon={<PhotoCameraIcon />}
            onClick={handleButtonClick}
            sx={{
              py: 3,
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            {title}
          </Button>

          {/* Loading Spinner */}
          {/* {isUploading && (
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
          )} */}
        </Box>
      </CardContent>
    </Card>
  );
};
