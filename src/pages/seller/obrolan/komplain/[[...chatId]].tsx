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

  // useEffect(() => {
  //   onMessageListener()
  //     .then((payload: any) => {
  //       if (chatId?.at(0) !== payload.room_id) {
  //         queryClient.setQueryData(["moderation-list"], (old: any) =>
  //           old.map((r: any) =>
  //             r.id === payload.room_id ? { ...r, is_read: false } : r
  //           )
  //         );
  //       } else {
  //         queryClient.setQueryData(
  //           ["moderation-messages", chatId?.at(0)],
  //           (old: any) => {
  //             const record = Array.from(old)[old.size - 1] as [string, any];
  //             old.set(record[0], [
  //               ...record[1],
  //               mapModerationMessageToChatMessageListItemProps(payload),
  //             ]);
  //             return old;
  //           }
  //         );
  //       }
  //     })
  //     .catch((e) => console.error(e));
  // }, [chatId]);

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
