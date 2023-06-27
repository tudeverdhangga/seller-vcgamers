import Tooltip, {
  tooltipClasses,
  type TooltipProps,
} from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    placement="bottom-start"
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.shade[200],
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 600,
    fontFamily: theme.typography.fontFamily,
    padding: "10px",
  },
}));

export default LightTooltip;
