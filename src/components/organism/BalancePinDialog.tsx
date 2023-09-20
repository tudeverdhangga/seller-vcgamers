import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import { pinDialogOpenAtom, pinRateLimitAtom } from "~/atom/balance";
import { postRequestWithdrawal } from "~/services/balance/api";
import { usePostValidatePin } from "~/services/pin/hooks";
import { type BodyValidatePin } from "~/services/pin/types";
import { toastOption } from "~/utils/toast";
import PinNumberInput, { pinErrorAtom } from "../atomic/PinNumberInput";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";

export default function BalancePinDialog() {
  const { t } = useTranslation("balance");
  const [error, setError] = useAtom(pinErrorAtom);
  const [isRateLimit, setIsRateLimit] = useAtom(pinRateLimitAtom);
  const [modalOpen, setModalOpen] = useAtom(pinDialogOpenAtom);
  const mutation = useMutation({
    mutationFn: (body: BodyValidatePin) => postRequestWithdrawal(body),
    onSuccess: () => {
      setModalOpen(false);
      toast.success(t("toast.withdrawSuccess"), toastOption);
    },
    onError: () => {
      setError(true);
    },
  });
  const pinMutation = usePostValidatePin(
    (pin) => mutation.mutate(pin),
    () => {
      if (false) {
        setIsRateLimit(true);
      }
    }
  );

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
        <p>{t("dialog.pin.title")}</p>
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
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <Box sx={{ px: 3 }}>
          <Typography
            fontSize={14}
            fontWeight={600}
            color="common.shade.200"
            whiteSpace="pre-line"
          >
            {isRateLimit
              ? t("dialog.pin.errorDescription", { time: "15:30" })
              : t("dialog.pin.subtitle")}
          </Typography>
        </Box>
        {!isRateLimit && error && (
          <Typography
            fontSize={14}
            fontWeight={600}
            color="common.red.500"
            sx={{ mb: "-20px" }}
          >
            {t("dialog.pin.errorText")}
          </Typography>
        )}
        {!isRateLimit && (
          <PinNumberInput
            onSubmit={(value) => {
              pinMutation.mutate({ pin: value });
            }}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          size="large"
          onClick={() => setModalOpen(false)}
          color="primary"
        >
          {t("btn.forgetPin")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
