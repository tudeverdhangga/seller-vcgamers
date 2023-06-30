import Image from "next/image";

export default function NotificationEmptyStateIcon() {
  return (
    <Image
      src="/assets/notification-empty-state.png"
      alt="Empty"
      width={120}
      height={86}
    />
  );
}
