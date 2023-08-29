import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { notificationDetailAtom } from "~/atom/notificationDetail";

export default function NotificationDetailDialog() {
  const { t } = useTranslation("notification");

  const [detail, setDetail] = useAtom(notificationDetailAtom);

  const onClose = () => setDetail({ isOpen: false });

  return (
    <Dialog open={detail.isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
        }}
      >
        {t("update")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "common.shade.700",
          }}
        >
          {detail.notification?.title}
        </DialogContentText>
        <DialogContentText
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "common.shade.200",
            whiteSpace: "pre-wrap",
          }}
        >
          {detail.notification?.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={onClose}
          color="primary"
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
