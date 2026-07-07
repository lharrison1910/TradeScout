import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useGetUser } from "../../hooks/useGetUser/useGetUser";

const Settings = () => {
  const { data: user, isFetching } = useGetUser();

  if (isFetching) {
    return <CircularProgress />;
  }

  console.log(user);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ m: 2 }}>
          <Typography variant="h3">Your details</Typography>
          <Typography>Email</Typography>
          <TextField value={user.email} />
          <Typography>Name</Typography>
          <TextField value={user.name} />

          {/* linked accounts */}

          <Typography>Change Password</Typography>
          <TextField placeholder="current password" />
          <TextField placeholder="new password" />
          <Button>Save</Button>
        </Box>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Typography variant="h3">Business details</Typography>

          <Typography>Name</Typography>
          <TextField />

          <Typography>Tax Reference</Typography>
          <TextField />
        </Box>
      </Box>
    </>
  );
};

export default Settings;
