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
  disableDialogAtom,
  managePromoFormAtom,
  performanceDialogAtom,
} from "~/atom/managePromo";
import {
  type BodyPromo,
  promoSchema,
  promoSchemaMerge,
  emptyPromo,
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
  useUpdatePromo,
} from "~/services/managePromo/hooks";
import { queryClient } from "~/services/http";
import { toast } from "react-toastify";
import { toastOption } from "~/utils/toast";
import { AxiosError } from "axios";

export default function ManagePromoForm() {
  const { t } = useTranslation("managePromo");
  const [, setPerformanceOpen] = useAtom(performanceDialogAtom);
  const [, setDisableOpen] = useAtom(disableDialogAtom);
  const [managePromoForm, setManagePromoForm] = useAtom(managePromoFormAtom);
  const [discountType, setDiscountType] = useState<"price" | "percentage">(
    "price"
  );
  const [codeConfirm, setCodeConfirm] = useState(false);
  const { data: categoriesData } = useGetCategory();
  const { data: promoDetailData } = useGetPromoDetailMapped(
    managePromoForm.promoId,
    managePromoForm.isOpen
  );

  const checkCodeMutation = useCheckPromoCode();
  const createPromoMutation = useCreatePromo();
  const updatePromoMutation = useUpdatePromo();

  const form = useForm<BodyPromo>({
    resolver: zodResolver(
      promoSchema.merge(
        promoSchemaMerge((body) => {
          if (promoDetailData?.data.promo_code !== body.promo_code) {
            return checkCodeMutation.mutateAsync(body, {
              onSuccess: () => {
                setCodeConfirm(true);
              },
            });
          }
        })
      ),
      undefined,
      {
        mode: "async",
      }
    ),
    defaultValues: emptyPromo,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values: promoDetailData?.data,
  });
  const productForm = useFieldArray<BodyPromo, "items", "id">({
    control: form.control,
    name: "items",
    rules: { minLength: 1 },
  });

  const isDisabled = managePromoForm.type === "disabled";

  useEffect(() => {
    if (!managePromoForm.isOpen) {
      form.reset(emptyPromo);
      productForm.remove();
      queryClient.removeQueries({
        queryKey: ["manage-promo-detail-mapped", managePromoForm.promoId],
      });
    } else {
      if (productForm.fields.length === 0) {
        productForm.append({ category_id: "", brand_id: [] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managePromoForm.isOpen, managePromoForm.promoId]);

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
          if (["create", "reuse"].includes(managePromoForm.type ?? "")) {
            createPromoMutation.mutate(data, {
              onSuccess: () => {
                setManagePromoForm({ isOpen: false });
              },
              onError(error) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                toast.error((error as any).response.data.message, toastOption);
              },
            });
          }
          if (managePromoForm.type === "edit" && managePromoForm.promoId) {
            updatePromoMutation.mutate(
              { promo_id: managePromoForm.promoId, body: data },
              {
                onSuccess: () => {
                  setManagePromoForm({ isOpen: false });
                },
                onError(error) {
                  toast.error(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                    (error as any).response.data.message,
                    toastOption
                  );
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
                    onChange={onChange}
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
                    {categoriesData?.data.map((category) => (
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
