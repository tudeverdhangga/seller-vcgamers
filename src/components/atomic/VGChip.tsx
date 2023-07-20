import Chip, { type ChipProps } from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const getTextColor = (color?: string) => {
  switch (color) {
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

const getBgColor = (color?: string) => {
  switch (color) {
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

export default styled(Chip)<
  ChipProps & { color?: "info" | "error" | "success" | "warning" }
>(({ color }) => ({
  borderRadius: "5px",
  color: getTextColor(color),
  backgroundColor: getBgColor(color),
  fontSize: "12px",
  fontWeight: 700,
}));
