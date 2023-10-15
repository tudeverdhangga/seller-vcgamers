import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

import { messageAttachmentAtom } from "~/atom/chat";

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
  const { data: moderationDetail } = useGetModerationDetail(complainId);
  const { data, fetchNextPage, hasNextPage } =
    useGetModerationMessage(complainId);
  const [show] = useAtom(messageAttachmentAtom);

  const completed = moderationDetail?.data.status === "COMPLETED";

  return (
    <Box
      id="scrollableDiv"
      sx={{
        backgroundImage: `url("/assets/chat-bg.png")`,
        px: 2,
        overflow: "auto",
        height: completed ? "60vh" : show.show ? "48vh" : "57vh",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={data?.size ?? 0}
        next={fetchNextPage}
        style={{ display: "flex", flexDirection: "column" }}
        hasMore={hasNextPage ?? false}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {[...data].map(([key, value]) => (
          <>
            <ChatMessageListSubheader content={`${key}`} />
            {value.map((moderation) => {
              if (typeof moderation === "undefined") return null;

              return (
                <ChatMessageListItem key={moderation.id} {...moderation} />
              );
            })}
          </>
        ))}
      </InfiniteScroll>
    </Box>
  );
}
