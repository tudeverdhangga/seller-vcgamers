import { Alert, type AlertProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const getTextColor = (color?: string) => {
  switch (color) {
    case 'info':
      return "#616A82";
    case 'error':
      return "#FF3333";
    case 'success':
      return "#00870E";
    case 'warning':
      return "#D17E00";
    default:
      return "#9AA4BF";
  }
}

const getBgColor = (color?: string) => {
  switch (color) {
    case 'info':
      return "#EFEBFF";
    case 'error':
      return "#FFDCDA";
    case 'success':
      return "#CEECD1";
    case 'warning':
      return "#FFEAAA";
    default:
      return "#F5F5F5";
  }
}

const CustomAlertWrapper = styled(({ ...props }) => (
  <Alert {...props} />
))<
  AlertProps & {
    color?:
    "primary" |
    "info" |
    "error" |
    "success" |
    "warning" |
    "secondary";
    icon?: boolean;
  }
>(({
  color,
  icon = false,
}) => ({
  color: getTextColor(color),
  backgroundColor: getBgColor(color),
  '& .MuiAlert-icon': {
    display: icon ? 'block' : 'none',
  },
}));

export default CustomAlertWrapper;
