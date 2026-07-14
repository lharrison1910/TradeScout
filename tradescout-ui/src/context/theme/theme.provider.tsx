import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { CssBaseline, type PaletteMode } from "@mui/material";
import { ThemeProvider as MUITheme } from "@emotion/react";
import { ThemeContext } from "./theme.context";
import { theme } from "../../theme/theme";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const currentTheme = theme(mode);

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <CssBaseline />
      <MUITheme theme={currentTheme}>{children}</MUITheme>
    </ThemeContext.Provider>
  );
};
