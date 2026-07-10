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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Paper>
          <UserSection user={user} />
        </Paper>

        <Divider />
        <Paper>
          <BusinessSection businesses={user.businesses} />
        </Paper>
      </Box>
    </>
  );
};

export default Settings;
