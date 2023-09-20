import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";

const VGStyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-container": {
    "& .MuiDialog-paper": {
      borderRadius: "10px",
    },
  },
}));

export default VGStyledDialog;
