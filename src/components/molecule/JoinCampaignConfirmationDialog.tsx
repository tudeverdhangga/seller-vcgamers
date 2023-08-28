import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import {
  confirmationDialogOpenAtom,
  detailDialogAtom,
} from "~/atom/joinCampaign";
import { toastOption } from "~/utils/toast";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";
import { useJoinCampaign } from "~/services/joinCampaign/hooks";

export default function JoinCampaignConfirmationDialog() {
  const { t } = useTranslation("joinCampaign");
  const [modalOpen, setModalOpen] = useAtom(confirmationDialogOpenAtom);
  const [detailDialog] = useAtom(detailDialogAtom);
  const { mutate: joinCampaign } = useJoinCampaign();

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
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
        <p style={{ marginBottom: "0px" }}>{t("dialog.confirmation.title")}</p>
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
      <DialogContent sx={{ px: 3, textAlign: "center" }}>
        <Typography
          sx={{
            mt: "10px",
            color: "common.shade.200",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {t("dialog.confirmation.subtitle")}
        </Typography>
        <Box
          sx={{
            mt: "10px",
            p: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "10px",
            backgroundColor: "common.purple.100",
          }}
        >
          <Typography
            sx={{ color: "primary.main", fontSize: 14, fontWeight: 700 }}
          >
            {detailDialog.campaign?.name}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="outlined"
          size="large"
          fullWidth
          onClick={() => setModalOpen(false)}
          color="primary"
        >
          {t("btn.back")}
        </VGButton>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            detailDialog.campaign &&
              joinCampaign(detailDialog.campaign.id, {
                onSuccess: () => {
                  setModalOpen(false);
                  toast.success(t("toast.joinCampaignSuccess"), toastOption);
                },
              });
          }}
          color="primary"
        >
          {t("btn.joinCampaign")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
