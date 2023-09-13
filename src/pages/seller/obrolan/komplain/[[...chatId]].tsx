import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import VGHead from "~/components/atomic/VGHead";
import ComplainTitle from "~/components/molecule/ComplainTitle";
import DesktopComplainContent from "~/components/organism/ComplainContent/desktop";
import MobileComplainContent from "~/components/organism/ComplainContent/mobile";
import MobileComplainRoomContent from "~/components/organism/ComplainRoomContent/mobile";
import { useResponsive } from "~/utils/mediaQuery";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function KomplainPage() {
  const { t } = useTranslation("complain");
  const { isMobile } = useResponsive();
  const router = useRouter();

  const chatId = router.query.chatId as string[] | undefined;

  if (isMobile) {
    if (chatId) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <VGHead>{t("head")}</VGHead>
          <MobileComplainRoomContent />
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <VGHead>{t("head")}</VGHead>
        <MobileComplainContent />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "85vh" }}>
      <VGHead>{t("head")}</VGHead>
      <ComplainTitle />
      <DesktopComplainContent />
    </div>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace([
  "complain",
  "chat",
]);
