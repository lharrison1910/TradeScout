import {
  Button as MUIButton,
  type ButtonProps as MUIButtonProps,
} from "@mui/material";
import type { ReactNode } from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  sx?: object;
  size?: "small" | "medium" | "large";
  color?: MUIButtonProps["color"];
}

const Button = ({
  title,
  onClick,
  endIcon,
  startIcon,
  sx,
  size,
  color,
}: ButtonProps) => {
  return (
    <MUIButton
      sx={sx}
      variant="contained"
      endIcon={endIcon}
      startIcon={startIcon}
      onClick={onClick}
      size={size}
      color={color}
    >
      {title}
    </MUIButton>
  );
};

export default Button;
