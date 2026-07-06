import {
  AccountCircle,
  Home,
  Logout,
  Settings,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
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
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        mb: 4,
      }}
    >
      <Box>
        <Button
          sx={{ color: "white" }}
          onClick={() => navigate({ to: "/" })}
          endIcon={<Home />}
        >
          Home
        </Button>

        <Button
          sx={{ color: "white" }}
          onClick={() =>
            navigate({
              to: "/income",
            })
          }
          endIcon={<TrendingUp />}
        >
          Income
        </Button>
        <Button
          sx={{ color: "white" }}
          onClick={() => navigate({ to: "/expense" })}
          endIcon={<TrendingDown />}
        >
          Expenses
        </Button>
      </Box>

      <Typography>TradeScout</Typography>

      <Box>
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
