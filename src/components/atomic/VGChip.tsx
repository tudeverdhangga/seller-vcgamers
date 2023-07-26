import Chip, { type ChipProps } from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const getTextColor = (color?: string) => {
  switch (color) {
    case "primary":
      return "#616A82";
    case "info":
      return "#024357";
    case "error":
      return "#FF3333";
    case "success":
      return "#00870E";
    case "warning":
      return "#D17E00";
    case "secondary":
      return "#480442";
    default:
      return "#9AA4BF";
  }
};

const getBgColor = (color?: string) => {
  switch (color) {
    case "primary":
      return "#EFEBFF";
    case "info":
      return "#BFE9F6";
    case "error":
      return "#FFDCDA";
    case "success":
      return "#CEECD1";
    case "warning":
      return "#FFEAAA";
    case "secondary":
      return "#F3C4EF";
    default:
      return "#F5F5F5";
  }
};

export default styled(Chip)<
  ChipProps & { color?: "primary" | "info" | "error" | "success" | "warning" | "secondary" }
>(({ color }) => ({
  borderRadius: "5px",
  color: getTextColor(color),
  backgroundColor: getBgColor(color),
  fontSize: "12px",
  fontWeight: 700,
}));
