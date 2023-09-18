import {
  useGetModerationDetail,
  usePostModerationSendMessage,
} from "~/services/moderation/hooks";
import ComplainCompleteInfoBanner from "../molecule/ComplainCompleteInfoBanner";
import Box from "@mui/material/Box";
import ChatMessageAttachment from "../molecule/ChatMessageAttachment";
import ChatMessageInput from "../molecule/ChatMessageInput";

export default function ComplainRoomInput({
  complainId,
}: {
  complainId: string;
}) {
  const { data } = useGetModerationDetail(complainId);
  const mutation = usePostModerationSendMessage();

  const completed = data?.data.status !== "ON_GOING";

  return completed ? (
    <ComplainCompleteInfoBanner />
  ) : (
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
      <ChatMessageInput
        roomId={complainId}
        type="moderation"
        onSubmit={(data) => {
          // mutation.reset();
          mutation.mutate({
            id: complainId,
            message: data.message,
            attachment: data.attachment,
          });
          console.log(data);
        }}
      />
    </Box>
  );
}
