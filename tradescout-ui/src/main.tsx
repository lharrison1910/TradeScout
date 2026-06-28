import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slide, ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/Auth/Auth.provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>

      <ToastContainer
        position="top-center"
        transition={Slide}
        newestOnTop
        autoClose={5000}
        closeOnClick
      />
    </QueryClientProvider>
  </StrictMode>,
);
