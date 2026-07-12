import { Alert, AlertTitle, Typography } from "@mui/material";
import { type Id, type ToastOptions, toast } from "react-toastify";

export interface Toast {
  msg: string;
  type: "error" | "success" | "warning" | "info";
}

type ToastProp = (
  message: string,
  type: "success" | "error" | "warning" | "info",
  title?: string,
  options?: ToastOptions<unknown>,
) => void;

type UseToastProp = () => {
  success: (
    message: string,
    title?: string,
    options?: ToastOptions<unknown>,
  ) => void;
  error: (
    message: string,
    title?: string,
    options?: ToastOptions<unknown>,
  ) => void;
  warning: (
    message: string,
    title?: string,
    options?: ToastOptions<unknown>,
  ) => void;
  info: (
    message: string,
    title?: string,
    options?: ToastOptions<unknown>,
  ) => void;
  display: (
    toast: Toast,
    title?: string,
    options?: ToastOptions<unknown>,
  ) => void;
  dismiss: (id?: Id) => void;
};

export const useToast: UseToastProp = () => {
  const showToast: ToastProp = (message, type, title, options) => {
    const toastContent = (
      <Alert
        severity={type}
        // biome-ignore lint/style/noNonNullAssertion: Removing role due to toast adding wrapper role="alert"
        role={null!}
        sx={{
          width: "100%",
          fontWeight: 500,
          borderWidth: 1,
        }}
      >
        {title && <AlertTitle variant="body2">{title}</AlertTitle>}
        <Typography
        //   variant="body2"
        //   fontWeight="500"
        //   color="text.secondary"
        //   whiteSpace="pre-wrap"
        >
          {message}
        </Typography>
      </Alert>
    );

    toast(toastContent, {
      style: {
        padding: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
        minWidth: "320px",
        width: "fit-content", // grows to fit content
      },
      hideProgressBar: true,
      closeButton: false,
      ...options,
    });
  };
  return {
    success: (message, title, options) =>
      showToast(message, "success", title, options),
    error: (message, title, options) =>
      showToast(message, "error", title, options),
    warning: (message, title, options) =>
      showToast(message, "warning", title, options),
    info: (message, title, options) =>
      showToast(message, "info", title, options),
    display: (toast, title, options) =>
      showToast(toast.msg, toast.type, title, options),
    dismiss: (id) => toast.dismiss(id),
  };
};
