import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import { cancelDialogAtom } from "~/atom/joinCampaign";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";
import { useRequestCancelCampaign } from "~/services/joinCampaign/hooks";
import dayjs from "dayjs";
import DialogWithWarningIcon from "./DialogWithWarningIcon";

export default function JoinCampaignCancelDialog() {
  const { t } = useTranslation("joinCampaign");
  const [modal, setModal] = useAtom(cancelDialogAtom);
  const mutation = useRequestCancelCampaign();

  const enabled = modal.campaign?.can_request_cancel;

  return (
    <DialogWithWarningIcon
      open={modal.isOpen}
      handleClose={() => setModal({ isOpen: false })}
      title={t("dialog.abort.title")}
      contentTitle={t("dialog.abort.content")}
      contentSubtitle={modal.campaign?.name}
      backBtnTitle={t("btn.back")}
      okBtnTitle={t("btn.requestAbort")}
      okBtnProps={{
        sx: {
          color: "common.shade.100",
          borderColor: "common.shade.100",
        },
      }}
      okBtnClick={() =>
        modal.campaign?.id &&
        mutation.mutate(modal.campaign.id, {
          onSuccess: () => {
            setModal({ isOpen: false });
          },
        })
      }
      description={
        enabled ? (
          <Typography
            sx={{
              mt: "10px",
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t("dialog.abort.subtitle")}
          </Typography>
        ) : (
          <Box>
            <Typography
              sx={{
                mt: "10px",
                color: "common.red.500",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.abort.error")}
            </Typography>
            <Typography
              sx={{
                color: "common.shade.200",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.abort.errorHint", {
                date: dayjs(modal.campaign?.can_request_cancel_date),
              })}
            </Typography>
          </Box>
        )
      }
    />
  );

  return (
    <Dialog
      open={modal.isOpen}
      onClose={() => setModal({ isOpen: false })}
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
        <Image
          src="/assets/warning-icon.svg"
          width={75}
          height={69.35}
          alt="Warning Icon"
        />
        <p style={{ marginBottom: "0px" }}>{t("dialog.abort.title")}</p>
        <IconButton
          onClick={() => setModal({ isOpen: false })}
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
            Nama promo disini
          </Typography>
          <Typography
            sx={{ color: "common.shade.200", fontSize: 14, fontWeight: 500 }}
          >
            {modal.campaign?.name}
          </Typography>
        </Box>
        {enabled ? (
          <Typography
            sx={{
              mt: "10px",
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t("dialog.abort.subtitle")}
          </Typography>
        ) : (
          <Box>
            <Typography
              sx={{
                mt: "10px",
                color: "common.red.500",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.abort.error")}
            </Typography>
            <Typography
              sx={{
                color: "common.shade.200",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.abort.errorHint", {
                date: dayjs(modal.campaign?.can_request_cancel_date),
              })}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setModal({ isOpen: false })}
          color="primary"
        >
          {t("btn.back")}
        </VGButton>
        <VGButton
          variant="outlined"
          size="large"
          fullWidth
          disabled={!enabled}
          onClick={() =>
            modal.campaign?.id &&
            mutation.mutate(modal.campaign.id, {
              onSuccess: () => {
                setModal({ isOpen: false });
              },
            })
          }
          color="primary"
        >
          {t("btn.deactivate")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
