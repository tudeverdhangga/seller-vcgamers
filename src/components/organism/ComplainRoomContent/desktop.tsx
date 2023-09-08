import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { messageAttachmentShowAtom } from "~/atom/chat";

import ChatMessageListItem from "~/components/atomic/ChatMessageListItem";
import ChatMessageListSubheader from "~/components/atomic/ChatMessageListSubheader";
import ComplainMessageInfoBanner from "~/components/molecule/ComplainMessageInfoBanner";
import EmptyState from "~/components/molecule/EmptyState/complainRoom";
import ComplainInfoSidebar, {
  DRAWER_WIDTH,
} from "~/components/molecule/ComplainInfoSidebar";
import {
  useGetModerationDetail,
  useGetModerationMessage,
} from "~/services/moderation/hooks";
import { useEffect, useRef } from "react";
import ComplainRoomInput from "../ComplainRoomInput";
import ComplainMessageToolbar from "~/components/molecule/ComplainMessageToolbar";

export default function ComplainRoomContent() {
  const router = useRouter();

  const complainIds = router.query.chatId as string[] | undefined;

  if (typeof complainIds === "undefined") return <EmptyState />;

  const complainId = complainIds[0] as string;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <ComplainMessageToolbar complainId={complainId} />
      <ComplainMessageInfoBanner complainId={complainId} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: `calc(50% - ${DRAWER_WIDTH}px)`,
          }}
        >
          <ComplainRoomChatList complainId={complainId} />
          <ComplainRoomInput complainId={complainId} />
        </Box>
        <ComplainInfoSidebar complainId={complainId} />
      </Box>
    </Box>
  );
}

function ComplainRoomChatList({ complainId }: { complainId: string }) {
  const { data } = useGetModerationDetail(complainId);
  const { data: moderationList } = useGetModerationMessage(complainId);
  const [show] = useAtom(messageAttachmentShowAtom);
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
        height: completed ? "60vh" : show ? "48vh" : "57vh",
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
