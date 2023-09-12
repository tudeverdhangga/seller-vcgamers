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
import { useGetCampaignDetail } from "~/services/joinCampaign/hooks";
import Box from "@mui/material/Box";

export default function JoinCampaignDetailDialog() {
  const { t } = useTranslation("joinCampaign");
  const [, setModalOpen] = useAtom(confirmationDialogOpenAtom);
  const [detailDialog, setDetailDialog] = useAtom(detailDialogAtom);
  const { data } = useGetCampaignDetail(detailDialog.campaign?.id);

  const handleClose = () => {
    setDetailDialog((detail) => ({ ...detail, isOpen: false }));
  };

  const isCampaignExpired = detailDialog.campaign?.is_expired;

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
          textAlign: "center",
          py: "10px",
          mt: "30px",
        }}
      >
        <img
          src={detailDialog.campaign?.image_url}
          alt={detailDialog.campaign?.name}
          height={200}
          style={{
            overflow: "hidden",
            borderRadius: "10px",
          }}
        />
        <Typography
          component="p"
          fontSize={16}
          fontWeight={700}
          sx={{ mb: 0, textAlign: "start" }}
        >
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
        <Box
          sx={{
            color: "common.shade.200",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "pre-line",
          }}
        >
          {data && (
            <div dangerouslySetInnerHTML={{ __html: data.data.description }} />
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          disabled={detailDialog.campaign?.has_joined || isCampaignExpired}
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
