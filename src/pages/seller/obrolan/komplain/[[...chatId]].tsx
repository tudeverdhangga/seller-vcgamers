import { useRouter } from "next/router";
import ComplainTitle from "~/components/molecule/ComplainTitle";
import DesktopComplainContent from "~/components/organism/ComplainContent/desktop";
import MobileComplainContent from "~/components/organism/ComplainContent/mobile";
import MobileComplainRoomContent from "~/components/organism/ComplainRoomContent/mobile";
import { useResponsive } from "~/utils/mediaQuery";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function KomplainPage() {
  const { isMobile } = useResponsive();
  const router = useRouter();

  const chatId = router.query.chatId as string[] | undefined;

  if (isMobile) {
    if (chatId) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MobileComplainRoomContent />
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MobileComplainContent />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "85vh" }}>
      <ComplainTitle />
      <DesktopComplainContent />
    </div>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace([
  "complain",
  "chat",
]);
