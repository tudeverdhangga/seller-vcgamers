import { useGetNotificationCount } from "~/services/moderation/hooks";
import CountBadge from "../atomic/CountBadge";

export default function ComplainBadge() {
  const { data } = useGetNotificationCount();

  const count =
    data?.data.find((d) => d.key === "TOTAL_MODERATION_SELLER")?.value ?? 0;

  return <CountBadge badgeContent={count} />;
}
