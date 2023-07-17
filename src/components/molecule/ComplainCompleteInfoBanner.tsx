import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

export default function ComplainCompleteInfoBanner() {
  const { t } = useTranslation("complain");

  return (
    <Box
      sx={{
        p: "20px",
        backgroundColor: "common.green.0",
      }}
    >
      <Typography
        sx={{ fontSize: 14, fontWeight: 500, color: "common.green.900" }}
      >
        {t("completeMessage")}
      </Typography>
    </Box>
  );
}
