import Image from "next/image";

export default function EmptyStateIcon() {
  return (
    <Image
      src="/assets/chat-conversation-empty-state.png"
      alt="Empty"
      width={130}
      height={83.3}
    />
  );
}
