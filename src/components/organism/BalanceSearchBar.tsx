import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTranslation } from "next-i18next";

import VGCard from "~/components/atomic/VGCard";
import { useResponsive } from "~/utils/mediaQuery";

export default function BalanceSearchBar() {
  const { t } = useTranslation("balance");
  const { isMobile } = useResponsive();

  return (
    <VGCard
      sx={{
        display: "flex",
        flexDirection: { sm: "row", xs: "column" },
        alignItems: { sm: "center", xs: "start" },
        gap: 2,
      }}
    >
      <Typography
        color="primary.main"
        fontSize={16}
        fontWeight={700}
        sx={{ flexGrow: 1 }}
      >
        {t("card.history.title")}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={t("form.history.fields.range.start.label")}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: isMobile,
            },
          }}
        />
        <DatePicker
          label={t("form.history.fields.range.end.label")}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: isMobile,
            },
          }}
        />
      </LocalizationProvider>
    </VGCard>
  );
}
