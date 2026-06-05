import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { tradeScoutTheme } from "./theme/theme.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={tradeScoutTheme}>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </ThemeProvider>,
);
