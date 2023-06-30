import Tab, { type TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const VGTabChip = styled(Tab)<TabProps>(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.common.shade[75],
  borderRadius: "10px",
  textTransform: "none",
  color: theme.palette.common.shade[200],
  fontSize: 14,
  fontWeight: 600,
  px: 2,
  py: 1,
  minHeight: "20px",
  "&.Mui-selected": {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

export default VGTabChip;
