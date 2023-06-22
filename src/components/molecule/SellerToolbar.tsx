import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import LogoIcon from "../icons/svg/logo.svg";

export default function SellerToolbar() {
  const { t } = useTranslation("layout");

  return (
    <Toolbar disableGutters>
      <Box sx={{ display: "flex", justifyContent: "start", mx: 2 }}>
        <LogoIcon />
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: "600",
            textTransform: "uppercase",
            color: "common.shade.200",
          }}
        >
          {t("drawer.toolbar.seller")}
        </Typography>
      </Box>
    </Toolbar>
  );
}
