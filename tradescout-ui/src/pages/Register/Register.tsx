import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  Container,
  Paper,
  Divider,
  Alert,
  Stack,
  Grid,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
// import { Google as GoogleIcon } from "@mui/icons-material";

// Custom Components & Hooks
import Button from "../../components/Button/Button";
import { useRegister } from "../../hooks/useRegister/useRegister";
import { useAuth } from "../../hooks/useAuth/useAuth";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    // User credentials
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Business details
    businessName: "",
    vatNumber: "",
    taxReference: "",
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankSortCode: "",
  });

  const [validationError, setValidationError] = useState<string>("");
  const { mutate, isPending, error } = useRegister();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setValidationError("");

    const {
      name,
      email,
      password,
      confirmPassword,
      businessName,
      vatNumber,
      taxReference,
      bankName,
      bankAccountName,
      bankAccountNumber,
      bankSortCode,
    } = registerForm;

    // 1. Check required primary fields
    if (!name || !email || !password || !confirmPassword || !businessName) {
      setValidationError(
        "Please complete all required fields (marked with *).",
      );
      return;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    // 3. Password length validation
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return;
    }

    // 4. Password matching validation
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    // Submit user + business payload
    mutate({
      name,
      email,
      password,
      business: {
        businessName,
        vatNumber,
        taxReference,
        bankName,
        bankAccountName,
        bankAccountNumber,
        bankSortCode,
      },
    });
  };

  // const handleGoogleSignUp = () => {
  //   window.location.href = "http://localhost:3000/api/auth/google";
  // };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            TradeScout
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Create your account & set up your business
          </Typography>
        </Box>

        {/* Validation or API Error Alerts */}
        {(validationError || error) && (
          <Alert severity="error">
            {validationError ||
              (error as Error)?.message ||
              "Registration failed. Please try again."}
          </Alert>
        )}

        {/* Main Form */}
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* SECTION 1: ACCOUNT DETAILS */}
          <Box>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              1. Account Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={registerForm.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={registerForm.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={registerForm.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  helperText="Min 8 characters"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* SECTION 2: BUSINESS DETAILS */}
          <Box>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              2. Business Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="Business Name"
                  name="businessName"
                  value={registerForm.businessName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Tax Reference"
                  name="taxReference"
                  value={registerForm.taxReference}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="VAT Number"
                  name="vatNumber"
                  value={registerForm.vatNumber}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* SECTION 3: BANK DETAILS FOR INVOICING */}
          <Box>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: "bold", mb: 0.5 }}
            >
              3. Bank Details (For Invoicing)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 2 }}
            >
              These will be displayed on generated invoices so clients can pay
              you directly.
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankName"
                  value={registerForm.bankName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Account Name"
                  name="bankAccountName"
                  value={registerForm.bankAccountName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Sort Code"
                  name="bankSortCode"
                  placeholder="00-00-00"
                  value={registerForm.bankSortCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="bankAccountNumber"
                  value={registerForm.bankAccountNumber}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Submit Button */}
          <Button
            // type="submit"
            title={
              isPending ? "Setting up account..." : "Complete Registration"
            }
            // disabled={isPending}
            startIcon={
              isPending ? <CircularProgress size={20} color="inherit" /> : null
            }
            onClick={handleRegister}
          />
        </Box>

        <Divider sx={{ my: 1 }}>OR</Divider>

        {/* OAuth & Login Redirect */}
        <Stack spacing={2}>
          {/* <Button
            onClick={handleGoogleSignUp}
            title="Sign up with Google"
            startIcon={<GoogleIcon />}
            // variant="outlined"
          /> */}

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
                onClick={() => navigate({ to: "/login" })}
              >
                Log In
              </Typography>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Register;
