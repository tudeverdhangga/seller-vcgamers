import { useTranslation } from "next-i18next";
import { env } from "~/env.mjs";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import RedTypography from "../atomic/RedTypography";
import GreenTypography from "../atomic/GreenTypography";
import ChatProfilePicture from "../atomic/ChatProfilePicture";

export default function ProfileCard(props: { name: string, slug: string, profile_src: string, is_closed: boolean }) {
  const { t } = useTranslation("layout");

  const handleRedirectMarketplace = () => {
    window.open(env.NEXT_PUBLIC_MARKET_URL, '_blank'); 
  };
  const handleRedirectStore = () => {
    window.open(env.NEXT_PUBLIC_VCG_STORE_URL+props.slug, '_blank'); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{ display: "flex", gap: 0.5, mb: "20px" }}>
        {props.profile_src !== "" && <ChatProfilePicture src={props.profile_src} />}
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "common.purple.500" }}>
            {props.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: "common.shade.100" }}>
              {t("profileCard.todaySchedule")}
            </Typography>
            {props.is_closed ? <RedTypography
              sx={{
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {t("profileCard.close")}
            </RedTypography> : 
            <GreenTypography
              sx={{
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {t("profileCard.open")}
            </GreenTypography>
            }
          </Box>
        </Box>
      </Box>
      <Button onClick={handleRedirectStore} variant="contained" sx={{ mb: "10px", textTransform: "none" }}>
        {t("profileCard.visitShop")}
      </Button>
      <Button onClick={handleRedirectMarketplace} variant="outlined" sx={{ textTransform: "none" }}>
        {t("profileCard.visitMarketplace")}
      </Button>
    </Box>
  );
}
