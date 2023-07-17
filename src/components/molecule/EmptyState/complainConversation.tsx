import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import EmptyStateIcon from "~/components/icons/EmptyStateIcon/complainConversation";

export default function EmptyState() {
  const { t } = useTranslation("complain");

  return (
    <div
      style={{
        display: "flex",
        padding: "40px 0px",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        alignSelf: "stretch",
      }}
    >
      <EmptyStateIcon />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 14, fontWeight: 700, color: "common.shade.200" }}
        >
          {t("emptyState.complainConversation.title")}
        </Typography>
        <Typography
          sx={{ fontSize: 12, fontWeight: 600, color: "common.shade.100" }}
        >
          {t("emptyState.complainConversation.subtitle")}
        </Typography>
      </Box>
    </div>
  );
}
