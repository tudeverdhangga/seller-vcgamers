import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { holdDialogAtom } from "~/atom/balance";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";

export default function BalanceHoldDialog() {
  const { t } = useTranslation("balance");
  const [modal, setModal] = useAtom(holdDialogAtom);

  const handleClose = () => {
    setModal({ isOpen: false });
  };

  return (
    <Dialog open={modal.isOpen} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
          p: "10px !important",
        }}
      >
        <p style={{ marginBottom: "0px" }}>{t("dialog.hold.title")}</p>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <Typography
          sx={{ color: "common.shade.200", fontSize: 14, fontWeight: 500 }}
        >
          {modal?.detail}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={handleClose}
          color="primary"
        >
          {t("btn.close")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
