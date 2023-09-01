import Box from "@mui/material/Box";
import { useChatSendMessage } from "~/services/chat/hooks";
import ChatMessageAttachment from "../molecule/ChatMessageAttachment";
import ChatMessageSuggestion from "../molecule/ChatMessageSuggestion";
import ChatMessageInput from "../molecule/ChatMessageInput";

export default function ChatRoomInput({ chatId }: { chatId: string }) {
  const mutation = useChatSendMessage();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "common.shade.50",
        p: 2,
        gap: 1,
      }}
    >
      <ChatMessageAttachment />
      <ChatMessageSuggestion />
      <ChatMessageInput
        roomId={chatId}
        type="chat"
        onSubmit={(data) => {
          // mutation.reset();
          mutation.mutate({
            type: "TEXT",
            room_id: chatId,
            message: data.message,
            attachment: data.attachment,
          });
          console.log(data);
        }}
      />
    </Box>
  );
}
