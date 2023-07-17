import LoadingButton from '@mui/lab/LoadingButton';
import { type SxProps, type Theme } from "@mui/material/styles";
import { type ReactNode, type MouseEventHandler } from "react";

export default function VGButton(props: {
  variant: "text" | "outlined" | "contained";
  color:
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "primary";
  children: ReactNode;
  disabled?: boolean;
  size?: "small" | "large" | "medium";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
  type?: "button" | "reset" | "submit";
  loading?: boolean;
}) {
  const buttonSize = props.size || "medium";

  return (
    <LoadingButton
      variant={props.variant}
      color={props.color}
      disabled={props.disabled}
      size={props.size}
      onClick={props.onClick}
      type={props.type ?? "button"}
      loading={props.loading}
      sx={{
        fontSize: "14px",
        fontWeight: 700,
        textTransform: "none",
        borderRadius: "10px",
        boxShadow: "none",
        p:
          buttonSize === "small"
            ? "5px 8px"
            : buttonSize === "medium"
            ? "8px 14px"
            : "10px 15px",
        ...props.sx,
      }}
    >
      {props.children}
    </LoadingButton>
  );
}
