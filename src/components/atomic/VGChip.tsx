import { Chip, type SxProps, type Theme } from "@mui/material";

export default function VGChip(props: {
  color?: string;
  sx?: SxProps<Theme>;
  label: string;
  size?: "small" | "medium";
}) {
  const getTextColor = () => {
    switch (props.color) {
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
    switch (props.color) {
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
    <Chip
      sx={{
        borderRadius: "5px",
        color: getTextColor(),
        backgroundColor: getBgColor(),
        ...props.sx
      }}
      label={ props.label }
      size={ props.size }
    />
  )
}