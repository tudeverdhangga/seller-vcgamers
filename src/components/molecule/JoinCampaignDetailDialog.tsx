/* eslint-disable @next/next/no-img-element */
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import {
  confirmationDialogOpenAtom,
  detailDialogAtom,
} from "~/atom/joinCampaign";
import VGButton from "../atomic/VGButton";

export default function JoinCampaignDetailDialog() {
  const { t } = useTranslation("joinCampaign");
  const [, setModalOpen] = useAtom(confirmationDialogOpenAtom);
  const [detailDialog, setDetailDialog] = useAtom(detailDialogAtom);

  const handleClose = () => {
    setDetailDialog((detail) => ({ ...detail, isOpen: false }));
  };

  return (
    <Dialog
      open={detailDialog.isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "start",
          py: "10px",
          mt: "30px",
        }}
      >
        <img
          src={detailDialog.campaign?.imageUrl}
          alt={detailDialog.campaign?.name}
          style={{
            overflow: "hidden",
            borderRadius: "10px",
            width: "100%",
          }}
        />
        <Typography component="p" fontSize={16} fontWeight={700} sx={{ mb: 0 }}>
          {t("dialog.campaignDetail.title")}
        </Typography>
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
      <DialogContent sx={{ px: 3, textAlign: "start" }}>
        <Typography
          sx={{
            color: "common.shade.200",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "pre-line",
          }}
        >
          - Toko dapat exposure
          <br />
          - Produk toko akan masuk dalam list produk khusus yang
          direkomendasikan
          <br />
          - Potensi traffic kunjungan ke produk dan toko kamu
          <br />
          - Iklan ditampilkan hanya jika toko sedang buka menyesuaikan jam
          operasional
          <br />- Durasi tayang fleksibel sesuai kebutuhan kamu
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            handleClose();
            setModalOpen(true);
          }}
          color="success"
        >
          {t("btn.joinCampaign")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
