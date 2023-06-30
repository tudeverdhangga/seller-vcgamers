import { useTranslation } from "next-i18next";

import Typography from "@mui/material/Typography";

import NotificationEmptyStateIcon from "../icons/NotificationEmptyStateIcon";

export default function NotificationEmptyState() {
  const { t } = useTranslation("notification");

  return (
    <div
      style={{
        display: "flex",
        padding: "40px 0px",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        alignSelf: "stretch",
      }}
    >
      <NotificationEmptyStateIcon />
      <Typography
        sx={{ fontSize: 14, fontWeight: 600, color: "common.shade.200" }}
      >
        {t("emptyState")}
      </Typography>
    </div>
  );
}
