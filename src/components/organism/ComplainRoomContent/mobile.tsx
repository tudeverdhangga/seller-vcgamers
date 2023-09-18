import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useAtom } from "jotai";
import MuiDrawer from "@mui/material/Drawer";
import { useRouter } from "next/router";

import { messageAttachmentAtom } from "~/atom/chat";
import { mobileAppBarAtom } from "~/atom/layout";

import ChatMessageListItem from "~/components/atomic/ChatMessageListItem";
import ChatMessageListSubheader from "~/components/atomic/ChatMessageListSubheader";
import ComplainMessageInfoBanner from "~/components/molecule/ComplainMessageInfoBanner";
import { mobileInfoSidebarAtom } from "~/atom/complain";
import ComplainInfoSidebar, {
  DRAWER_WIDTH,
} from "~/components/molecule/ComplainInfoSidebar";
import ComplainRoomInput from "../ComplainRoomInput";
import {
  useGetModerationDetail,
  useGetModerationMessage,
} from "~/services/moderation/hooks";
import EmptyState from "~/components/molecule/EmptyState/complainRoom";

export default function ComplainRoomContent() {
  const router = useRouter();

  const complainIds = router.query.chatId as string[] | undefined;

  if (typeof complainIds === "undefined") return <EmptyState />;

  const complainId = complainIds[0] as string;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        m: -3,
      }}
    >
      <ComplainMessageInfoBanner complainId={complainId} />
      <ComplainRoomChatList complainId={complainId} />
      <ComplainRoomInput complainId={complainId} />
      <ComplainRoomSidebarDrawer complainId={complainId} />
    </Box>
  );
}

function ComplainRoomSidebarDrawer({ complainId }: { complainId: string }) {
  const [, setMobileAppBar] = useAtom(mobileAppBarAtom);
  const [mobileInfoSidebar, setMobileInfoSidebar] = useAtom(
    mobileInfoSidebarAtom
  );
  const { data } = useGetModerationDetail(complainId);

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  useEffect(() => {
    setMobileAppBar({
      showPrev: true,
      content: `Komplain #${data?.data.name ?? ""}`,
      showMenu: true,
      menuIcon: "dots",
      onClick: () => setMobileInfoSidebar(true),
    });
  }, [setMobileAppBar, setMobileInfoSidebar, data?.data.name]);

  return (
    <MuiDrawer
      container={container}
      anchor="right"
      variant="temporary"
      open={mobileInfoSidebar}
      onClose={() => setMobileInfoSidebar(false)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
        },
      }}
    >
      <ComplainInfoSidebar complainId={complainId} />
    </MuiDrawer>
  );
}

function ComplainRoomChatList({ complainId }: { complainId: string }) {
  const { data } = useGetModerationDetail(complainId);
  const { data: moderationList } = useGetModerationMessage(complainId);
  const [show] = useAtom(messageAttachmentAtom);
  const scrollRef = useRef<HTMLLIElement | null>(null);

  const completed = data?.data.status !== "ON_GOING";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [moderationList]);

  return (
    <List
      sx={{
        backgroundImage: `url("/assets/chat-bg.png")`,
        px: 2,
        position: "relative",
        overflow: "auto",
        height: completed
          ? "calc(100vh - 200px)"
          : show
          ? "calc(100vh - 280px)"
          : "calc(100vh - 190px)",
        "& ul": { padding: 0 },
        "&li": { p: 1 },
      }}
      subheader={<li />}
    >
      {[...moderationList].map(([key, value], index) => (
        <li
          key={key}
          {...(index === moderationList.size - 1 && { ref: scrollRef })}
        >
          <ul>
            <ChatMessageListSubheader content={`${key}`} />
            {value.map((moderation) => (
              <ChatMessageListItem key={moderation.id} {...moderation} />
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
