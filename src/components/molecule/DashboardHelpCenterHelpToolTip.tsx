import { useState } from "react";

import { useTranslation } from "next-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import { useResponsive } from "~/utils/mediaQuery";
import HelpToolTip from "../atomic/HelpToolTip";
import HelpIcon from "../icons/svg/helpIcon.svg";

export default function DashboardHelpCenterHelpToolTip() {
  const { isMobile } = useResponsive();
  const { t } = useTranslation("dashboard");

  if (isMobile) {
    return <Mobile />;
  }

  return <HelpToolTip title={t("tooltip.helpContact")} />;
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
          {t("card.helpContact.title")}
        </StyleDialogTitle>
        <DialogContent sx={{ px: 2 }}>
          <StyleDialogContentText>
            {t("tooltip.helpContact")}
          </StyleDialogContentText>
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
