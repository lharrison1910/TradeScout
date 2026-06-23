import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useLogin } from "../../hooks/useLogin/useLogin";
import { useState } from "react";
import { useGoogleLogin } from "../../hooks/useGoogleLogin/useGoogleLogin";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const { mutate, isPending } = useLogin();

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
  const { data } = useGoogleLogin();

  const handleGoogleLogin = () => {
    console.log(data);
  };

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      {/* password login */}
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
          <TextField
            name="password"
            onChange={handleChange}
            value={loginForm.password}
          />
        </Box>
        <Button>Login</Button>
      </Box>

      <Box>
        <Button onClick={handleLogin} onClick={handleGoogleLogin}>
          Sign in with google
        </Button>
      </Box>

      <Button>Create account</Button>
    </>
  );
};

export default Login;
