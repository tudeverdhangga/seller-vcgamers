import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { messageAttachmentAtom } from "~/atom/chat";

import ChatMessageListItem from "~/components/atomic/ChatMessageListItem";
import ChatMessageListSubheader from "~/components/atomic/ChatMessageListSubheader";
import ChatMessageInfoBanner from "~/components/molecule/ChatMessageInfoBanner";
import ChatMessageToolbar from "~/components/molecule/ChatMessageToolbar";
import ChatRoomEmptyState from "~/components/molecule/EmptyState/chatRoom";
import { useGetChatMessage, useGetChatRoomDetail } from "~/services/chat/hooks";
import ChatRoomInput from "../ChatRoomInput";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ChatRoomContent() {
  const router = useRouter();

  const chatIds = router.query.chatId as string[] | undefined;

  if (typeof chatIds === "undefined") return <ChatRoomEmptyState />;

  const chatId = chatIds[0] as string;

  return (
    <Box style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <ChatMessageToolbar chatId={chatId} />
      <Divider />
      <ChatMessageInfoBanner />
      <ChatRoomChatList chatId={chatId} />
      <ChatRoomInput chatId={chatId} />
    </Box>
  );
}

function ChatRoomChatList({ chatId }: { chatId: string }) {
  const { data: chatRoom } = useGetChatRoomDetail(chatId);
  const { data, fetchNextPage, hasNextPage } = useGetChatMessage(
    chatId,
    chatRoom?.data?.buyer?.id
  );
  const [attachment] = useAtom(messageAttachmentAtom);

  return (
    <Box
      id="scrollableDiv"
      sx={{
        backgroundImage: `url("/assets/chat-bg.png")`,
        px: 2,
        overflow: "auto",
        height: attachment.show ? "45vh" : "53vh",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={data?.size ?? 0}
        next={fetchNextPage}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true}
        hasMore={hasNextPage ?? false}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {[...data].map(([key, value]) => (
          <>
            {value.map((chat) => {
              if (typeof chat === "undefined") return null;
              return <ChatMessageListItem key={chat.id} {...chat} />;
            })}
            <ChatMessageListSubheader content={`${key}`} />
          </>
        ))}
      </InfiniteScroll>
    </Box>
  );
}
