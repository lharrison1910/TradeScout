import { Box, Button, TextField, Typography } from "@mui/material";
import { useLogin } from "../../hooks/useLogin/useLogin";
import { useState } from "react";

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
      </Box>

      <Button onClick={handleLogin}>Login</Button>

      <Button>Create account</Button>
    </>
  );
};

export default Login;
