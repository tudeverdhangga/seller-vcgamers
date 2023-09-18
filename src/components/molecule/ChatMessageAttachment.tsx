/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "../icons/chat/CloseIcon";
import { useAtom } from "jotai";
import { messageAttachmentAtom } from "~/atom/chat";

export default function ChatMessageAttachment() {
  const [attachment, setAttachment] = useAtom(messageAttachmentAtom);

  const hideAttachment = () => setAttachment({ show: false });

  return (
    attachment.show && (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          backgroundColor: "background.paper",
          p: "10px",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            borderRadius: "5px",
            flexGrow: 1,
            alignSelf: "center",
          }}
        >
          <img
            src={attachment.url}
            alt="attachment"
            height={60}
            style={{ objectFit: "contain" }}
          />
        </Box>
        <IconButton sx={{ alignSelf: "flex-start" }} onClick={hideAttachment}>
          <CloseIcon />
        </IconButton>
      </Box>
    )
  );
}
