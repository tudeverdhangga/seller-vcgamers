import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

import { useGetChatRoom } from "~/services/chat/hooks";
import { parenthesesNumber } from "~/utils/format";

export default function ChatConversationToolbar() {
  const { t } = useTranslation("chat");
  const { data } = useGetChatRoom();

  const unread = useMemo(
    () =>
      data?.pages
        .flatMap((page) => page.data)
        .reduce((acc, data) => acc + data.unread_count, 0) ?? 0,
    [data]
  );

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
