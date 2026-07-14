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
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Button from "../../components/Button/Button";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme/useTheme";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleTheme, mode } = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

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
      <Box>
        <Button
          title="Home"
          sx={{ color: "white" }}
          onClick={() => navigate({ to: "/" })}
          endIcon={<Home />}
        />

        <Button
          title="Income"
          sx={{ color: "white" }}
          onClick={() =>
            navigate({
              to: "/income",
            })
          }
          endIcon={<TrendingUp />}
        />

        <Button
          title="Expense"
          sx={{ color: "white" }}
          onClick={() => navigate({ to: "/expense" })}
          endIcon={<TrendingDown />}
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
          <MenuItem>
            Log out <Logout />
          </MenuItem>
        </Menu>
      </Box>
    </AppBar>
  );
};

export default Navbar;
