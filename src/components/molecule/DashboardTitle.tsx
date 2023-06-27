import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { useTranslation } from "next-i18next";

export default function DashboardTitle() {
  const { t } = useTranslation("dashboard");

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
        value="DEC-2021"
        sx={{ width: { sm: "183px", xs: "150px" } }}
      >
        <MenuItem value="DEC-2021">DEC-2021</MenuItem>
      </Select>
    </Box>
  );
}
