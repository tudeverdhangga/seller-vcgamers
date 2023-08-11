import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { useTranslation } from "next-i18next";
import { useQueryState } from "next-usequerystate";

export default function DashboardTitle() {
  const { t } = useTranslation("dashboard");
  const [periodFilter, setPeriodFilter] = useQueryState("periode_filter");

  const handlePeriodChange = (event: SelectChangeEvent) => {
    void setPeriodFilter(event.target.value);
  };

  const currentDate = dayjs();
  const periods = [0, 1, 2, 3, 4, 5].map((i) =>
    currentDate.subtract(i, "month")
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
      <Select
        id="month-select"
        value={periodFilter ?? currentDate.format("YYYY-MM")}
        onChange={handlePeriodChange}
        sx={{
          width: { sm: "183px", xs: "150px" },
          borderRadius: "11px",
          backgroundColor: "common.shade.0",
        }}
      >
        {periods.map((period) => {
          const month = period.format("YYYY-MM");

          return (
            <MenuItem key={month} value={month}>
              {period.format("MMM-YYYY").toUpperCase()}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
