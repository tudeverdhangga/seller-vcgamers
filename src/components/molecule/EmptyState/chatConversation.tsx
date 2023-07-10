import { useTranslation } from "next-i18next";

import Typography from "@mui/material/Typography";

import EmptyStateIcon from "~/components/icons/EmptyStateIcon/chatConversation";

export default function EmptyState() {
  const { t } = useTranslation("chat");

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
      <Typography
        sx={{ fontSize: 14, fontWeight: 700, color: "common.shade.200" }}
      >
        {t("emptyState.chatConversation")}
      </Typography>
    </div>
  );
}
