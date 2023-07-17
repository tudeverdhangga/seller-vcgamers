import { useEffect } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useAtom } from "jotai";
import MuiDrawer from "@mui/material/Drawer";
import { useRouter } from "next/router";

import { messageAttachmentShowAtom } from "~/atom/chat";
import { mobileAppBarAtom } from "~/atom/layout";

import ChatMessageListItem from "~/components/atomic/ChatMessageListItem";
import ChatMessageListSubheader from "~/components/atomic/ChatMessageListSubheader";
import ChatMessageAttachment from "~/components/molecule/ChatMessageAttachment";
import ChatMessageInput from "~/components/molecule/ChatMessageInput";
import ComplainMessageInfoBanner from "~/components/molecule/ComplainMessageInfoBanner";
import { mobileInfoSidebarAtom } from "~/atom/complain";
import ComplainInfoSidebar, {
  DRAWER_WIDTH,
} from "~/components/molecule/ComplainInfoSidebar";
import ComplainCompleteInfoBanner from "~/components/molecule/ComplainCompleteInfoBanner";
import ComplainAdminMessageListItem from "~/components/atomic/ComplainAdminMessageListItem";
import { ComplainAdminJoinListSubheader } from "~/components/molecule/ComplainAdminJoinListSubheader";

export default function ComplainRoomContent() {
  const [show] = useAtom(messageAttachmentShowAtom);
  const [, setMobileAppBar] = useAtom(mobileAppBarAtom);
  const [mobileInfoSidebar, setMobileInfoSidebar] = useAtom(
    mobileInfoSidebarAtom
  );

  //TODO(rizanafis): change logic with API integration
  const router = useRouter();
  const chatId = router.query.chatId as string[] | undefined;
  const completed = chatId && chatId[0] === "234";

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  useEffect(() => {
    setMobileAppBar({
      showPrev: true,
      content: "Komplain #BB-1616251316-7",
      showMenu: true,
      menuIcon: "dots",
      onClick: () => setMobileInfoSidebar(true),
    });
  }, [setMobileAppBar, setMobileInfoSidebar]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        m: -3,
      }}
    >
      <ComplainMessageInfoBanner />
      <List
        sx={{
          backgroundImage: `url("/assets/chat-bg.png")`,
          px: 2,
          position: "relative",
          overflow: "auto",
          height: show ? "calc(100vh - 280px)" : "calc(100vh - 190px)",
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
            maxWidth: "100vw",
            p: 2,
            gap: 1,
          }}
        >
          <ChatMessageAttachment />
          <ChatMessageInput />
        </Box>
      )}
      <MuiDrawer
        container={container}
        anchor="right"
        variant="temporary"
        open={mobileInfoSidebar}
        onClose={() => setMobileInfoSidebar(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        <ComplainInfoSidebar />
      </MuiDrawer>
    </Box>
  );
}
