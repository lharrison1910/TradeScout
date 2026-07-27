import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme/useTheme";
import { useLogout } from "../../hooks/User/useLogout/useLogout";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const { toggleTheme, mode } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { mutate: onLogout } = useLogout();

  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <IconButton onClick={() => setSidebarOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Sidebar open={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      <Typography>TradeScout</Typography>

      <Box>
        <IconButton onClick={() => toggleTheme()}>
          {mode === "light" ? <LightMode /> : <DarkMode />}
        </IconButton>
        <IconButton onClick={() => onLogout()}>
          <Logout />
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default Navbar;
