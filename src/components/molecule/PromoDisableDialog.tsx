import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";
import { disableDialogAtom } from "~/atom/managePromo";
import { toastOption } from "~/utils/toast";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";
import {
  useDeactivatePromo,
  useGetPromoDetail,
} from "~/services/managePromo/hooks";
import dayjs from "dayjs";

export default function PromoDisableDialog(props: { promoId: string }) {
  const { t } = useTranslation("managePromo");
  const [modalOpen, setModalOpen] = useAtom(disableDialogAtom);
  const deactivateMutation = useDeactivatePromo();
  const { data } = useGetPromoDetail(props.promoId, modalOpen);

  const isUnderTimeLimit =
    dayjs() < dayjs(data?.data.approved_date).add(3, "days");

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
        <Image
          src="/assets/warning-icon.svg"
          width={75}
          height={69.35}
          alt="Warning Icon"
        />
        <p style={{ marginBottom: "0px" }}>{t("dialog.disabled.title")}</p>
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
            {data?.data.name}
          </Typography>
          <Typography
            sx={{ color: "common.shade.200", fontSize: 14, fontWeight: 500 }}
          >
            {data?.data.promo_code}
          </Typography>
        </Box>
        {!isUnderTimeLimit && (
          <Typography
            sx={{
              mt: "10px",
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t("dialog.disabled.subtitle")}
          </Typography>
        )}
        {isUnderTimeLimit && (
          <Box>
            <Typography
              sx={{
                mt: "10px",
                color: "common.red.500",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.disabled.error")}
            </Typography>
            <Typography
              sx={{
                color: "common.shade.200",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.disabled.errorHint", {
                date: dayjs(data?.data.approved_date)
                  .add(3, "days")
                  .format("DD MMM YYYY HH:mm"),
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
          onClick={() => setModalOpen(false)}
          color="primary"
        >
          {t("btn.back")}
        </VGButton>
        <VGButton
          variant="outlined"
          size="large"
          fullWidth
          disabled={isUnderTimeLimit}
          onClick={() => {
            deactivateMutation.mutate(props.promoId, {
              onSuccess: () => {
                setModalOpen(false);
                toast.success(t("toast.disableSuccess"), toastOption);
              },
            });
          }}
          color="primary"
        >
          {t("btn.disable")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
