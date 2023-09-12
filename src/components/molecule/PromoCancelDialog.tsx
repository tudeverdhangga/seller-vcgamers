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
import { cancelDialogAtom } from "~/atom/managePromo";
import { toastOption } from "~/utils/toast";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";
import {
  useDeletePromo,
  useGetPromoDetail,
} from "~/services/managePromo/hooks";
import dayjs from "dayjs";

export default function PromoCancelDialog() {
  const { t } = useTranslation("managePromo");
  const [modal, setModal] = useAtom(cancelDialogAtom);
  const deletePromoMutation = useDeletePromo();
  const { data } = useGetPromoDetail(modal.promoId, modal.isOpen);

  const handleClose = () => setModal({ isOpen: false });
  const disabled =
    dayjs() < dayjs(data?.data.request_date).add(3 * 24, "hours");

  return (
    <Dialog open={modal.isOpen} onClose={handleClose} fullWidth maxWidth="xs">
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
        <p style={{ marginBottom: "0px" }}>{t("dialog.cancel.title")}</p>
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
        {disabled ? (
          <Box>
            <Typography
              sx={{
                mt: "10px",
                color: "common.red.500",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.cancel.error")}
            </Typography>
            <Typography
              sx={{
                color: "common.shade.200",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.disabled.errorHint", {
                date: dayjs(data?.data.request_date)
                  .add(3, "days")
                  .format("DD MMM YYYY HH:mm"),
              })}
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t("dialog.cancel.subtitle")}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={handleClose}
          color="primary"
        >
          {t("btn.back")}
        </VGButton>
        <VGButton
          variant="outlined"
          size="large"
          fullWidth
          disabled={disabled}
          onClick={() => {
            modal.promoId &&
              deletePromoMutation.mutate(modal.promoId, {
                onSuccess: () => {
                  setModal({ isOpen: false });
                  toast.success(t("toast.cancelSuccess"), toastOption);
                },
              });
          }}
          color="error"
        >
          {t("btn.cancelPromo")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
