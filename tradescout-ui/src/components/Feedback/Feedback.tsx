import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Rating,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const feedbackCategories = [
  { value: "general", label: "General Feedback" },
  { value: "bug", label: "Report a Bug" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
];

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    rating: 5,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request / server submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        category: "general",
        rating: 5,
        message: "",
      });
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Feedback
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          We value your input! Let us know what you think or report any issues
          you encountered.
        </Typography>

        {submitted && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSubmitted(false)}
          >
            Thank you! Your feedback has been received.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Name Field (Optional) */}
          <TextField
            fullWidth
            label="Name (Optional)"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* Email Field (Required) */}
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* Category Dropdown */}
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            {feedbackCategories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Rating */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              How would you rate your overall experience?
            </Typography>
            <Rating
              name="rating"
              value={Number(formData.rating)}
              onChange={(_, newValue) => {
                setFormData((prev) => ({ ...prev, rating: newValue || 5 }));
              }}
            />
          </Box>

          {/* Message Area */}
          <TextField
            fullWidth
            multiline
            rows={4}
            required
            label="Your Feedback"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you like or what we can improve..."
            sx={{ mb: 4 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            endIcon={<SendIcon />}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
