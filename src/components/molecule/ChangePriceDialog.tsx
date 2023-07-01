import Image from "next/image";
import { Box, TextField, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useTranslation } from "next-i18next";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";
import { priceFormat } from "~/utils/format";

export default function ChangePriceDialog(props: {
  image: string;
  name: string | "undefined";
  price: number;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const income = 98 * props.price / 100

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
          {t("table.dialog.changePrice.title")}
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
          label={t("table.dialog.changePrice.field")}
          defaultValue={props.price}
          fullWidth
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          sx={{ my: 1 }}
        />
        <Typography>
          {t("table.dialog.changePrice.note")}
        </Typography>
        <VGAlert
          color="info"
          sx={{
            width: "100%",
            my: 1
          }}
        >
          <Typography
            color="primary"
            display="flex"
          >
            <ErrorOutlineOutlinedIcon />
            <Typography>
              {t("table.dialog.changePrice.alert", { percent: "2%", price: priceFormat(income) })}
            </Typography>
          </Typography>
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
          onClick={props.handleClose}
        >
        {t("table.dialog.changePrice.actions.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "100%", ml: 1 }}
        >
          {t("table.dialog.changePrice.actions.ok")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}