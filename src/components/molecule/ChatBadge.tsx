import { useGetNotificationCount } from "~/services/moderation/hooks";
import CountBadge from "../atomic/CountBadge";

export default function ChatBadge() {
  const { data } = useGetNotificationCount();

  const count =
    data?.data.find((d) => d.key === "SELLER_CHAT_UNREAD_ROOMS")?.value ?? 0;

  return <CountBadge badgeContent={count} />;
}
