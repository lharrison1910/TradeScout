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
import { toast } from "react-toastify";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const { mutate, isPending } = useLogin();
  const { data, isFetching, refetch, error } = useGoogleLogin();

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
    refetch();
    console.log(data);
  };

  if (isPending) {
    return <CircularProgress />;
  }

  if (isFetching) {
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
