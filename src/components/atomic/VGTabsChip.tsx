import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";

const VGTabsChip = styled(Tabs)(() => ({
  "& .MuiTabs-flexContainer": {
    gap: "10px",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  flex: "1 0 0",
}));

export default VGTabsChip;
