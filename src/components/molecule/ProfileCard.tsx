import { useTranslation } from "next-i18next";
import { env } from "~/env.mjs";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import RedTypography from "../atomic/RedTypography";
import GreenTypography from "../atomic/GreenTypography";
import ChatProfilePicture from "../atomic/ChatProfilePicture";
import Link from "next/link";

export default function ProfileCard(props: {
  name: string;
  slug: string;
  profile_src: string;
  is_closed: boolean;
}) {
  const { t } = useTranslation("layout");

  const storeUrl = env.NEXT_PUBLIC_VCG_STORE_URL + props.slug;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{ display: "flex", gap: 0.5, mb: "20px" }}>
        {props.profile_src !== "" && (
          <ChatProfilePicture src={props.profile_src} />
        )}
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "common.purple.500" }}>
            {props.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              sx={{ color: "common.shade.100", fontSize: { xs: 14 } }}
            >
              {t("profileCard.todaySchedule")}
            </Typography>
            {props.is_closed ? (
              <RedTypography
                sx={{
                  fontWeight: "600",
                  fontSize: { sm: 16, xs: 14 },
                }}
              >
                {t("profileCard.close")}
              </RedTypography>
            ) : (
              <GreenTypography
                sx={{
                  fontWeight: "600",
                  fontSize: { sm: 16, xs: 14 },
                }}
              >
                {t("profileCard.open")}
              </GreenTypography>
            )}
          </Box>
        </Box>
      </Box>
      <Link href={storeUrl} passHref target="_blank" rel="noopener noreferrer">
        <Button
          variant="contained"
          sx={{
            mb: "10px",
            textTransform: "none",
            fontSize: { xs: 12 },
            fontWeight: 600,
            width: "100%",
          }}
        >
          {t("profileCard.visitShop")}
        </Button>
      </Link>
      <Link
        href={env.NEXT_PUBLIC_MARKET_URL}
        passHref
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            fontSize: { xs: 12 },
            fontWeight: 600,
            width: "100%",
          }}
        >
          {t("profileCard.visitMarketplace")}
        </Button>
      </Link>
    </Box>
  );
}
