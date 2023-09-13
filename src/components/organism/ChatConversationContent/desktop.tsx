import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

import ChatConversationListItem from "~/components/atomic/ChatConversationListItem";
import ChatConversationEmptyState from "~/components/molecule/EmptyState/chatConversation";
import { useGetChatRoom } from "~/services/chat/hooks";
import { type DataChatRoom } from "~/services/chat/types";

export default function ChatConversationContent() {
  const { data, hasNextPage, fetchNextPage } = useGetChatRoom();

  const chatRooms = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data] as DataChatRoom[];
  }, [] as DataChatRoom[]);

  if (!chatRooms || chatRooms.length === 0) {
    return <ChatConversationEmptyState />;
  }

  return (
    <List id="scrollableDiv" disablePadding>
      <InfiniteScroll
        dataLength={chatRooms ? chatRooms.length : 0}
        hasMore={hasNextPage ?? false}
        next={fetchNextPage}
        loader={<Skeleton variant="rounded" height={50} width="100%" />}
        scrollableTarget="scrollableDiv"
      >
        {chatRooms &&
          chatRooms.map((chat) => (
            <ChatConversationListItem key={chat.id} chat={chat} />
          ))}
      </InfiniteScroll>
    </List>
  );
}
