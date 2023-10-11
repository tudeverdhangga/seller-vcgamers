import { useEffect, useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import {
  type useForm,
  Controller,
  type useFieldArray,
  type FieldArrayWithId,
  type UseFormReturn,
} from "react-hook-form";

import {
  codeConfirmAtom,
  disableDialogAtom,
  managePromoFormAtom,
  performanceDialogAtom,
} from "~/atom/managePromo";
import { type BodyPromo } from "~/services/managePromo/types";
import {
  useGetBrandsByCategory,
  useGetCategory,
} from "~/services/api/masterData";
import VGButton from "../atomic/VGButton";
import VGChip from "../atomic/VGChip";
import VGInputText from "../atomic/VGInputText";
import VGInputDate from "../atomic/VGInputDate";
import VGInputNumber from "../atomic/VGInputNumber";
import {
  useCreatePromo,
  type useGetPromoDetailMapped,
  useUpdatePromo,
} from "~/services/managePromo/hooks";
import dayjs from "dayjs";

export default function ManagePromoForm({
  form,
  productForm,
  promoDetailData,
}: {
  form: ReturnType<typeof useForm<BodyPromo>>;
  productForm: ReturnType<typeof useFieldArray<BodyPromo, "items", "id">>;
  promoDetailData?: ReturnType<typeof useGetPromoDetailMapped>["data"];
}) {
  const { t } = useTranslation("managePromo");
  const [, setPerformanceOpen] = useAtom(performanceDialogAtom);
  const [, setDisableOpen] = useAtom(disableDialogAtom);
  const [managePromoForm, setManagePromoForm] = useAtom(managePromoFormAtom);
  const [codeConfirm, setCodeConfirm] = useAtom(codeConfirmAtom);
  const { data: categoriesData } = useGetCategory();
  const [discountType, setDiscountType] = useState<"price" | "percentage">(
    promoDetailData?.data.is_percent ? "percentage" : "price"
  );

  const createPromoMutation = useCreatePromo();
  const updatePromoMutation = useUpdatePromo();

  const isDisabled = managePromoForm.type === "disabled";

  const handleClose = () => {
    setCodeConfirm(false);
    setManagePromoForm({ isOpen: false });
  };

  useEffect(() => {
    if (promoDetailData?.data.is_percent !== undefined) {
      setDiscountType(
        promoDetailData?.data.is_percent ? "percentage" : "price"
      );
    }
  }, [promoDetailData?.data.is_percent]);

  return (
    <Dialog
      open={managePromoForm.isOpen}
      onClose={handleClose}
      fullWidth
      PaperProps={{ sx: { maxHeight: "100vh" } }}
      maxWidth="md"
    >
      <form
        onSubmit={form.handleSubmit((data) => {
          if (["create", "reuse"].includes(managePromoForm.type ?? "")) {
            createPromoMutation.mutate(data, {
              onSuccess: () => {
                handleClose();
              },
            });
          }
          if (managePromoForm.type === "edit" && managePromoForm.promoId) {
            updatePromoMutation.mutate(
              { promo_id: managePromoForm.promoId, body: data },
              {
                onSuccess: () => {
                  handleClose();
                },
              }
            );
          }
        })}
      >
        <DialogTitle
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          <p>
            {t(isDisabled ? "form.detailPromo.title" : "form.addPromo.title")}
          </p>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={2} sx={{ py: 1 }}>
            <Grid xs={12}>
              <VGInputText
                ControllerProps={{
                  control: form.control,
                  name: "name",
                }}
                TextFieldProps={{
                  label: t("form.addPromo.fields.name.label"),
                  placeholder: t("form.addPromo.fields.name.placeholder"),
                  fullWidth: true,
                  disabled: isDisabled,
                  sx: {
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                    },
                  },
                }}
              />
            </Grid>
            <Grid xs={6}>
              <VGInputDate
                ControllerProps={{
                  name: "date_start",
                  control: form.control,
                }}
                DatePickerProps={{
                  label: t("form.addPromo.fields.period.start.label"),
                  minDate: dayjs().add(3, "day"),
                }}
                TextFieldProps={{
                  fullWidth: true,
                  placeholder: t(
                    "form.addPromo.fields.period.start.placeholder"
                  ),
                  disabled: isDisabled,
                  sx: {
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                    },
                  },
                }}
              />
            </Grid>
            <Grid xs={6}>
              <VGInputDate
                ControllerProps={{
                  name: "date_end",
                  control: form.control,
                }}
                DatePickerProps={{
                  label: t("form.addPromo.fields.period.end.label"),
                  disablePast: true,
                  minDate: dayjs().add(3, "day"),
                }}
                TextFieldProps={{
                  fullWidth: true,
                  placeholder: t("form.addPromo.fields.period.end.placeholder"),
                  disabled: isDisabled,
                  sx: {
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                    },
                  },
                }}
              />
            </Grid>
            <Grid sm={4}>
              <Controller
                control={form.control}
                name="promo_code"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label={t("form.addPromo.fields.code.label")}
                    placeholder={t("form.addPromo.fields.code.placeholder")}
                    FormHelperTextProps={{ sx: { m: 0 } }}
                    onChange={(e) => {
                      setCodeConfirm(false);
                      return onChange(e);
                    }}
                    value={value}
                    fullWidth
                    helperText={
                      error
                        ? error.message
                        : codeConfirm
                        ? t("form.addPromo.fields.code.helperText")
                        : null
                    }
                    error={!!error}
                    disabled={isDisabled}
                    sx={{
                      "& .MuiInputBase-root.Mui-disabled": {
                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: 12,
                        fontWeight: 600,
                        color: "common.green.900",
                      },
                    }}
                    inputProps={{
                      maxLength: 20,
                    }}
                    InputProps={{
                      sx: { borderRadius: "5px" },
                      endAdornment: (
                        <InputAdornment position="end">
                          {value?.length ?? 0}/20
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid sm={4}>
              <VGInputNumber
                ControllerProps={{
                  control: form.control,
                  name: "stock",
                  defaultValue: 10,
                }}
                TextFieldProps={{
                  label: t("form.addPromo.fields.qty.label"),
                  placeholder: t("form.addPromo.fields.qty.helperText"),
                  helperText: "Minimum: 10",
                  fullWidth: true,
                  disabled: isDisabled,
                  sx: {
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                    },
                  },
                }}
              />
            </Grid>
            <Grid sm={4}>
              <VGInputNumber
                ControllerProps={{
                  control: form.control,
                  name: "limit_user",
                  defaultValue: 1,
                }}
                TextFieldProps={{
                  label: t("form.addPromo.fields.userLimit.label"),
                  placeholder: t("form.addPromo.fields.userLimit.helperText"),
                  helperText: "Minimum: 1",
                  fullWidth: true,
                  disabled: isDisabled,
                  sx: {
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                    },
                  },
                }}
              />
            </Grid>
            <Grid xs={12}>
              <Typography
                component="span"
                fontSize={14}
                fontWeight={700}
                color="common.purple.500"
              >
                {t("form.addPromo.fields.info.title")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  backgroundColor: "common.purple.100",
                  p: 2,
                  mt: "10px",
                  borderRadius: "5px",
                }}
              >
                <InfoOutlinedIcon color="primary" fontSize="small" />
                <Typography
                  color="common.purple.500"
                  fontSize={14}
                  fontWeight={500}
                >
                  {t("form.addPromo.fields.info.subtitle")}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12}>
              <RadioGroup
                row
                value={discountType}
                onChange={(e) => {
                  const value = e.target.value as "price" | "percentage";
                  setDiscountType(value);
                  form.setValue("is_percent", value === "percentage");
                }}
              >
                <FormControlLabel
                  control={<Radio />}
                  value="price"
                  label={t("form.addPromo.fields.discountType.price.label")}
                  disabled={isDisabled}
                />
                <FormControlLabel
                  control={<Radio />}
                  value="percentage"
                  label={t(
                    "form.addPromo.fields.discountType.percentage.label"
                  )}
                  disabled={isDisabled}
                />
              </RadioGroup>
            </Grid>

            {discountType === "price" && (
              <>
                <Grid xs={4}>
                  <VGInputNumber
                    ControllerProps={{
                      control: form.control,
                      name: "amount_promo",
                    }}
                    TextFieldProps={{
                      label: t("form.addPromo.fields.discountNominal.label"),
                      placeholder: t(
                        "form.addPromo.fields.discountNominal.placeholder"
                      ),
                      fullWidth: true,
                      disabled: isDisabled,
                      sx: {
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid xs={4}>
                  <VGInputNumber
                    ControllerProps={{
                      control: form.control,
                      name: "minimum_transaction_amount",
                    }}
                    TextFieldProps={{
                      label: t(
                        "form.addPromo.fields.discountMinimumTransaction.label"
                      ),
                      placeholder: t(
                        "form.addPromo.fields.discountMinimumTransaction.placeholder"
                      ),
                      helperText: t(
                        "form.addPromo.fields.discountMinimumTransaction.helperText"
                      ),
                      fullWidth: true,
                      disabled: isDisabled,
                      sx: {
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      },
                    }}
                  />
                </Grid>
              </>
            )}

            {discountType === "percentage" && (
              <>
                <Grid xs={4}>
                  <VGInputNumber
                    ControllerProps={{
                      control: form.control,
                      name: "percent_promo",
                    }}
                    TextFieldProps={{
                      label: t("form.addPromo.fields.discountPercentage.label"),
                      placeholder: t(
                        "form.addPromo.fields.discountPercentage.placeholder"
                      ),
                      fullWidth: true,
                      disabled: isDisabled,
                      sx: {
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      },
                      inputProps: {
                        isAllowed: (values: { floatValue?: number }) => {
                          const { floatValue } = values;
                          return (
                            floatValue === undefined ||
                            (floatValue >= 1 && floatValue <= 100)
                          );
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid xs={4}>
                  <VGInputNumber
                    ControllerProps={{
                      control: form.control,
                      name: "minimum_transaction_amount",
                    }}
                    TextFieldProps={{
                      label: t(
                        "form.addPromo.fields.discountMinimumTransaction.label"
                      ),
                      placeholder: t(
                        "form.addPromo.fields.discountMinimumTransaction.placeholder"
                      ),
                      fullWidth: true,
                      disabled: isDisabled,
                      sx: {
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid xs={4}>
                  <VGInputNumber
                    ControllerProps={{
                      control: form.control,
                      name: "maximum_discount_amount",
                    }}
                    TextFieldProps={{
                      label: t(
                        "form.addPromo.fields.discountMaximumTransaction.label"
                      ),
                      placeholder: t(
                        "form.addPromo.fields.discountMaximumTransaction.placeholder"
                      ),
                      fullWidth: true,
                      disabled: isDisabled,
                      sx: {
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      },
                    }}
                  />
                </Grid>
              </>
            )}

            <Divider sx={{ borderStyle: "dashed" }} />

            <Grid xs={12}>
              <Typography
                component="span"
                fontSize={14}
                fontWeight={700}
                color="common.purple.500"
              >
                {t("form.addPromo.fields.product.title")}
              </Typography>
            </Grid>
            {productForm.fields.map((field, index) => (
              <>
                <Grid xs={4} key={field.id}>
                  <VGInputText
                    ControllerProps={{
                      control: form.control,
                      name: `items.${index}.category_id` as const,
                    }}
                    TextFieldProps={{
                      label: t("form.addPromo.fields.category.label", {
                        value: index + 1,
                      }),
                      select: true,
                      fullWidth: true,
                      disabled: isDisabled,
                      sx: {
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      },
                    }}
                    addOnChange={() =>
                      form.resetField(`items.${index}.brand_id` as const)
                    }
                  >
                    {categoriesData?.data
                      .filter(
                        (d) =>
                          !productForm.fields
                            .map((f) => f.category_id)
                            .includes(d.id) || field.category_id === d.id
                      )
                      .map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </VGInputText>
                </Grid>
                <Grid xs={8}>
                  <BrandInputText
                    field={field}
                    form={form}
                    index={index}
                    disabled={isDisabled}
                  />
                </Grid>
              </>
            ))}
            <Grid xs={12}>
              <VGButton
                disabled={isDisabled}
                onClick={() =>
                  productForm.append({ category_id: "", brand_id: [] })
                }
              >
                {t("form.addPromo.fields.addCategory.title")}
              </VGButton>
              <VGButton
                disabled={isDisabled || productForm.fields.length === 1}
                onClick={() => productForm.remove(-1)}
              >
                {t("form.addPromo.fields.deleteCategory.title")}
              </VGButton>
            </Grid>
          </Grid>
        </DialogContent>
        {isDisabled && (
          <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
            {managePromoForm.promo.can_deactivate ? (
              <VGButton
                variant="outlined"
                size="large"
                onClick={() => setDisableOpen(true)}
                color="error"
              >
                {t("btn.disablePromo")}
              </VGButton>
            ) : (
              <div></div>
            )}
            <Box sx={{ display: "flex", gap: "20px" }}>
              <VGButton
                variant="outlined"
                size="large"
                onClick={() =>
                  setPerformanceOpen({
                    isOpen: true,
                    promoId: promoDetailData?.data.id,
                  })
                }
                color="primary"
              >
                {t("btn.promoPerformance")}
              </VGButton>
              <VGButton
                variant="contained"
                size="large"
                onClick={handleClose}
                color="primary"
              >
                {t("btn.close")}
              </VGButton>
            </Box>
          </DialogActions>
        )}
        {managePromoForm.type === "reuse" && (
          <DialogActions
            sx={{ justifyContent: "end", px: 3, pb: 3, gap: "20px" }}
          >
            <VGButton
              variant="outlined"
              size="large"
              onClick={() =>
                setPerformanceOpen({
                  isOpen: true,
                  promoId: promoDetailData?.data.id,
                })
              }
              color="primary"
            >
              {t("btn.promoPerformance")}
            </VGButton>
            <VGButton
              variant="contained"
              size="large"
              type="submit"
              color="success"
            >
              {t("btn.editPromo")}
            </VGButton>
          </DialogActions>
        )}
        {["create", "edit"].includes(managePromoForm.type ?? "") && (
          <DialogActions
            sx={{ justifyContent: "end", px: 3, pb: 3, gap: "20px" }}
          >
            <VGButton
              variant="contained"
              size="large"
              type="submit"
              color="success"
            >
              {t(
                `btn.${managePromoForm.type as "create" | "edit"}Promo` as const
              )}
            </VGButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

function BrandInputText({
  field,
  form,
  index,
  disabled,
}: {
  field: FieldArrayWithId<BodyPromo, "items", "id">;
  form: UseFormReturn<BodyPromo>;
  index: number;
  disabled: boolean;
}) {
  const { t } = useTranslation("managePromo");
  const categoryId = form.watch(`items.${index}.category_id` as const);
  const { data: brandsData } = useGetBrandsByCategory(categoryId);

  return (
    <VGInputText
      key={field.id}
      ControllerProps={{
        control: form.control,
        name: `items.${index}.brand_id` as const,
      }}
      TextFieldProps={{
        label: t("form.addPromo.fields.brand.label", {
          value: 1,
        }),
        placeholder: t("form.addPromo.fields.brand.placeholder"),
        select: true,
        fullWidth: true,
        disabled,
        sx: {
          "& .MuiInputBase-root.Mui-disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
          },
        },
        SelectProps: {
          multiple: true,
          renderValue: (selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <VGChip
                  key={value}
                  label={
                    brandsData?.data.find((brand) => brand.id === value)?.name
                  }
                  color="primary"
                  sx={{
                    color: "primary.main",
                    "& .MuiChip-deleteIcon": {
                      color: "common.purple.500",
                      padding: "2px",
                    },
                    "& .MuiChip-deleteIcon:hover": {
                      color: "common.purple.700",
                      borderRadius: "50%",
                      backgroundColor: "common.purple.0",
                    },
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  deleteIcon={<CloseIcon />}
                  onDelete={() => {
                    form.setValue(
                      `items.${index}.brand_id` as const,
                      (selected as string[]).filter(
                        (brandId) => brandId !== value
                      )
                    );
                  }}
                />
              ))}
            </Box>
          ),
        },
      }}
    >
      {brandsData?.data.map((brand) => (
        <MenuItem key={brand.id} value={brand.id}>
          {brand.name}
        </MenuItem>
      ))}
    </VGInputText>
  );
}
