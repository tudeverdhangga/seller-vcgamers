import { useTranslation } from "next-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ProfilePicture from "../atomic/ProfilePicture";
import RedTypography from "../atomic/RedTypography";

export default function ProfileCard(props: { name: string }) {
  const { t } = useTranslation("layout");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{ display: "flex", gap: 0.5, mb: "20px" }}>
        <ProfilePicture />
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "common.purple.500" }}>
            {props.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: "common.shade.100" }}>
              {t("profileCard.todaySchedule")}
            </Typography>
            <RedTypography
              sx={{
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {t("profileCard.close")}
            </RedTypography>
          </Box>
        </Box>
      </Box>
      <Button variant="contained" sx={{ mb: "10px", textTransform: "none" }}>
        {t("profileCard.visitShop")}
      </Button>
      <Button variant="outlined" sx={{ textTransform: "none" }}>
        {t("profileCard.visitMarketplace")}
      </Button>
    </Box>
  );
}
