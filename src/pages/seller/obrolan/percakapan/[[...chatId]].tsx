import { useRouter } from "next/router";
import ChatTitle from "~/components/molecule/ChatTitle";
import DesktopChatContent from "~/components/organism/ChatContent/desktop";
import MobileChatContent from "~/components/organism/ChatContent/mobile";
import MobileChatRoomContent from "~/components/organism/ChatRoomContent/mobile";
import { useResponsive } from "~/utils/mediaQuery";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function PercakapanPage() {
  const { isMobile } = useResponsive();
  const router = useRouter();

  const chatId = router.query.chatId as string[] | undefined;

  if (isMobile) {
    if (chatId) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MobileChatRoomContent />
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MobileChatContent />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "85vh" }}>
      <ChatTitle />
      <DesktopChatContent />
    </div>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace(["chat"]);
