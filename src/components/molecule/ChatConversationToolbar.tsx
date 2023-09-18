import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useGetNotificationCount } from "~/services/moderation/hooks";

import { parenthesesNumber } from "~/utils/format";

export default function ChatConversationToolbar() {
  const { t } = useTranslation("chat");
  const { data } = useGetNotificationCount();

  const count =
    data?.data.find((d) => d.key === "SELLER_CHAT_UNREAD")?.value ?? 0;

  return (
    <Toolbar>
      <Typography
        sx={{ color: "primary.main", fontWeight: 700, fontSize: "16px" }}
      >
        {`${t("message")} ${parenthesesNumber(count)}`}
      </Typography>
    </Toolbar>
  );
}
