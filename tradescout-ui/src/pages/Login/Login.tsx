import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
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
          <TextField />
        </Box>
        <Box>
          <Typography>Password</Typography>
          <TextField />
        </Box>
      </Box>

      <Button>Login</Button>

      <Button>Create account</Button>
    </>
  );
};

export default Login;
