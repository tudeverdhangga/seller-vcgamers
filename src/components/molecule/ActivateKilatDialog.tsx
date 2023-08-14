import queryString from "query-string";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import { useActiveKilat } from "~/services/api/product";
import { toastOption } from "~/utils/toast";
import { dateToTime } from "~/utils/format";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function ActivateKilatDialog (props: {
  id: string;
  isBulk: boolean | false;
  name?: string | "undefined";
  isOpen: boolean;
  nextActiveKilat: string;
  handleClose: () => void;
  refetchProduct: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const kilat = useActiveKilat(queryString.stringify({variation_id: props.id}))

  const onActiveKilat = () => {
    kilat.mutate(undefined, {
      onSuccess: () => {
        props.handleClose()
        toast.success(t("table.dialog.active.onSuccess"), toastOption);
        props.refetchProduct()
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("table.dialog.active.onError")}: ${err?.response?.data?.message}`
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
          justifyContent: "center"
        }}
      >
        <Image
          src="/assets/badge-kilat.svg"
          width={175}
          height={36}
          alt="Badge Kilat"
          style={{margin: '20px'}}
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
        <Typography
          fontSize={14}
          fontWeight={500}
          color="common.shade.200"
          my={1}
        >
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
        <Typography
          fontSize={14}
          fontWeight={500}
          color="common.shade.200"
          my={1}
        >
          {
            props.nextActiveKilat !== null
              ? t("table.dialog.active.alert.active", { time: dateToTime(props.nextActiveKilat) })
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
          disabled={props.nextActiveKilat !== null}
          onClick={onActiveKilat}
        >
          {t("table.dialog.active.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}