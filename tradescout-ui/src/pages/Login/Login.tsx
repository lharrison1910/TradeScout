import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useLogin } from "../../hooks/useLogin/useLogin";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const { mutate, isPending, error } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      console.log("need email and password");
    } else {
      mutate(loginForm);
    }
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  if (isPending) {
    return <CircularProgress />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 4,
          width: "20%",
          padding: 2,
          margin: 2,
        }}
      >
        <Box>
          <Typography>Email</Typography>
          <TextField
            name="email"
            onChange={handleChange}
            value={loginForm.email}
          />
        </Box>
        <Box>
          <Typography>Password</Typography>
          <TextField
            name="password"
            onChange={handleChange}
            value={loginForm.password}
          />
        </Box>
        <Button onClick={handleLogin}>Login</Button>
      </Box>

      <Box>
        <Button onClick={handleGoogleLogin}>Sign in with google</Button>
      </Box>

      <Button>Create account</Button>
    </>
  );
};

export default Login;
