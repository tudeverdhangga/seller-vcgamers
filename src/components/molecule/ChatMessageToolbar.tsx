import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ChatProfilePicture from "../atomic/ChatProfilePicture";
import Typography from "@mui/material/Typography";
import { useGetChatMessage, useGetChatRoom } from "~/services/chat/hooks";
import { useChatOnlineIndicator } from "~/utils/firebase";
import StatusIndicator from "../atomic/StatusIndicator";

export default function ChatMessageToolbar(props: { chatId: string }) {
  const { senderId } = useGetChatMessage(props.chatId);
  const { data } = useGetChatRoom();
  const chatDetail = data?.pages
    .flatMap((page) => page.data)
    .find((r) => r.id === props.chatId);
  const { online } = useChatOnlineIndicator(senderId);

  return (
    <Toolbar disableGutters sx={{ px: 2, backgroundColor: "common.white" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <ChatProfilePicture src={chatDetail?.icon} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <Typography
            sx={{ color: "primary.main", fontWeight: 700, fontSize: "16px" }}
          >
            {chatDetail?.name}
          </Typography>
          <StatusIndicator
            status={
              (online.status as "offline" | "online" | undefined) ?? "offline"
            }
            time={online.time}
          />
        </Box>
      </Box>
    </Toolbar>
  );
}
