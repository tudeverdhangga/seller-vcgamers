import Button from "@mui/material/Button";
import { type SxProps, type Theme } from "@mui/material/styles";
import { type ReactNode, type MouseEventHandler } from "react";

export default function VGButton(props: {
  variant: "text" | "outlined" | "contained";
  color: "inherit" | "secondary" | "success" | "error" | "info" | "warning" | "primary";
  children: ReactNode;
  disabled?: boolean;
  size?: "small" | "large" | "medium";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}) {
  return (
    <Button
      variant={props.variant}
      color={props.color}
      disabled={props.disabled}
      size={props.size}
      onClick={props.onClick}
      sx={{
        fontSize: "14px",
        fontWeight: 700,
        textTransform: "none",
        borderRadius: "10px",
        boxShadow: "none",
        p: props.size === "small"
          ? "5px"
          : props.size === "medium"
            ? "8px"
            : "10px",
        ...props.sx
      }}
    >
      {props.children}
    </Button>
  )
}