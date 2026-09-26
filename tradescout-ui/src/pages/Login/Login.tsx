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
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { Google as GoogleIcon } from "@mui/icons-material";

// Custom Components & Hooks
import Button from "../../components/Button/Button";
import { useLogin } from "../../hooks/User/useLogin/useLogin";
import { useAuth } from "../../hooks/useAuth/useAuth";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState<string>("");

  const { mutate, isPending, error } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginForm.email || !loginForm.password) {
      setValidationError("Please enter both email and password.");
      return;
    }

    if (!emailRegex.test(loginForm.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    mutate(loginForm);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          borderRadius: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            TradeScout
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Sign in to your account
          </Typography>
        </Box>

        {/* Display Validation or Mutation Errors */}
        {(validationError || error) && (
          <Alert severity="error">
            {validationError ||
              (error as Error)?.message ||
              "Login failed. Please try again."}
          </Alert>
        )}

        {/* Form Container */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={loginForm.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password" // Masks password characters
            value={loginForm.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <Button
            title={isPending ? "Signing in..." : "Login"}
            // disabled={isPending}
            startIcon={
              isPending ? <CircularProgress size={20} color="inherit" /> : null
            }
            onClick={handleLogin}
          />
        </Box>

        <Divider sx={{ my: 1 }}>OR</Divider>

        {/* OAuth & Registration Actions */}
        <Stack spacing={2}>
          <Button
            onClick={handleGoogleLogin}
            title="Sign in with Google"
            startIcon={<GoogleIcon />}
          />

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
                onClick={() => navigate({ to: "/register" })}
              >
                Create Account
              </Typography>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;
