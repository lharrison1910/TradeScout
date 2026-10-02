import { AppBar, Toolbar, Typography, Link, Box, Stack } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="static" component="footer" color="primary">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          py: 1,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", opacity: 0.9 }}
            >
              Legal:
            </Typography>
            <Link
              href="/terms"
              color="inherit"
              underline="hover"
              variant="body2"
            >
              Terms and Conditions
            </Link>
            <Typography variant="body2" sx={{ opacity: 0.5 }}>
              |
            </Typography>
            <Link
              href="/privacy"
              color="inherit"
              underline="hover"
              variant="body2"
            >
              Data Privacy Policy
            </Link>
          </Box>

          <Link
            href="/feedback"
            color="inherit"
            underline="hover"
            variant="body2"
          >
            Feedback
          </Link>
        </Stack>

        <Typography variant="body2" color="inherit" sx={{ ml: "auto" }}>
          Company Name
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
