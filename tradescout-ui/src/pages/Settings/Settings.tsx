import { Box, CircularProgress, Divider, Paper } from "@mui/material";
import { useGetUser } from "../../hooks/User/useGetUser/useGetUser";
import UserSection from "./UserSection";
import BusinessSection from "./BusinessSection";

const Settings = () => {
  const { data: user, isFetching } = useGetUser();

  if (isFetching) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          marginTop: 2,
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Paper sx={{ width: "75%" }}>
          <UserSection user={user} />
        </Paper>

        <Divider sx={{ width: "75%", borderColor: "black" }} />

        <Paper sx={{ width: "75%" }}>
          <BusinessSection businesses={user.businesses} />
        </Paper>
      </Box>
    </>
  );
};

export default Settings;
