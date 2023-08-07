import { type ReactNode } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { confirmationDialogOpenAtom, pinDialogOpenAtom } from "~/atom/balance";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";
import { useGetBalanceInfo } from "~/services/api/balance";
import { priceFormat } from "~/utils/format";

export default function BalanceConfirmationDialog() {
  const { t } = useTranslation("balance");
  const [modalOpen, setModalOpen] = useAtom(confirmationDialogOpenAtom);
  const [, setPinModalOpen] = useAtom(pinDialogOpenAtom);
  const { data } = useGetBalanceInfo();

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
          p: "10px !important",
        }}
      >
        <p>{t("dialog.confirmation.title")}</p>
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
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "common.purple.0",
            p: "10px",
            borderRadius: "10px",
            gap: "10px",
          }}
        >
          <Typography
            sx={{ color: "primary.main", fontSize: 14, fontWeight: 700 }}
          >
            {t("dialog.confirmation.subheader")}
          </Typography>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <BodyTitle>{t("dialog.confirmation.body.owner")}</BodyTitle>
              <BodyDesc>{data?.data.bank.bank_account_name}</BodyDesc>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <BodyTitle>{t("dialog.confirmation.body.bank")}</BodyTitle>
              <BodyDesc>
                {data?.data.bank.bank_name}
                {" - "}
                {data?.data.bank.bank_account_number}
              </BodyDesc>
            </Box>
          </Box>
          <Divider />
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <BodyTitle>
                {t("dialog.confirmation.body.withdrawAmount")}
              </BodyTitle>
              <BodyPrice>{priceFormat(data?.data.balance ?? 0)}</BodyPrice>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <BodyTitle>{t("dialog.confirmation.body.withdrawFee")}</BodyTitle>
              <BodyPrice>Rp0</BodyPrice>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <BodyTitle>
                {t("dialog.confirmation.body.withdrawTotal")}
              </BodyTitle>
              <BodyPrice>{priceFormat(data?.data.balance ?? 0)}</BodyPrice>
            </Box>
          </Box>
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
            setModalOpen(false);
            setPinModalOpen(true);
          }}
          color="success"
        >
          {t("btn.withdraw")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}

function BodyTitle(props: { children: ReactNode }) {
  return (
    <Typography color="common.shade.200" fontSize={14} fontWeight={600}>
      {props.children}
    </Typography>
  );
}

function BodyDesc(props: { children: ReactNode }) {
  return (
    <Typography
      color="common.shade.700"
      fontSize={14}
      fontWeight={500}
      textAlign="right"
    >
      {props.children}
    </Typography>
  );
}

function BodyPrice(props: { children: ReactNode }) {
  return (
    <Typography
      color="common.shade.700"
      fontSize={14}
      fontWeight={700}
      textAlign="right"
    >
      {props.children}
    </Typography>
  );
}
