import { useEffect } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { mobileAppBarAtom } from "~/atom/layout";
import ChatConversationToolbar from "~/components/molecule/ChatConversationToolbar";
import ChatConversationContent from "../ChatConversationContent/mobile";

export default function ChatContent() {
  const { t } = useTranslation("chat");
  const [, setMobileAppBarAtom] = useAtom(mobileAppBarAtom);

  useEffect(() => {
    setMobileAppBarAtom({
      showPrev: false,
      content: t("title"),
      showMenu: true,
    });
  }, [setMobileAppBarAtom, t]);

  return (
    <>
      <Box
        sx={{
          mt: "20px",
          borderRadius: "10px",
          backgroundColor: "background.paper",
          flexGrow: 1,
        }}
      >
        <ChatConversationToolbar />
        <Divider />
        <ChatConversationContent />
      </Box>
    </>
  );
}
