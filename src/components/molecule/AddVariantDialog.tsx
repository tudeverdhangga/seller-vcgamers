import { useTranslation } from "next-i18next";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useState } from "react";

import { priceFormat } from "~/utils/format";
import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";

export default function AddVariantDialog(props: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("addProduct");
  const { isOpen, handleClose } = props;
  const category = [
    { label: "Category A", value: "a" },
    { label: "Category B", value: "b" },
    { label: "Category C", value: "c" }
  ]
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [feature, setFeature] = useState('regular')
  
  const onInputStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(event.target.value)
  }
  const onInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }
  const income = () => {
    if (price === '') return 0
    return 98 * parseInt(price) / 100
  }
  const onChangeSendFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'instant') {
      setStock('0')
    }
    setFeature(event.target.value)
  }
  
  const titleLargeStyle = {
    fontSize: "16px",
    fontWeight: 700,
    color: "primary.main"
  }
  const titleMediumStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "primary.main"
  }
  const deliverySublabelStyle = {
    fontSize: "12px",
    color: "common.shade.200",
    ml: 3
  }
  
  const headingContiner = (
    <Box>
      <Autocomplete
        disablePortal
        options={category}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("variant.dialog.header.variant")}
            size="small"
          />
        )}
        sx={{ width: "100%" }}
      />
      <FormControlLabel
        control={
          <Checkbox />
        }
        label={t("variant.dialog.header.customName")}
      />
    </Box>
  )
  const deliveryContainer = (
    <Box>
      <Typography sx={titleMediumStyle}>
        {t("variant.dialog.delivery.label")}
      </Typography>
      <Typography sx={{
        fontSize: "12px",
        fontWeight: 500,
        color: "#9AA4BF"
      }}>
        {t("variant.dialog.delivery.subLabel")}
      </Typography>
      <RadioGroup
        defaultValue={feature}
        onChange={onChangeSendFeature}
      >
        <Box>
          <FormControlLabel
            value="regular"
            control={<Radio />}
            label={t("variant.dialog.delivery.regular.label")}
          />
          <Typography sx={deliverySublabelStyle}>
            {t("variant.dialog.delivery.regular.subLabel")}
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            value="kilat"
            control={<Radio />}
            label={
              <Image
                src="/assets/badge-kilat.svg"
                width={102}
                height={21}
                alt="Badge Kilat"
              />
            }
          />
          <Typography sx={deliverySublabelStyle}>
            {t("variant.dialog.delivery.kilat")}
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            value="instant"
            control={<Radio />}
            label={
              <Image
                src="/assets/badge-instant.svg"
                width={102}
                height={21}
                alt="Badge Instant"
              />
            }
          />
          <Typography sx={deliverySublabelStyle}>
            {t("variant.dialog.delivery.instant.label")}
          </Typography>
          <Typography sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "error.main",
            ml: 3
          }}>
            {t("variant.dialog.delivery.instant.subLabel")}
          </Typography>
        </Box>
      </RadioGroup>
    </Box>
  )
  const settingContainer = (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
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
            <Typography ml={2}>
              {t("variant.dialog.setting.alert", { discount: "2%", income: priceFormat(income()) })}
            </Typography>
          </Typography>
        </VGAlert>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <TextField
          variant="outlined"
          label={t("variant.dialog.setting.stock")}
          fullWidth
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          value={stock}
          disabled={feature === 'instant'}
          size="small"
          onChange={onInputStock}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <TextField
          variant="outlined"
          label={t("variant.dialog.setting.price.label")}
          helperText={t("variant.dialog.setting.price.subLabel")}
          fullWidth
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          size="small"
          onChange={onInputPrice}
        />
      </Grid>
    </Grid>
  )
  const footerContainer = (
    <>
      <Box>
        <FormControlLabel
          control={
            <Checkbox defaultChecked />
          }
          label={t("variant.dialog.image.label")}
        />
        <Typography sx={titleMediumStyle}>
          {t("variant.dialog.image.subLabel")}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}
      >
        <VGButton
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
        >
          {t("variant.dialog.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
        >
          {t("variant.dialog.save")}
        </VGButton>
      </Box>
    </>
  )
  
  return (
    <VGDialog
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Box p={2}>
        <Typography sx={titleLargeStyle}>
          {t("variant.dialog.title")}
        </Typography>
        {headingContiner}
        {deliveryContainer}
        {settingContainer}
        {footerContainer}
      </Box>
    </VGDialog>
  ) 
}
