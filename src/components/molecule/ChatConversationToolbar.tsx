import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { messagesAtom } from "~/atom/chat";
import { parenthesesNumber } from "~/utils/format";

export default function ChatConversationToolbar() {
  const { t } = useTranslation("chat");
  const [messages] = useAtom(messagesAtom);

  const unread =
    messages?.reduce((prev, curr) => prev + (curr?.unread ?? 0), 0) ?? 0;

  return (
    <Toolbar>
      <Typography
        sx={{ color: "primary.main", fontWeight: 700, fontSize: "16px" }}
      >
        {`${t("message")} ${parenthesesNumber(unread)}`}
      </Typography>
    </Toolbar>
  );
}
