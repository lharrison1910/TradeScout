import { useState, useEffect } from "react";
import { Box, Typography, TextField, Grid, Divider } from "@mui/material";
import Modal from "../Modal/Modal";

// 1. Updated to perfectly match your TypeORM schema
interface BusinessData {
  id?: number;
  businessName?: string;
  vatNumber?: string;
  taxReference?: string;
  bankName?: string;
  bankAccountName?: string;
  bankSortCode?: string;
  bankAccountNumber?: string;
}

interface BusinessModalProps {
  open: boolean;
  handleClose: () => void;
  data?: BusinessData;
  handleSave: (data: BusinessData) => void;
}

const emptyForm: BusinessData = {
  businessName: "",
  vatNumber: "",
  taxReference: "",
  bankName: "",
  bankAccountName: "",
  bankSortCode: "",
  bankAccountNumber: "",
};

const BusinessModal = ({
  open,
  handleClose,
  data,
  handleSave,
}: BusinessModalProps) => {
  const [formData, setFormData] = useState<BusinessData>(emptyForm);

  useEffect(() => {
    if (open) {
      if (data) {
        setFormData(data);
      } else {
        setFormData(emptyForm);
      }
    }
  }, [open, data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={data ? `Edit ${data.businessName || "Business"}` : "Add Business"}
      handleSave={onSave}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, p: 1, mt: 1 }}
      >
        {/* --- GENERAL DETAILS --- */}
        <Box>
          <Typography
            variant="subtitle2"
            color="primary"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            General Information
          </Typography>
          <Grid container spacing={2}>
            {/* Changed from 'name' to 'businessName' */}
            <Grid size={{ xs: 12 }}>
              <TextField
                name="businessName"
                label="Business Name"
                value={formData.businessName || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            {/* Added VAT Number */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="vatNumber"
                label="VAT Number"
                value={formData.vatNumber || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="taxReference"
                label="Tax Reference Code"
                value={formData.taxReference || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box>
          <Typography
            variant="subtitle2"
            color="primary"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Invoice Payment Details (Bank)
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 2 }}
          >
            These details will automatically appear on invoices you issue under
            this business.
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="bankName"
                label="Bank Name"
                value={formData.bankName || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="bankAccountName"
                label="Account Name"
                value={formData.bankAccountName || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="bankSortCode"
                label="Sort Code"
                value={formData.bankSortCode || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="bankAccountNumber"
                label="Account Number"
                value={formData.bankAccountNumber || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default BusinessModal;
