import { useEffect } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { mobileAppBarAtom } from "~/atom/layout";
import ComplainConversationToolbar from "~/components/molecule/ComplainConversationToolbar";
import ComplainConversationContent from "../ComplainConversationContent/mobile";

export default function ComplainContent() {
  const { t } = useTranslation("complain");
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
        <ComplainConversationToolbar />
        <Divider />
        <ComplainConversationContent />
      </Box>
    </>
  );
}
