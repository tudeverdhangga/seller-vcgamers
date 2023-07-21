import { useState } from "react";

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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import {
  managePromoFormAtom,
  performanceDialogOpenAtom,
  disableDialogOpenAtom,
} from "~/atom/managePromo";
import VGButton from "../atomic/VGButton";
import VGChip from "../atomic/VGChip";
import CloseIcon from "../icons/chat/CloseIcon";

export default function ManagePromoForm() {
  const { t } = useTranslation("managePromo");
  const [, setPerformanceOpen] = useAtom(performanceDialogOpenAtom);
  const [, setDisableOpen] = useAtom(disableDialogOpenAtom);
  const [managePromoForm, setManagePromoForm] = useAtom(managePromoFormAtom);
  const [discountType, setDiscountType] = useState<"price" | "percentage">(
    "price"
  );

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
      <form>
        <DialogTitle
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          <p>
            {t(
              managePromoForm.type === "disabled"
                ? "form.detailPromo.title"
                : "form.addPromo.title"
            )}
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
              <TextField
                label={t("form.addPromo.fields.name.label")}
                placeholder={t("form.addPromo.fields.name.placeholder")}
                fullWidth
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid xs={6}>
                <DatePicker
                  label={t("form.addPromo.fields.period.start.label")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: t(
                        "form.addPromo.fields.period.start.placeholder"
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid xs={6}>
                <DatePicker
                  label={t("form.addPromo.fields.period.end.label")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: t(
                        "form.addPromo.fields.period.end.placeholder"
                      ),
                    },
                  }}
                />
              </Grid>
            </LocalizationProvider>
            <Grid sm={4}>
              <TextField
                label={t("form.addPromo.fields.code.label")}
                placeholder={t("form.addPromo.fields.code.placeholder")}
                FormHelperTextProps={{ sx: { m: 0 } }}
                helperText={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "common.shade.50",
                        px: "20px",
                        py: 1,
                        borderRadius: "0 0 5px 5px",
                      }}
                    >
                      <Typography
                        component="span"
                        color="common.shade.100"
                        fontWeight={600}
                      >
                        {t("form.addPromo.fields.code.helperText")}
                      </Typography>
                      <Typography
                        component="span"
                        color="common.purple.500"
                        fontWeight={600}
                      >
                        NAMATOKOKU
                      </Typography>
                    </Box>
                    {/* <Typography
                        component="span"
                        color="common.red.500"
                        fontSize={12}
                        fontWeight={600}
                      >
                        {t("form.addPromo.fields.code.errorText")}
                      </Typography> */}
                  </>
                }
                fullWidth
                inputProps={{
                  maxLength: 5,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">0/5</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid sm={4}>
              <TextField
                label={t("form.addPromo.fields.qty.label")}
                helperText={t("form.addPromo.fields.qty.helperText")}
                defaultValue={10}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid sm={4}>
              <TextField
                label={t("form.addPromo.fields.userLimit.label")}
                helperText={t("form.addPromo.fields.userLimit.helperText")}
                defaultValue={1}
                type="number"
                fullWidth
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
                onChange={(e) =>
                  setDiscountType(e.target.value as "price" | "percentage")
                }
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
                  <TextField
                    label={t("form.addPromo.fields.discountNominal.label")}
                    placeholder={t(
                      "form.addPromo.fields.discountNominal.placeholder"
                    )}
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    label={t(
                      "form.addPromo.fields.discountMinimumTransaction.label"
                    )}
                    placeholder={t(
                      "form.addPromo.fields.discountMinimumTransaction.placeholder"
                    )}
                    helperText={t(
                      "form.addPromo.fields.discountMinimumTransaction.helperText"
                    )}
                    type="number"
                    fullWidth
                  />
                </Grid>
              </>
            )}

            {discountType === "percentage" && (
              <>
                <Grid xs={4}>
                  <TextField
                    label={t("form.addPromo.fields.discountNominal.label")}
                    placeholder={t(
                      "form.addPromo.fields.discountNominal.placeholder"
                    )}
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    label={t(
                      "form.addPromo.fields.discountMinimumTransaction.label"
                    )}
                    placeholder={t(
                      "form.addPromo.fields.discountMinimumTransaction.placeholder"
                    )}
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    label={t(
                      "form.addPromo.fields.discountMaximumTransaction.label"
                    )}
                    placeholder={t(
                      "form.addPromo.fields.discountMaximumTransaction.placeholder"
                    )}
                    type="number"
                    fullWidth
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
            <Grid xs={4}>
              <TextField
                label={t("form.addPromo.fields.category.label", { value: 1 })}
                select
                fullWidth
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={8}>
              <TextField
                label={t("form.addPromo.fields.brand.label")}
                placeholder={t("form.addPromo.fields.brand.placeholder")}
                select
                fullWidth
                value={[]}
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <VGChip key={value} label={value} onDelete={() => {
                          console.log("delete")
                        }} />
                      ))}
                    </Box>
                  ),
                }}
              >
                <MenuItem value={"ten"}>Ten</MenuItem>
                <MenuItem value={"two"}>Twenty</MenuItem>
                <MenuItem value={"three"}>Thirty</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={12}>
              <VGButton>{t("form.addPromo.fields.addCategory.title")}</VGButton>
            </Grid>
          </Grid>
        </DialogContent>
        {managePromoForm.type === "disabled" && (
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
              onClick={() => setManagePromoForm({ isOpen: false })}
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
              onClick={() => setManagePromoForm({ isOpen: false })}
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
