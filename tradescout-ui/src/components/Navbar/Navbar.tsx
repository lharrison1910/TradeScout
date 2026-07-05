import { AppBar, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar>
      <Button
        sx={{ color: "white" }}
        onClick={() =>
          navigate({
            to: "/income",
          })
        }
      >
        Income
      </Button>
    </AppBar>
  );
};

export default Navbar;
