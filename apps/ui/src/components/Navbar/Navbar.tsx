import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Navbar = () => {
  return (
    <Box sx={{ height: "10%" }}>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "5%",
        }}
      >
        <Button>
          <Typography>Menu</Typography>
        </Button>
        <Typography>TradeScout</Typography>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </AppBar>
    </Box>
  );
};

export default Navbar;

// +---------------------------------------------------+
// |  [Menu]                     Ledgerly   [Profile]  |
// +---------------------------------------------------+
