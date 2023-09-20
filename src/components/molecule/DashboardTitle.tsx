import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";

import { useTranslation } from "next-i18next";
import { queryTypes, useQueryState } from "next-usequerystate";
import { useGetProfile } from "~/services/api/auth";

export default function DashboardTitle() {
  const { t } = useTranslation("dashboard");
  const { data } = useGetProfile();
  const [periodFilter, setPeriodFilter] = useQueryState(
    "periode_filter",
    queryTypes.string.withDefault(dayjs().format("YYYY-MM"))
  );

  return (
    <Box
      sx={{
        display: "flex",
        mb: "20px",
        alignSelf: "stretch",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
          flex: "1 0 0",
        }}
      >
        <Typography
          sx={{
            color: "common.shade.200",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          {t("subtitle")}
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pilih Periode"
          format="MMM-YYYY"
          views={["month", "year"]}
          minDate={dayjs(data?.data.seller_join_date)}
          maxDate={dayjs()}
          value={dayjs(periodFilter)}
          onChange={(e: Dayjs | null) => {
            void setPeriodFilter((e ?? dayjs()).format("YYYY-MM"));
          }}
          sx={{ borderRadius: "11px" }}
          slotProps={{
            textField: {
              sx: {
                ".MuiOutlinedInput-root": { borderRadius: "11px" },
                width: { sm: "183px", xs: "150px" },
                height: "100%",
                borderRadius: "11px",
                backgroundColor: "common.shade.0",
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
