import { Box, Divider, Drawer } from "@mui/material";
import Button from "../Button/Button";
import {
  Home,
  Receipt,
  Settings,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "@tanstack/react-router";

const Sidebar = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const buttons = [
    { title: "Home", endIcon: <Home />, nav: "/" },
    { title: "Invoice", endIcon: <Receipt />, nav: "/invoice" },
    { title: "Income", endIcon: <TrendingUp />, nav: "/Income" },
    { title: "Expense", endIcon: <TrendingDown />, nav: "/Expense" },
    { title: "Settings", endIcon: <Settings />, nav: "/settings" },
  ];

  const handleNavigate = (path) => {
    navigate({ to: `${path}` });
    handleClose();
  };

  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: "10%",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          height: "100%",
          p: 2,
        }}
      >
        {buttons.map((button) => (
          <>
            <Button
              title={button.title}
              sx={{ color: "white" }}
              onClick={() => handleNavigate(button.nav)}
              endIcon={button.endIcon}
            />
            <Divider />
          </>
        ))}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
