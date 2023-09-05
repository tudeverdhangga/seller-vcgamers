import { useEffect, useState } from "react";
import queryString from "query-string";
import Image from "next/image";
import { Box, TextField, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Trans, useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";
import { dateToTime, priceFormat } from "~/utils/format";
import { useUpdatePrice } from "~/services/api/product"
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function ChangePriceDialog(props: {
  id: string;
  image: string;
  name: string | "undefined";
  price: number;
  isOpen: boolean;
  nextUpdatePrice: string | null;
  handleClose: () => void;
  refetchProduct: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const updatePrice = useUpdatePrice(queryString.stringify({ variation_id: props.id }))
  const [income, setIncome] = useState(98 * props.price / 100)
  const [price, setPrice] = useState(props.price)
  const [isUnder100, setIsUnder100] = useState(false)

  useEffect(() => {
    setIncome(98 * price / 100)
  }, [price])

  const onUpdatePrice = () => {
    updatePrice.mutate(price, {
      onSuccess: () => {
        props.handleClose()
        toast.success(t("table.dialog.changePrice.onSuccess"), toastOption);
        props.refetchProduct()
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("table.dialog.changePrice.onError")}: ${err?.response?.data?.message}`
        toast.error(errorMessage, toastOption)
      }
    })
  }
  const onClose = () => {
    setPrice(props.price)
    props.handleClose()
  }
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const price = e.target.value
    setPrice(parseInt(price))

    if (parseInt(price) < 100) {
      setIsUnder100(true)
    } else {
      setIsUnder100(false)
    }
  }

  return (
    <VGDialog
      isOpen={props.isOpen}
      width="400px"
      onClose={onClose}
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
          {t("table.dialog.changePrice.title")}
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
          label={t("table.dialog.changePrice.field")}
          value={price}
          fullWidth
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            min: "100"
          }}
          sx={{ my: 1 }}
          disabled={props.nextUpdatePrice !== null}
          onChange={(e) => onChangePrice(e)}
        />
        {
          props.nextUpdatePrice !== null && (
            <Typography
              color="success.dark"
              fontSize={12}
              fontWeight={600}
              mb={1}
            >
              {t("table.dialog.changePrice.helper.time", { time: dateToTime(props.nextUpdatePrice) })}
            </Typography>
          )
        }
        {
          isUnder100 && (
            <Typography
              color="error"
              fontSize={12}
              fontWeight={600}
              mb={1}
            >
              {t("table.dialog.changePrice.helper.under100")}
            </Typography>
          )
        }
        <Typography fontSize={12}>
          {t("table.dialog.changePrice.note")}
        </Typography>
        <VGAlert
          color="info"
          sx={{
            width: "100%",
            my: 1
          }}
        >
          <Box display="flex">
            <ErrorOutlineOutlinedIcon color="primary" />
            <Typography ml={1} fontSize={12} color="primary">
              <Trans
                ns="listProduct"
                i18nKey={"table.dialog.changePrice.alert"}
                components={{
                  strong: <Typography
                    component="span"
                    fontSize={12}
                    fontWeight={700}
                    color="primary"
                  />
                }}
                values={{ income: priceFormat(income) }}
              />
            </Typography>
          </Box>
        </VGAlert>
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
          {t("table.dialog.changePrice.actions.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "100%", ml: 1 }}
          disabled={price % 100 !== 0 || props.nextUpdatePrice !== null || isUnder100}
          onClick={onUpdatePrice}
        >
          {t("table.dialog.changePrice.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}