import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Grid from "@mui/material/Grid";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useEffect, useState } from "react";
import queryString from "query-string";
import Skeleton from "@mui/material/Skeleton";
import { useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";

import { dateToTime, priceFormat } from "~/utils/format";
import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGRadio from "~/components/atomic/VGRadio";
import { useGetVariationMaster } from "~/services/api/masterData";
import { useGetProfile } from "~/services/api/auth";
import MenuItem from "@mui/material/MenuItem";
import ConfirmationDeleteVariantDialog from "~/components/molecule/ConfirmationDeleteVariantDialog";

interface Dropdown {
  label: string;
  value: string;
  price: number;
}
interface Variation {
  name: string;
  product_variation_master_id?: string;
  delivery_type: number;
  stock: number;
  price: number;
  is_active: boolean;
  is_custom_image: boolean;
}

export default function AddVariantDialog({
  isOpen,
  groupId,
  isVoucherInstant,
  variant,
  index,
  nextUpdatePrice,
  nextUpdateKilat,
  dataAction,
  onSubmit,
  onEditVariation,
  onDeleteVariant,
  handleClose
}: {
  isOpen: boolean;
  groupId: string;
  isVoucherInstant: boolean;
  variant?: Variation | undefined;
  index?: number;
  nextUpdatePrice?: string;
  nextUpdateKilat?: string;
  dataAction: {
    name: string;
    index: number;
    images_url?: string;
    is_active: boolean;
  };
  onSubmit: (variation: Variation) => void;
  onEditVariation: (value: Variation, index: number) => void;
  onDeleteVariant: (index: number) => void;
  handleClose: () => void;
}) {
  const { t } = useTranslation("addProduct");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<Variation>();
  const getVariation = useGetVariationMaster();
  const getProfile = useGetProfile();
  const [selectedVariation, setSelectedVariation] = useState<Dropdown>();
  const [isCustomName, setIsCustomName] = useState(false);
  const [name, setName] = useState("");
  const [feature, setFeature] = useState(0);
  const [stock, setStock] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState(false);
  const [variationOptions, setVariationOptions] = useState<Dropdown[]>([]);
  const [variationData, setVariationData] = useState<Variation>();
  const [isOpenDeleteProductDialog, setIsOpenDeleteProductDialog] = useState(false)

  useEffect(() => {
    if (isOpen) {
      getVariation.mutate(queryString.stringify({ group_id: groupId }))
      onChangeField("delivery_type", 0);
    }
  }, [isOpen])
  useEffect(() => {
    if (typeof variant !== "undefined") {
      if (variant.product_variation_master_id !== undefined) {
        onChangeField("product_variation_master_id", variant.product_variation_master_id);
        setSelectedVariation({
          label: variant.name,
          value: variant.product_variation_master_id,
          price: variant.price,
        })
      } else {
        setIsCustomName(true)
        setName(variant.name)
        setValue('name', variant.name)
      }
      setFeature(variant.delivery_type)
      setStock(variant.stock)
      setPrice(variant.price)
      onChangeImage(variant.is_custom_image)
      setVariationData(variant)
    }
  }, [variant])
  useEffect(() => {
    const variationOption: Dropdown[] = [];
    getVariation?.data?.data?.map((item) => {
      if (item) {
        variationOption?.push({
          label: item.name,
          value: item.id,
          price: item.price
        })
      }
    })
    setVariationOptions(variationOption)
    if (typeof variant === "undefined") {
      onChangeImage(false);
    }
  }, [getVariation?.data?.data, variant])
  useEffect(() => {
    if (typeof selectedVariation?.label !== 'undefined') {
      onChangeField("name", selectedVariation?.label);
    }
  }, [variationData?.product_variation_master_id])
  useEffect(() => {
    if (typeof selectedVariation?.price !== 'undefined') {
      setPrice(selectedVariation.price);
      onChangeField("price", selectedVariation?.price);
    }
  }, [variationData?.name])
  useEffect(() => {
    if (typeof name !== 'undefined') {
      onChangeField("name", name);
    }
  }, [name])
  useEffect(() => {
    onChangeField("delivery_type", feature);
    if (feature === 2 && typeof variant === "undefined") {
      setStock(0)
    }
  }, [feature])
  useEffect(() => {
    if (typeof stock !== 'undefined') {
      onChangeField("stock", stock);
    }
  }, [stock])
  useEffect(() => {
    if (typeof price !== 'undefined') {
      onChangeField("price", price);
    }
  }, [price])
  useEffect(() => {
    onChangeField("is_custom_image", image);
  }, [image])
  useEffect(() => {
    if (
      typeof variationData?.is_active !== 'undefined' &&
      typeof variant === 'undefined'
    ) {
      onSubmit(variationData);
      onCloseDialog();
    }
  }, [variationData?.is_active, variant])

  const onInputStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(parseInt(event.target.value))
  }
  const onInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value))
  }
  const onInputName = (name: string) => {
    setName(name)
  }
  const income = () => {
    if (!price) return 0
    return 98 * price / 100
  }
  const onChangeSendFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeature(parseInt(event.target.value))
  }
  const onChangeVariation = (uuid: string) => {
    const selectedVariant = variationOptions.find((item) => item.value === uuid)
    if (uuid) {
      onChangeField("product_variation_master_id", uuid);
      setSelectedVariation(selectedVariant);
    } else {
      onChangeField("product_variation_master_id", "");
      setSelectedVariation({
        label: "",
        value: "",
        price: 0,
      });
    }
  }
  const onChangeImage = (checked: boolean) => {
    setImage(checked);
    onChangeField("is_custom_image", checked);
  }
  const onChangeField = (key: keyof Variation, value: string | boolean | number | undefined) => {
    setVariationData({
      ...variationData,
      [key]: value
    } as unknown as Variation);
  }
  const onCloseDialog = () => {
    setPrice(undefined)
    setStock(undefined)
    setName("")
    setVariationData(undefined)
    setSelectedVariation(undefined)
    setFeature(0)
    setIsCustomName(false)
    setImage(false)
    reset()
    handleClose()
  }
  const onSaveCreate = () => {
    onChangeField("is_active", true);
  }
  const onSaveEdit = () => {
    if (typeof variationData !== "undefined" && typeof index !== "undefined") {
      onEditVariation(variationData, index)
    }
    onCloseDialog()
  }
  const onDelete = () => {
    onCloseDialog()
    if (typeof index !== "undefined") {
      onDeleteVariant(index)
    }
  }
  const onChangeCustomName = (checked: boolean) => {
    setIsCustomName(checked)
    if (checked) {
      onChangeField("product_variation_master_id", undefined)
    }
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
  const errorLabelStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "error.main",
    ml: 3
  }
  const hiddenArrow = {
    // Chrome, Safari, Edge, Opera
    '& input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button': {
      WebkitAppearance: "none",
      margin: 0,
    },

    // Firefox
    '& input[type="number"]': {
      MozAppearance: "textfield",
    },
  }

  const headingContiner = (
    <Box>
      {
        getVariation.isLoading
          ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height={40}
            />
          ) : !isCustomName
            ? (
              <TextField
                label={t("variant.dialog.header.variant")}
                select
                fullWidth
                autoComplete="off"
                size="small"
                {...register("name", { required: t("variant.dialog.header.error.required.variant") })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                value={selectedVariation?.value}
                onChange={(e) => onChangeVariation(e.target.value)}
              >
                {variationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                value={name}
                label={t("variant.dialog.header.variantCustom")}
                variant="outlined"
                size="small"
                fullWidth
                autoComplete="off"
                {...register("name", { required: t("variant.dialog.header.error.required.variantCustom") })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                onChange={(event) => onInputName(event.target.value)}
              />
            )
      }
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={isCustomName}
            onChange={(_, checked) => onChangeCustomName(checked)}
          />
        }
        label={t("variant.dialog.header.customName")}
      />
    </Box>
  )
  const deliveryContainer = (
    <Box>
      <Typography sx={{ ...titleMediumStyle, mt: 2 }}>
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
        {...register("delivery_type", { value: feature })}
        defaultValue={feature}
        onChange={onChangeSendFeature}
      >
        <Box>
          <FormControlLabel
            value={0}
            control={<VGRadio />}
            label={t("variant.dialog.delivery.regular.label")}
          />
          <Typography sx={deliverySublabelStyle}>
            {t("variant.dialog.delivery.regular.subLabel")}
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            value={1}
            disabled={
              !getProfile?.data?.data?.seller_has_kilat ||
              typeof nextUpdateKilat === 'string'
            }
            control={<VGRadio />}
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
            {t("variant.dialog.delivery.kilat.label")}
          </Typography>
          {
            !getProfile?.data?.data?.seller_has_kilat && (
              <Box>
                <Typography
                  component="span"
                  sx={errorLabelStyle}
                >
                  {t("variant.dialog.delivery.kilat.alert.title")}
                </Typography>
                <Typography
                  component="a"
                  fontSize={12}
                  fontWeight={700}
                  color="primary"
                  href="/seller/request/proses-kilat"
                  target="_blank"
                >
                  {t("variant.dialog.delivery.kilat.alert.subTitle")}
                </Typography>
              </Box>
            )
          }
          {
            typeof nextUpdateKilat === 'string' && (
              <Typography sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "error.main",
                ml: 3
              }}>
                {t("variant.dialog.delivery.kilat.alert.updateKilatTime", { time: dateToTime(nextUpdateKilat) })}
              </Typography>
            )
          }
        </Box>
        <Box>
          <FormControlLabel
            value={2}
            disabled={!getProfile?.data?.data?.seller_has_instant || !isVoucherInstant}
            control={<VGRadio />}
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
          {
            !getProfile?.data?.data?.seller_has_instant
              ? (
                <Box>
                  <Typography
                    component="span"
                    sx={errorLabelStyle}
                  >
                    {t("variant.dialog.delivery.kilat.alert.title")}
                  </Typography>
                  <Typography
                    component="a"
                    fontSize={12}
                    fontWeight={700}
                    color="primary"
                    href="/seller/request/instant"
                    target="_blank"
                  >
                    {t("variant.dialog.delivery.kilat.alert.subTitle")}
                  </Typography>
                </Box>
              ) : !isVoucherInstant
                ? (
                  <Typography sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "error.main",
                    ml: 3
                  }}>
                    {t("variant.dialog.delivery.instant.alert.noVoucher")}
                  </Typography>
                ) : ""
          }
        </Box>
      </RadioGroup>
    </Box>
  )
  const settingContainer = (
    <Grid
      container
      spacing={2}
      mt={0}
    >
      <Grid
        item
        xs={12}
      >
        <Typography sx={{ ...titleMediumStyle }}>
          {t("variant.dialog.setting.title")}
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
            <Typography ml={2} fontSize={12}>
              <Trans
                ns="addProduct"
                i18nKey={"variant.dialog.setting.alert"}
                components={{
                  strong: <Typography
                    component="span"
                    fontSize={12}
                    fontWeight={700}
                    color="primary"
                  />
                }}
                values={{ income: priceFormat(income()) }}
              />
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
          value={stock !== undefined ? stock : ""}
          variant="outlined"
          label={t("variant.dialog.setting.stock.label")}
          placeholder={t("variant.dialog.setting.stock.placeholder")}
          {...register("stock", {
            value: stock,
            required: t("variant.dialog.setting.error.required.stock"),
            validate: (inputStock) => {
              if (inputStock >= 0) {
                return true;
              }

              return t("variant.dialog.setting.error.noMinus", { field: "Stock" });
            }
          })}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            min: "0"
          }}
          error={Boolean(errors.stock)}
          helperText={errors.stock?.message}
          fullWidth
          type="number"
          disabled={feature === 2}
          size="small"
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+" || e.key === "-") {
              e.preventDefault()
            }
          }}
          onChange={onInputStock}
        />
        {
          feature === 2 && (
            <Typography
              color="common.shade.200"
              fontSize={12}
              fontWeight={600}
              mt={1}
            >
              <Trans
                ns="addProduct"
                i18nKey={"variant.dialog.setting.stock.note"}
              />
            </Typography>
          )
        }
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <TextField
          value={price !== undefined ? price : ""}
          variant="outlined"
          label={t("variant.dialog.setting.price.label")}
          placeholder={t("variant.dialog.setting.price.placeholder")}
          {...register("price", {
            value: price,
            required: t("variant.dialog.setting.error.required.price"),
            validate: (inputPrice) => {
              if (inputPrice % 100 !== 0) {
                return t("variant.dialog.setting.error.multiple100");
              }
              if (inputPrice < 0) {
                return t("variant.dialog.setting.error.noMinus", { field: "Price" });
              }

              return true;
            },
          })}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            min: "100"
          }}
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
          fullWidth
          type="number"
          size="small"
          disabled={Boolean(nextUpdatePrice)}
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+" || e.key === "-") {
              e.preventDefault()
            }
          }}
          onChange={onInputPrice}
          sx={hiddenArrow}
        />
        {
          Boolean(nextUpdatePrice)
            ? (
              <Typography
                color="success.dark"
                fontSize={12}
                fontWeight={600}
                mt={1}
              >
                {t("variant.error.updatePriceTime", { time: dateToTime(nextUpdatePrice as string) })}
              </Typography>
            ) : (
              <Typography
                color="common.shade.200"
                fontSize={12}
                fontWeight={600}
                mt={1}
              >
                {t("variant.dialog.setting.price.note")}
              </Typography>
            )
        }
      </Grid>
    </Grid>
  )
  const footerContainer = (
    <>
      <Box mt={2}>
        <FormControlLabel
          control={
            <Switch
              checked={image}
              onChange={(_, checked) => onChangeImage(checked)}
            />
          }
          label={
            image
              ? t("variant.dialog.image.label.yes")
              : t("variant.dialog.image.label.no")
          }
        />
        <Typography
          sx={{
            ...titleMediumStyle,
            color: image ? "primary.main" : "common.shade.100"
          }}
        >
          {
            image
              ? t("variant.dialog.image.subLabel.yes")
              : t("variant.dialog.image.subLabel.no")
          }
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent={
          typeof variant !== "undefined"
            ? "space-between"
            : "flex-end"
        }
        mt={3}
      >
        {
          typeof variant !== "undefined" && (
            <VGButton
              variant="outlined"
              color="error"
              onClick={() => setIsOpenDeleteProductDialog(true)}
            >
              {t("variant.dialog.delete")}
            </VGButton>
          )
        }
        <Box>
          <VGButton
            variant="outlined"
            color="secondary"
            sx={{ mr: 2 }}
            onClick={onCloseDialog}
          >
            {t("variant.dialog.cancel")}
          </VGButton>
          <VGButton
            variant="contained"
            color="success"
            type="submit"
          >
            {t("variant.dialog.save")}
          </VGButton>
        </Box>
      </Box>
    </>
  )

  return (
    <>
      <VGDialog
        isOpen={isOpen}
        onClose={onCloseDialog}
      >
        <Box p={2}>
          <Typography sx={{ ...titleLargeStyle, mb: 2 }}>
            {
              typeof variant !== "undefined"
                ? t("variant.dialog.title.edit")
                : t("variant.dialog.title.add")
            }
          </Typography>
          <form onSubmit={handleSubmit(
            typeof variant !== "undefined" ? onSaveEdit : onSaveCreate
          )}>
            {headingContiner}
            {deliveryContainer}
            {settingContainer}
            {footerContainer}
          </form>
        </Box>
      </VGDialog>

      <ConfirmationDeleteVariantDialog
        id={dataAction.name}
        name={dataAction.name}
        image={dataAction.images_url}
        isOpen={isOpenDeleteProductDialog}
        handleClose={() => setIsOpenDeleteProductDialog(false)}
        handleDelete={onDelete}
      />
    </>
  )
}
