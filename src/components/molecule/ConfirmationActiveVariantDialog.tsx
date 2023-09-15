/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";

export default function ConfirmationActiveVariantDialog(props: {
  id: string;
  image?: string;
  name: string | "undefined";
  isOpen: boolean;
  handleClose: () => void;
  handleActivate: () => void;
}) {
  const { t } = useTranslation("addProduct");

  return (
    <VGDialog
      isOpen={props.isOpen}
      width="400px"
      onClose={props.handleClose}
    >
      <Box>
        <Typography
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: "primary.main",
            my: 1,
          }}
        >
          {t("variant.dialog.confirmationActive.title")}
        </Typography>
        <VGAlert
          color="info"
          sx={{
            width: "100%",
            my: 1,
            "& .MuiAlert-message": {
              width: "100%",
              display: "flex",
              alignItems: "center"
            }
          }}
        >
          <img
            src={props.image}
            width={49}
            height={49}
            alt="Badge Kilat"
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              ml: 2,
              color: "primary.main"
            }}
          >
            {props.name}
          </Typography>
        </VGAlert>
        <Typography textAlign="center">
          {t("variant.dialog.confirmationActive.subTitle")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <VGButton
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ width: "100%", mr: 1 }}
          onClick={props.handleClose}
        >
          {t("variant.dialog.confirmationActive.actions.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "100%", ml: 1 }}
          onClick={() => {
            props.handleActivate()
            props.handleClose()
          }}
        >
          {t("variant.dialog.confirmationActive.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}