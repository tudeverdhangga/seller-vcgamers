import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { complainListAtom } from "~/atom/complain";
import { parenthesesNumber } from "~/utils/format";

export default function ComplainConversationToolbar() {
  const { t } = useTranslation("complain");
  const [complainList] = useAtom(complainListAtom);

  const unread =
    complainList?.reduce((prev, curr) => prev + (curr?.unread ? 1 : 0), 0) ?? 0;

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
