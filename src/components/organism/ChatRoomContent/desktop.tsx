import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { messageAttachmentShowAtom } from "~/atom/chat";

import ChatMessageInput from "~/components/atomic/ChatMessageInput";
import ChatMessageListItem from "~/components/atomic/ChatMessageListItem";
import ChatMessageListSubheader from "~/components/atomic/ChatMessageListSubheader";
import ChatMessageAttachment from "~/components/molecule/ChatMessageAttachment";
import ChatMessageInfoBanner from "~/components/molecule/ChatMessageInfoBanner";
import ChatMessageSuggestion from "~/components/molecule/ChatMessageSuggestion";
import ChatMessageToolbar from "~/components/molecule/ChatMessageToolbar";
import ChatRoomEmptyState from "~/components/molecule/EmptyState/chatRoom";

export default function ChatRoomContent() {
  const [show] = useAtom(messageAttachmentShowAtom);
  const router = useRouter();

  const chatId = router.query.chatId as string[] | undefined;

  if (typeof chatId === "undefined") return <ChatRoomEmptyState />;

  return (
    <Box style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <ChatMessageToolbar />
      <Divider />
      <ChatMessageInfoBanner />
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
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ChatMessageListSubheader
                content={`${sectionId + 1} December 2021`}
              />
              <ChatMessageListItem
                type="product"
                content={{
                  img: "/assets/chat-product-img.png",
                  title: "Asphalt 6 Legend Coins",
                  price: "Rp 85.000",
                  rating: "4.8",
                  sold: "234",
                }}
                side="left"
              />
              <ChatMessageListItem
                type="text"
                content="Bisa dikirim sekarang juga?"
                time="15:32"
                side="left"
              />
              <ChatMessageListItem
                type="text"
                content="Bisa dikirim sekarang juga?"
                time="15:32"
                side="left"
              />
              <ChatMessageListItem
                type="text"
                content="ready kak silakan diorder"
                time="15:32"
                side="right"
                status="sent"
              />
              <ChatMessageListItem
                type="text"
                content="kami ready kirim setiap hari. Fast Respon di 10:00-22:00. kalau
              ada orderan diiluar jam 22:00 akan diproses di hari berikutnya"
                time="15:32"
                side="right"
                status="sending"
              />
              <ChatMessageListItem
                type="attachment"
                content="/assets/default-chat-attachment.png"
                time="15:32"
                side="right"
                status="sent"
              />
            </ul>
          </li>
        ))}
      </List>
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
        <ChatMessageInput />
      </Box>
    </Box>
  );
}
