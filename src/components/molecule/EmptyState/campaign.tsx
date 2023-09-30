import { useTranslation } from "next-i18next";

import Typography from "@mui/material/Typography";

import EmptyStateIcon from "~/components/icons/EmptyStateIcon/campaign";
import Box from "@mui/material/Box";

export default function EmptyState() {
  const { t } = useTranslation("joinCampaign");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "40px 0px",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <EmptyStateIcon />
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: "common.shade.200",
                textAlign: "center",
              }}
            >
              {t("emptyState.campaign")}
            </Typography>
          </div>
        </div>
      </Box>
    </Box>
  );
}
