import { Chip, type SxProps, type Theme } from "@mui/material";

export default function VGChip(props: {
  color?: "info" | "error" | "success" | "warning";
  sx?: SxProps<Theme>;
  label: string;
  size?: "small" | "medium";
}) {
  const getTextColor = () => {
    switch (props.color) {
      case "info":
        return "#616A82";
      case "error":
        return "#FF3333";
      case "success":
        return "#00870E";
      case "warning":
        return "#D17E00";
      default:
        return "#9AA4BF";
    }
  };
  const getBgColor = () => {
    switch (props.color) {
      case "info":
        return "#EFEBFF";
      case "error":
        return "#FFDCDA";
      case "success":
        return "#CEECD1";
      case "warning":
        return "#FFEAAA";
      default:
        return "#F5F5F5";
    }
  };

  return (
    <Chip
      sx={{
        borderRadius: "5px",
        color: getTextColor(),
        backgroundColor: getBgColor(),
        fontSize: "12px",
        fontWeight: 700,
        ...props.sx,
      }}
      label={props.label}
      size={props.size}
    />
  );
}
