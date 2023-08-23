import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
  useForm,
  Controller,
  useFieldArray,
  type FieldArrayWithId,
  type UseFormReturn,
} from "react-hook-form";

import {
  disableDialogOpenAtom,
  managePromoFormAtom,
  performanceDialogOpenAtom,
} from "~/atom/managePromo";
import {
  type BodyPromo,
  promoSchema,
  promoSchemaMerge,
} from "~/services/managePromo/types";
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
  useCheckPromoCode,
  useCreatePromo,
  useGetPromoDetailMapped,
} from "~/services/managePromo/hooks";

export default function ManagePromoForm() {
  const { t } = useTranslation("managePromo");
  const [, setPerformanceOpen] = useAtom(performanceDialogOpenAtom);
  const [, setDisableOpen] = useAtom(disableDialogOpenAtom);
  const [managePromoForm, setManagePromoForm] = useAtom(managePromoFormAtom);
  const [discountType, setDiscountType] = useState<"price" | "percentage">(
    "price"
  );
  const { data: categoriesData } = useGetCategory();
  const { data: promoDetailData } = useGetPromoDetailMapped(
    managePromoForm.promoId,
    managePromoForm.isOpen
  );

  const checkCodeMutation = useCheckPromoCode();
  const createPromoMutation = useCreatePromo();

  const form = useForm<BodyPromo>({
    resolver: zodResolver(
      promoSchema.merge(promoSchemaMerge(checkCodeMutation.mutateAsync)),
      undefined,
      {
        mode: "async",
      }
    ),
    values: promoDetailData?.data,
  });
  const productForm = useFieldArray<BodyPromo, "items", "id">({
    control: form.control,
    name: "items",
    rules: { minLength: 1 },
  });

  useEffect(() => {
    if (!managePromoForm.isOpen) {
      form.reset();
      productForm.remove();
    } else {
      if (productForm.fields.length === 0) {
        productForm.append({ category_id: "", brand_id: [] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managePromoForm.isOpen]);

  const isDisabled = managePromoForm.type === "disabled";

  return (
    <Dialog
      open={managePromoForm.isOpen}
      onClose={() => setManagePromoForm({ isOpen: false })}
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "100vh",
        },
      }}
      maxWidth="md"
    >
      <form
        onSubmit={form.handleSubmit((data) => {
          createPromoMutation.mutate(data, {
            onSuccess: () => {
              setManagePromoForm({ isOpen: false });
            },
          });
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
            onClick={() => setManagePromoForm({ isOpen: false })}
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
                }}
                TextFieldProps={{
                  fullWidth: true,
                  placeholder: t(
                    "form.addPromo.fields.period.start.placeholder"
                  ),
                  disabled: isDisabled,
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
                }}
                TextFieldProps={{
                  fullWidth: true,
                  placeholder: t("form.addPromo.fields.period.end.placeholder"),
                  disabled: isDisabled,
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
                    onChange={onChange}
                    value={value}
                    fullWidth
                    helperText={error ? error.message : null}
                    error={!!error}
                    disabled={isDisabled}
                    inputProps={{
                      maxLength: 5,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {value?.length ?? 0}/5
                        </InputAdornment>
                      ),
                    }}
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
                />
                <FormControlLabel
                  control={<Radio />}
                  value="percentage"
                  label={t(
                    "form.addPromo.fields.discountType.percentage.label"
                  )}
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
                      label: t("form.addPromo.fields.discountNominal.label"),
                      placeholder: t(
                        "form.addPromo.fields.discountNominal.placeholder"
                      ),
                      fullWidth: true,
                      disabled: isDisabled,
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
                    }}
                    addOnChange={() =>
                      form.resetField(`items.${index}.brand_id` as const)
                    }
                  >
                    {categoriesData?.data.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </VGInputText>
                </Grid>
                <Grid xs={8}>
                  <BrandInputText field={field} form={form} index={index} />
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
            </Grid>
          </Grid>
        </DialogContent>
        {isDisabled && (
          <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
            <VGButton
              variant="outlined"
              size="large"
              onClick={() => setDisableOpen(true)}
              color="error"
            >
              {t("btn.disablePromo")}
            </VGButton>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <VGButton
                variant="outlined"
                size="large"
                onClick={() => setPerformanceOpen(true)}
                color="primary"
              >
                {t("btn.promoPerformance")}
              </VGButton>
              <VGButton
                variant="contained"
                size="large"
                onClick={() => setManagePromoForm({ isOpen: false })}
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
              onClick={() => setPerformanceOpen(true)}
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
}: {
  field: FieldArrayWithId<BodyPromo, "items", "id">;
  form: UseFormReturn<BodyPromo>;
  index: number;
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
                  sx={{ color: "primary.main" }}
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
