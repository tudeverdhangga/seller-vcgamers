import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import queryString from "query-string";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";
import { useUpdateStock } from "~/services/api/product"
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function ChangeStockDialog(props: {
  id: string;
  image: string;
  name: string | "undefined";
  stock: number;
  isOpen: boolean;
  handleClose: () => void;
  refetchProduct: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const updateStock = useUpdateStock(queryString.stringify({variation_id: props.id}))
  const [stock, setStock] = useState(props.stock)

  const onUpdateStock = () => {
    updateStock.mutate(stock, {
      onSuccess: () => {
        props.handleClose()
        toast.success(t("table.dialog.changeStock.onSuccess"), toastOption);
        props.refetchProduct()
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("table.dialog.changeStock.onError")}: ${err?.response?.data?.message}`
        toast.error(errorMessage, toastOption)
      }
    })
  }
  const onClose = () => {
    setStock(props.stock)
    props.handleClose()
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
          {t("table.dialog.changeStock.title")}
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
            {props.name}
          </Typography>
        </VGAlert>
        <TextField
          variant="outlined"
          label={t("table.dialog.changeStock.field")}
          defaultValue={props.stock}
          fullWidth
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          sx={{ my: 1 }}
          onChange={(e) => setStock(parseInt(e.target.value))}
        />
        {
          props.stock === 0 && (
            <VGAlert
              color="warning"
              sx={{
                width: "100%",
                my: 1
              }}
            >
              <Typography>
                <b>{t("table.dialog.changeStock.alert.title")}</b> {t("table.dialog.changeStock.alert.subTitle")}
              </Typography>
            </VGAlert>
          )
        }
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
          onClick={onClose}
        >
          {t("table.dialog.changeStock.actions.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "100%", ml: 1 }}
          onClick={onUpdateStock}
        >
          {t("table.dialog.changeStock.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}