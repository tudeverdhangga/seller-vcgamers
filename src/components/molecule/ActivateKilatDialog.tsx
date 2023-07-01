import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";

export default function ActivateKilatDialog (props: {
  isBulk: boolean | false;
  name?: string | "undefined";
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const [isActive] = useState(true)

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
          justifyContent: "center"
        }}
      >
        <Image
          src="/assets/badge-kilat.svg"
          width={175}
          height={36}
          alt="Badge Kilat"
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
              ? t("table.dialog.active.bulkTitle")
              : t("table.dialog.active.title")
          }
        </Typography>
        <Typography my={1}>
          {
            props.isBulk
              ? t("table.dialog.active.bulkSubTitle")
              : t("table.dialog.active.subTitle")
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
          {
            isActive
              ? t("table.dialog.active.alert.active", { time: "09:31" })
              : props.isBulk
                ? (
                  <>
                    <Typography color="success">
                      {t("table.dialog.active.alert.nonActive.title")}
                    </Typography>
                    {t("table.dialog.active.alert.nonActive.subTitle")}
                  </>
                )
                : ""
          }
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
          {t("table.dialog.active.actions.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "100%", ml: 1 }}
        >
          {t("table.dialog.active.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}