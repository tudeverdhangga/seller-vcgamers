import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";

export default function DeactivateKilatDialog (props: {
  isBulk: boolean | false;
  name?: string | "undefined";
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("listProduct");

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
        <Typography my={1}>
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
        <Typography my={1}>
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
          {t("table.dialog.active.actions.cancel")}
        </VGButton>
        <VGButton
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ width: "100%", ml: 1 }}
        >
          {t("table.dialog.active.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}