import { createTheme } from "@mui/material/styles";

export const tradeScoutTheme = createTheme({
  palette: {
    // Crucial: This tells MUI to flip all its default text and borders to light colors
    mode: "dark",

    // The Main Action: Hi-Vis Site Green
    primary: {
      main: "#22c55e", // Vibrant, high-contrast green
      dark: "#16a34a", // Slightly darker for button hover states
      contrastText: "#0f172a", // Dark text on the green button so it pops
    },

    // The Base: Dark Slate
    background: {
      default: "#0f172a", // Deep slate for the very back of the app
      paper: "#1e293b", // Slightly lighter slate for the task cards so they stand out
    },

    // Text: Light grey/white for readability against the slate
    text: {
      primary: "#f8fafc", // Crisp, off-white for main text
      secondary: "#94a3b8", // Softer grey for dates, helper text, and subtitles
    },

    // Kept red for HMRC deadlines and overdue warnings
    error: {
      main: "#ef4444",
    },
  },
  typography: {
    fontFamily: '"Inter", "Barlow", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
      fontSize: "2.25rem",
      color: "#f8fafc", // Forces H1 to be the brightest white
    },
    h2: {
      fontWeight: 800,
      fontSize: "1.5rem",
      color: "#f8fafc",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.125rem",
      color: "#f8fafc",
    },
    body1: {
      color: "#cbd5e1", // A very readable light grey for standard text
    },
    body2: {
      color: "#94a3b8", // The secondary text color for minor details
    },
    button: {
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: "16px 24px",
          // Removes the default MUI shadow because flat design looks better in dark mode
          boxShadow: "none",
          "&:active": {
            transform: "scale(0.98)",
          },
        },
        containedPrimary: {
          fontSize: "1.25rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          // Instead of a shadow, we use a subtle border to separate the card from the background
          border: "1px solid #334155",
          backgroundColor: "#1e293b",
          padding: "16px",
          backgroundImage: "none", // Prevents MUI from applying its default dark mode overlay
        },
      },
    },
  },
});
