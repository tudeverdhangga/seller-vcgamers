import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useQueryState } from "next-usequerystate";

import VGCard from "~/components/atomic/VGCard";
import { useResponsive } from "~/utils/mediaQuery";

export default function BalanceSearchBar() {
  const { t } = useTranslation("balance");
  const { isMobile } = useResponsive();
  const [dateStart, setDateStart] = useQueryState("date_start", {
    parse: (query: string) => dayjs(query),
    serialize: (value) => value.format("YYYY-MM-DD"),
    defaultValue: dayjs().subtract(3, "month"),
  });
  const [dateEnd, setDateEnd] = useQueryState("date_end", {
    parse: (query: string) => dayjs(query),
    serialize: (value) => value.format("YYYY-MM-DD"),
    defaultValue: dayjs(),
  });

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
            openPickerButton: {
              "aria-label": "",
            },
          }}
          value={dayjs(dateStart)}
          onChange={(value) =>
            setDateStart(value ?? dayjs().subtract(3, "month"))
          }
        />
        <DatePicker
          label={t("form.history.fields.range.end.label")}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: isMobile,
            },
            openPickerButton: {
              "aria-label": "",
            },
          }}
          value={dayjs(dateEnd)}
          onChange={(value) => setDateEnd(value ?? dayjs())}
        />
      </LocalizationProvider>
    </VGCard>
  );
}
