import { useState } from "react";

import { useTranslation } from "next-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import { useResponsive } from "~/utils/mediaQuery";
import HelpToolTip from "../atomic/HelpToolTip";
import HelpIcon from "../icons/svg/helpIcon.svg";

export default function DashboardPerformanceHelpToolTip() {
  const { isMobile } = useResponsive();
  const { t } = useTranslation("dashboard");

  if (isMobile) {
    return <Mobile />;
  }

  return <HelpToolTip title={t("tooltip.performance")} />;
}

function Mobile() {
  const { t } = useTranslation("dashboard");
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <HelpIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <StyleDialogTitle sx={{ py: "10px" }}>
          {t("card.performance.title")}
        </StyleDialogTitle>
        <DialogContent sx={{ px: 2 }}>
          <StyleDialogContentText>
            {t("tooltip.performance")}
          </StyleDialogContentText>
          {dialogContentList.map((dialog) => (
            <>
              <Divider sx={{ mt: "20px" }} />
              <StyleDialogTitle sx={{ py: "10px" }}>
                {t(dialog[0])}
              </StyleDialogTitle>
              <StyleDialogContentText>{t(dialog[1])}</StyleDialogContentText>
            </>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => setOpen(false)}
            color="primary"
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            {t("suggestionBox.success.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const dialogContentList = [
  ["card.performance.body.shopRating", "tooltip.shopRating"],
  ["card.performance.body.transactionSuccess", "tooltip.transactionSuccess"],
  ["card.performance.body.deliveryTime", "tooltip.deliveryTime"],
  ["card.performance.body.visitorCount", "tooltip.visitorCount"],
] as const;

const StyleDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.primary.main,
  textAlign: "center",
}));

const StyleDialogContentText = styled(DialogContentText)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.common.shade[200],
  textAlign: "center",
}));
