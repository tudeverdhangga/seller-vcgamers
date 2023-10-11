import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function ChatMessageInfoBanner() {
  const { t } = useTranslation("chat");

  return (
    <Grid
      container
      sx={{
        backgroundColor: "common.shade.50",
        p: "10px 15px",
        justifyContent: "center",
      }}
      spacing={0.5}
    >
      <Grid xs={12} sm={6}>
        <Typography
          sx={{
            fontSize: 12,
            color: "common.shade.200",
            fontWeight: 500,
            textAlign: { xs: "center", sm: "end" },
          }}
        >
          {t("infoBanner.body")}
        </Typography>
      </Grid>
      <Grid xs={12} sm={6}>
        <Link
          href="https://www.vcgamers.com/news/hati-hati-penipuan/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "primary.main",
              textAlign: { xs: "center", sm: "start" },
            }}
          >
            {t("infoBanner.click")}
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
}
