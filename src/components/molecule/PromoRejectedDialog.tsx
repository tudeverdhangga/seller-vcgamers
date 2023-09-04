import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAtom } from "jotai";
import { useTranslation, Trans } from "next-i18next";

import { rejectedDialogAtom } from "~/atom/managePromo";
import CloseIcon from "../icons/chat/CloseIcon";
import VGButton from "../atomic/VGButton";
import Typography from "@mui/material/Typography";
import { useGetPromoDetail } from "~/services/managePromo/hooks";

export default function PromoRejectedDialog() {
  const { t } = useTranslation("managePromo");
  const [modal, setModal] = useAtom(rejectedDialogAtom);
  const { data } = useGetPromoDetail(modal.promoId, modal.isOpen);

  const handleClose = () => setModal({ isOpen: false });

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
        <p style={{ marginBottom: "0px" }}>{t("dialog.rejected.title")}</p>
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
          {t("dialog.rejected.subtitle", {
            value: data?.data.rejected_reason,
          })}
        </Typography>
        <Box
          sx={{
            mt: "10px",
            display: "flex",
            gap: "10px",
            p: "10px",
            borderRadius: "5px",
            backgroundColor: "common.purple.100",
          }}
        >
          <InfoOutlinedIcon color="primary" />
          <Box sx={{ color: "primary.main", fontSize: 12, fontWeight: 500 }}>
            <Trans i18nKey="dialog.rejected.info" ns="managePromo" />
          </Box>
        </Box>
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
