import { type ReactNode } from "react";
import { Alert } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export default function VGAlert(props: { 
  color?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}) {
  const { color, children } = props;

  const getTextColor = () => {
    switch (color) {
      case 'info':
        return "#616A82";
      case 'error':
        return "#FF3333";
      case 'success':
        return "#00870E";
      default:
        return "#9AA4BF";
    }
  }

  const getBgColor = () => {
    switch (color) {
      case 'info':
        return "#EFEBFF";
      case 'error':
        return "#FFDCDA";
      case 'success':
        return "#CEECD1";
      default:
        return "#F5F5F5";
    }
  }

  return (
    <Alert
      sx={{
        color: getTextColor(),
        backgroundColor: getBgColor(),
        ...props.sx
      }}
      icon={false}
    >
      {children}
    </Alert>
  );
}
