import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useTranslation } from "next-i18next";

import VGPageTitle from "../atomic/VGPageTitle";

export default function NotificationTitle() {
  const { t } = useTranslation("notification");

  return (
    <Box
      sx={{
        display: "flex",
        mb: "20px",
        alignSelf: "stretch",
      }}
    >
      <VGPageTitle
        title={t("title")}
        subTitle={t("subtitle")}
        sx={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
          flex: "1 0 0",
        }}
      />
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
