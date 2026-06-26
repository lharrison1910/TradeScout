import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

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
          <TextField />
        </Box>
        <Box>
          <Typography>Password</Typography>
          <TextField />
        </Box>
        <Button>Login</Button>
      </Box>

      <Box>
        <Button onClick={handleGoogleLogin}>Sign in with google</Button>
      </Box>

      <Button>Create account</Button>
    </>
  );
};

export default Login;
