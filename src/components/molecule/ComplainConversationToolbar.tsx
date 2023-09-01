import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

import { useGetModerationList } from "~/services/moderation/hooks";
import { parenthesesNumber } from "~/utils/format";

export default function ComplainConversationToolbar() {
  const { t } = useTranslation("complain");
  const { data: inProcessData } = useGetModerationList("1");
  const { data: completeData } = useGetModerationList("2");

  const unread = useMemo(
    () =>
      (inProcessData?.pages
        .flatMap((page) => page.data)
        .reduce((acc, data) => acc + (data.is_read ? 0 : 1), 0) ?? 0) +
      (completeData?.pages
        .flatMap((page) => page.data)
        .reduce((acc, data) => acc + (data.is_read ? 0 : 1), 0) ?? 0),
    [inProcessData, completeData]
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
