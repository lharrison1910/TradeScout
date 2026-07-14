import { createTheme, type PaletteMode } from "@mui/material";

export const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#2f3e36" },
            secondary: { main: "#7f9a85" },
            success: { main: "#52796f" },
            error: { main: "#b23b3b" },
            background: {
              default: "#f4f4f2",
              paper: "#ffffff",
            },
            text: {
              primary: "#242b27",
              secondary: "#55635a",
            },
          }
        : {
            primary: { main: "#a9c2b0" },
            secondary: { main: "#c8b195" },
            success: { main: "#74a89d" },
            error: { main: "#e07a5f" },
            background: {
              default: "#131815",
              paper: "#1e2521",
            },
            text: {
              primary: "#f4f4f2",
              secondary: "#9fb1a5",
            },
          }),
    },
    shape: {
      borderRadius: 8,
    },
  });
