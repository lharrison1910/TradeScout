import { createTheme } from "@mui/material/styles";

export const tradeScoutTheme = createTheme({
  palette: {
    // The Base: Dark Slate / Scout Green
    primary: {
      main: "#0f172a", // Tailwind slate-900
      contrastText: "#ffffff",
    },
    // The Action: Hi-Vis Safety Orange
    secondary: {
      main: "#f97316", // Tailwind orange-500
      dark: "#ea580c", // Tailwind orange-600 for hover states
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc", // Tailwind slate-50 (reduces outdoor screen glare)
      paper: "#ffffff", // Pure white for task cards
    },
    text: {
      primary: "#0f172a", // High contrast black/slate
      secondary: "#64748b", // Tailwind slate-500 for helper text
    },
    error: {
      main: "#ef4444", // Red for overdue HMRC warnings
    },
  },
  typography: {
    // Use a sturdy, highly legible font
    fontFamily: '"Inter", "Barlow", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em", // Tightly tracked for impact
      fontSize: "2.25rem",
    },
    h2: {
      fontWeight: 800,
      fontSize: "1.5rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.125rem",
    },
    button: {
      fontWeight: 800,
      textTransform: "uppercase", // Screams "CLICK ME"
      letterSpacing: "0.05em",
    },
  },
  components: {
    // Override default MUI Buttons to be massive and fat-finger friendly
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Big, soft corners
          padding: "16px 24px", // Massive touch targets
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "&:active": {
            transform: "scale(0.98)", // Satisfying physical "click" feel
          },
        },
        // Use a conditional contained override so the style is applied only
        // when the button's color is "secondary" (avoids using a non-existent class key)
        contained: ({ ownerState }: any) => ({
          ...(ownerState?.color === "secondary" && {
            fontSize: "1.25rem", // Makes the Hi-Vis orange button text bigger
          }),
        }),
      },
    },
    // Override default MUI Cards to look like our "Inbox" items
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #f1f5f9", // subtle border
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          padding: "16px",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffffff",
        },
        h1: {
          color: "#0f172a",
        },
        h2: {
          color: "#0f172a",
        },
        body1: {
          color: "#1e293b",
        },
        body2: {
          color: "#64748b",
        },
      },
    },
  },
});
