import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

import ChatConversationListItem from "~/components/atomic/ChatConversationListItem";
import ChatConversationEmptyState from "~/components/molecule/EmptyState/chatConversation";
import { useGetChatRoom } from "~/services/chat/hooks";

export default function ChatConversationContent() {
  const { data, hasNextPage, fetchNextPage } = useGetChatRoom();

  if (!!data?.pages.length) return <ChatConversationEmptyState />;

  return (
    <List id="scrollableDiv" disablePadding>
      <InfiniteScroll
        dataLength={data ? data.pages.length : 0}
        hasMore={hasNextPage ?? false}
        next={fetchNextPage}
        loader={<Skeleton variant="rounded" height={50} width="100%" />}
        scrollableTarget="scrollableDiv"
      >
        {data && data.pages.at(0)?.data.length ? (
          data.pages
            .flatMap((page) => page.data)
            .map((chat) => (
              <ChatConversationListItem key={chat.id} chat={chat} />
            ))
        ) : (
          <></>
        )}
      </InfiniteScroll>
    </List>
  );
}
