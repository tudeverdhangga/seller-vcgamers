import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";
import { sendRequestDialogOpenAtom } from "~/atom/requestFitur";

export default function SendVIPRequestDialog() {
  const { t } = useTranslation("requestFitur");
  const [modalOpen, setModalOpen] = useAtom(sendRequestDialogOpenAtom);

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
          p: "10px !important",
        }}
      >
        <p style={{ marginBottom: "0px" }}>{t("modalRequestVIP.title")}</p>
        <IconButton
          onClick={() => setModalOpen(false)}
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
          {t("modalRequestVIP.subtitle")}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setModalOpen(false)}
          color="primary"
        >
          {t("modalRequestVIP.closeBtn")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
