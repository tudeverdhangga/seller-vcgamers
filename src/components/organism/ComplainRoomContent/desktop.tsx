import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { messageAttachmentShowAtom } from "~/atom/chat";

import ChatMessageInput from "~/components/molecule/ChatMessageInput";
import ChatMessageListItem from "~/components/atomic/ChatMessageListItem";
import ChatMessageListSubheader from "~/components/atomic/ChatMessageListSubheader";
import ChatMessageAttachment from "~/components/molecule/ChatMessageAttachment";
import ComplainMessageInfoBanner from "~/components/molecule/ComplainMessageInfoBanner";
import ChatMessageToolbar from "~/components/molecule/ChatMessageToolbar";
import EmptyState from "~/components/molecule/EmptyState/complainRoom";
import ComplainAdminMessageListItem from "~/components/atomic/ComplainAdminMessageListItem";
import ComplainInfoSidebar, {
  DRAWER_WIDTH,
} from "~/components/molecule/ComplainInfoSidebar";
import { ComplainAdminJoinListSubheader } from "~/components/molecule/ComplainAdminJoinListSubheader";
import ComplainCompleteInfoBanner from "~/components/molecule/ComplainCompleteInfoBanner";

export default function ComplainRoomContent() {
  const [show] = useAtom(messageAttachmentShowAtom);
  const router = useRouter();

  const chatId = router.query.chatId as string[] | undefined;

  if (typeof chatId === "undefined") return <EmptyState />;

  //TODO(rizanafis): change logic with API integration
  const completed = chatId[0] === "234";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <ChatMessageToolbar />
      <ComplainMessageInfoBanner />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: `calc(50% - ${DRAWER_WIDTH}px)`,
          }}
        >
          <List
            sx={{
              backgroundImage: `url("/assets/chat-bg.png")`,
              px: 2,
              position: "relative",
              overflow: "auto",
              height: completed ? "60vh" : show ? "48vh" : "57vh",
              "& ul": { padding: 0 },
              "&li": { p: 1 },
            }}
            subheader={<li />}
          >
            <li key={`section-6`}>
              <ul>
                <ChatMessageListSubheader content="6 December 2021" />
                <ChatMessageListItem
                  type="text"
                  content="Coin tidak masuk ke akun saya dan saya sudah memasukan keterangan akun pada saat checkout. Mohon Balasannya."
                  time="15:31"
                  side="left"
                />
                <ChatMessageListItem
                  type="text"
                  content="Nampaknya ada kesalahan kak, aku undang admin VCG ya kak. Karena aku sudah kirim sesuai pesanan"
                  time="15:32"
                  side="right"
                  status="sent"
                />
                <ChatMessageListItem
                  type="text"
                  content="Baik kak, saya tunggu"
                  time="15:31"
                  side="left"
                />
                <ComplainAdminJoinListSubheader />
                <ComplainAdminMessageListItem
                  content="Hai, Terima kasih ya atas ketersediannya untuk menunggu. Kami telah meninjau masalah dan bukti dari kedua belah pihak. Kami telah mengambil keputusan bahwa dana akan tetap diteruskan kepada seller dikarenakan seller sudah mengirimkan kode yang benar pada anda. Terima kasih :)"
                  time="15:34"
                />
              </ul>
            </li>
          </List>
          {completed ? (
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
              <ChatMessageInput />
            </Box>
          )}
        </Box>
        <ComplainInfoSidebar />
      </Box>
    </Box>
  );
}
