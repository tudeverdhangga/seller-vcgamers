import { Trans, useTranslation } from "next-i18next";
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
import { useEffect, useState } from "react";
import queryString from "query-string";
import Skeleton from "@mui/material/Skeleton";
import { useForm } from "react-hook-form";

import { priceFormat } from "~/utils/format";
import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import { useGetVariationMaster } from "~/services/api/masterData";
import { useGetProfile } from "~/services/api/auth";

interface Dropdown {
  label: string;
  value: string;
  price: number;
}
interface Variation {
  name: string;
  product_variation_master_id: string;
  delivery_type: number;
  stock: number;
  price: number;
  is_active: boolean;
  is_custom_image: boolean;
}

export default function AddVariantDialog(props: {
  isOpen: boolean;
  groupId: string;
  isVoucherInstant: boolean;
  variant?: Variation | undefined;
  index?: number;
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
    formState: { errors }
  } = useForm<Variation>({
    criteriaMode: "all"
  });
  const getVariation = useGetVariationMaster()
  const getProfile = useGetProfile();
  const {
    isOpen,
    handleClose,
    onSubmit,
    onEditVariation,
    onDeleteVariant
  } = props;
  const [selectedVariation, setSelectedVariation] = useState<Dropdown>()
  const [feature, setFeature] = useState(0)
  const [stock, setStock] = useState<number>()
  const [price, setPrice] = useState<number>()
  const [image, setImage] = useState(true);
  const [variationOptions, setVariationOptions] = useState<Dropdown[]>([])
  const [variationData, setVariationData] = useState<Variation>();

  useEffect(() => {
    if (isOpen) {
      getVariation.mutate(queryString.stringify({ group_id: props.groupId }))
      onChangeField("delivery_type", 0);
    }
  }, [isOpen])
  useEffect(() => {
    if (typeof props.variant !== "undefined") {
      const value = {
        label: props.variant.name,
        value: props.variant.product_variation_master_id,
        price: props.variant.price,
      }
      onChangeVariation(value)
      setFeature(props.variant.delivery_type)
      setStock(props.variant.stock)
      setPrice(props.variant.price)
      onChangeImage(props.variant.is_custom_image)
      setVariationData(props.variant)
    }
  }, [props.variant])
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
    if (typeof props.variant === "undefined") {
      onChangeImage(true);
    }
  }, [getVariation?.data?.data, props.variant])
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
    onChangeField("delivery_type", feature);
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
      typeof props.variant === 'undefined'
    ) {
      onSubmit(variationData);
      onCloseDialog();
    }
  }, [variationData?.is_active, props.variant])

  const onInputStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(parseInt(event.target.value))
  }
  const onInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value))
  }
  const income = () => {
    if (!price) return 0
    return 98 * price / 100
  }
  const onChangeSendFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '2') {
      setStock(0)
    }
    setFeature(parseInt(event.target.value))
  }
  const onChangeVariation = (value: Dropdown | null) => {
    if (value) {
      onChangeField("product_variation_master_id", value?.value);
      setSelectedVariation(value);
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
  const onChangeField = (key: keyof Variation, value: string | boolean | number) => {
    setVariationData({
      ...variationData,
      [key]: value
    } as unknown as Variation);
  }
  const onCloseDialog = () => {
    setPrice(undefined)
    setStock(undefined)
    setVariationData(undefined)
    setSelectedVariation(undefined)
    setFeature(0)
    setImage(true)
    handleClose()
    reset()
  }
  const onSaveCreate = () => {
    onChangeField("is_active", true);
  }
  const onSaveEdit = () => {
    if (typeof variationData !== "undefined" && typeof props.index !== "undefined") {
      onEditVariation(variationData, props.index)
    }
    onCloseDialog()
  }
  const onDelete = () => {
    onCloseDialog()
    if (typeof props.index !== "undefined") {
      onDeleteVariant(props.index)
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
    color: image ? "primary.main" : "common.shade.100"
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
          ) : (
            <Autocomplete
              value={selectedVariation}
              disablePortal
              options={variationOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("variant.dialog.header.variant")}
                  size="small"
                  {...register("product_variation_master_id", { required: "Variant is required." })}
                  error={Boolean(errors.product_variation_master_id)}
                  helperText={errors.product_variation_master_id?.message}
                />
              )}
              sx={{ width: "100%" }}
              onChange={(_, e) => onChangeVariation(e)}
            />
          )
      }
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
        {...register("delivery_type", { value: feature })}
        defaultValue={feature}
        onChange={onChangeSendFeature}
      >
        <Box>
          <FormControlLabel
            value={0}
            control={<Radio />}
            label={t("variant.dialog.delivery.regular.label")}
          />
          <Typography sx={deliverySublabelStyle}>
            {t("variant.dialog.delivery.regular.subLabel")}
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            value={1}
            disabled={getProfile?.data?.data?.seller_has_kilat}
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
            {t("variant.dialog.delivery.kilat.label")}
          </Typography>
          {
            getProfile?.data?.data?.seller_has_kilat && (
              <Typography component="p">
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
                >
                  {t("variant.dialog.delivery.kilat.alert.subTitle")}
                </Typography>
              </Typography>
            )
          }
        </Box>
        <Box>
          <FormControlLabel
            value={2}
            disabled={getProfile?.data?.data?.seller_has_kilat && !props.isVoucherInstant}
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
          {
            getProfile?.data?.data?.seller_has_kilat
              ? (
                <Typography component="p">
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
                  >
                    {t("variant.dialog.delivery.kilat.alert.subTitle")}
                  </Typography>
                </Typography>
              ) : !props.isVoucherInstant
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
          value={stock}
          variant="outlined"
          label={t("variant.dialog.setting.stock")}
          {...register("stock", {
            value: stock,
            required: "Stock is required."
          })}
          error={Boolean(errors.stock)}
          helperText={errors.stock?.message}
          fullWidth
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          disabled={feature === 2}
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
          value={price}
          variant="outlined"
          label={t("variant.dialog.setting.price.label")}
          {...register("price", {
            value: price,
            required: "Price is required.",
            validate: (inputPrice) => {
              if (inputPrice % 100 === 0) {
                return true;
              }

              return t("variant.dialog.setting.price.subLabel");
            }
          })}
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
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
            <Checkbox
              defaultChecked={image}
              onChange={(_, checked) => onChangeImage(checked)}
            />
          }
          label={
            image
              ? t("variant.dialog.image.label.yes")
              : t("variant.dialog.image.label.no")
          }
        />
        <Typography sx={titleMediumStyle}>
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
          typeof props.variant !== "undefined"
            ? "space-between"
            : "flex-end"
        }
        mt={3}
      >
        {
          typeof props.variant !== "undefined" && (
            <VGButton
              variant="outlined"
              color="error"
              onClick={onDelete}
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
    <VGDialog
      isOpen={isOpen}
      onClose={onCloseDialog}
    >
      <Box p={2}>
        <Typography sx={titleLargeStyle}>
          {
            typeof props.variant !== "undefined"
              ? t("variant.dialog.title.add")
              : t("variant.dialog.title.edit")
          }
        </Typography>
        <form onSubmit={handleSubmit(
          typeof props.variant !== "undefined" ? onSaveEdit : onSaveCreate
        )}>
          {headingContiner}
          {deliveryContainer}
          {settingContainer}
          {footerContainer}
        </form>
      </Box>
    </VGDialog>
  )
}
