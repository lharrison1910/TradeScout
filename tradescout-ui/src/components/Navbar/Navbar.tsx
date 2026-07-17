import {
  AccountCircle,
  DarkMode,
  Home,
  LightMode,
  Logout,
  Settings,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Button from "../../components/Button/Button";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme/useTheme";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { useLogout } from "../../hooks/User/useLogout/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleTheme, mode } = useTheme();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const { mutate: onLogout } = useLogout();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    navigate({
      to: `/${path}`,
    });
    handleClose();
  };

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
      <Box sx={{ display: "flex" }}>
        <Button
          title=""
          sx={{ color: "white" }}
          onClick={() => navigate({ to: "/" })}
          endIcon={<Home />}
        />

        <Button
          title=""
          sx={{ color: "white" }}
          onClick={() =>
            navigate({
              to: "/income",
            })
          }
          endIcon={<TrendingUp />}
        />

        <Button
          title=""
          sx={{ color: "white" }}
          onClick={() => navigate({ to: "/expense" })}
          endIcon={<TrendingDown />}
        />
        <Autocomplete
          options={user.businesses}
          defaultValue={user.businesses[0]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>

      <Typography>TradeScout</Typography>

      <Box>
        <IconButton onClick={() => toggleTheme()}>
          {mode === "light" ? <LightMode /> : <DarkMode />}
        </IconButton>
        <IconButton onClick={handleOpen}>
          <AccountCircle />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleMenuClick("settings")}>
            Settings <Settings />
          </MenuItem>
          <MenuItem onClick={() => onLogout()}>
            Log out <Logout />
          </MenuItem>
        </Menu>
      </Box>
    </AppBar>
  );
};

export default Navbar;
