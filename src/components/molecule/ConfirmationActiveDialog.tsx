import queryString from "query-string";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";
import { useActivate } from "~/services/api/product"
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function ConfirmationActiveDialog(props: {
  id: string;
  image: string;
  name: string | "undefined";
  isOpen: boolean;
  handleClose: () => void;
  refetchProduct: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const activate = useActivate(queryString.stringify({variation_id: props.id}))

  const onActivate = () => {
    activate.mutate(undefined, {
      onSuccess: () => {
        props.handleClose()
        toast.success(t("table.dialog.confirmationActive.onSuccess"), toastOption);
        props.refetchProduct()
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("table.dialog.confirmationActive.onError")}: ${err?.response?.data?.message}`
        toast.error(errorMessage, toastOption)
      }
    })
  }

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
          {t("table.dialog.confirmationActive.title")}
        </Typography>
        <VGAlert
          color="info"
          sx={{
            width: "100%",
            my: 1,
            "& .MuiAlert-message" : {
              width: "100%",
              display: "flex",
              alignItems: "center"
            }
          }}
        >
          <Image
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
            { props.name }
          </Typography>
        </VGAlert>
        <Typography textAlign="center">
          {t("table.dialog.confirmationActive.subTitle")}
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
          {t("table.dialog.confirmationActive.actions.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "100%", ml: 1 }}
          onClick={onActivate}
        >
          {t("table.dialog.confirmationActive.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}