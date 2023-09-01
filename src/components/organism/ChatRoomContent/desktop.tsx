import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { messageAttachmentShowAtom } from "~/atom/chat";

import ChatMessageListItem from "~/components/atomic/ChatMessageListItem";
import ChatMessageListSubheader from "~/components/atomic/ChatMessageListSubheader";
import ChatMessageInfoBanner from "~/components/molecule/ChatMessageInfoBanner";
import ChatMessageToolbar from "~/components/molecule/ChatMessageToolbar";
import ChatRoomEmptyState from "~/components/molecule/EmptyState/chatRoom";
import { useGetChatMessage } from "~/services/chat/hooks";
import ChatRoomInput from "../ChatRoomInput";

export default function ChatRoomContent() {
  const router = useRouter();

  const chatIds = router.query.chatId as string[] | undefined;

  if (typeof chatIds === "undefined") return <ChatRoomEmptyState />;

  const chatId = chatIds[0] as string;

  return (
    <Box style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <ChatMessageToolbar />
      <Divider />
      <ChatMessageInfoBanner />
      <ChatRoomChatList chatId={chatId} />
      <ChatRoomInput chatId={chatId} />
    </Box>
  );
}

function ChatRoomChatList({ chatId }: { chatId: string }) {
  const { data } = useGetChatMessage(chatId);
  const [show] = useAtom(messageAttachmentShowAtom);

  const scrollRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  return (
    <List
      sx={{
        backgroundImage: `url("/assets/chat-bg.png")`,
        px: 2,
        position: "relative",
        overflow: "auto",
        maxHeight: show ? "45vh" : "53vh",
        "& ul": { padding: 0 },
        "&li": { p: 1 },
      }}
      subheader={<li />}
    >
      {[...data].map(([key, value], index) => (
        <li key={key} {...(index === data.size - 1 && { ref: scrollRef })}>
          <ul>
            <ChatMessageListSubheader content={`${key}`} />
            {value.map((chat) =>
              chat.type === "TEXT" ? (
                <ChatMessageListItem key={chat.type} {...chat} />
              ) : (
                <></>
              )
            )}
          </ul>
        </li>
      ))}
    </List>
  );
}
