import queryString from "query-string";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import { useDeactiveKilat } from "~/services/api/product";
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function DeactivateKilatDialog (props: {
  id: string;
  isBulk: boolean | false;
  name?: string | "undefined";
  isOpen: boolean;
  nextUpdatePrice?: string | null;
  handleClose: () => void;
  refetchProduct: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const kilat = useDeactiveKilat(queryString.stringify({variation_id: props.id}))

  const onDeactiveKilat = () => {
    kilat.mutate(undefined, {
      onSuccess: () => {
        props.handleClose()
        toast.success(t("table.dialog.nonActive.onSuccess"), toastOption);
        props.refetchProduct()
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("table.dialog.nonActive.onError")}: ${err?.response?.data?.message}`
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <Image
          src="/assets/warning-icon.svg"
          width={75}
          height={69.35}
          alt="Warning Icon"
        />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            color: "primary.main",
            my: 1,
          }}
        >
          {
            props.isBulk
              ? t("table.dialog.nonActive.bulkTitle")
              : t("table.dialog.nonActive.title")
          }
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={500}
          color="common.shade.200"
          my={1}
        >
          {
            props.isBulk
              ? t("table.dialog.nonActive.bulkSubTitle")
              : t("table.dialog.nonActive.subTitle")
          }
        </Typography>
        <VGAlert
          color="info"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            my: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: "primary.main"
            }}
          >
            {props.name}
          </Typography>
        </VGAlert>
        <Typography
          fontSize={14}
          fontWeight={500}
          color="common.shade.200"
          my={1}
        >
          {t("table.dialog.nonActive.alert")}
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
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "100%", mr: 1 }}
          onClick={props.handleClose}
        >
          {t("table.dialog.nonActive.actions.cancel")}
        </VGButton>
        <VGButton
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ width: "100%", ml: 1 }}
          onClick={onDeactiveKilat}
        >
          {t("table.dialog.nonActive.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}