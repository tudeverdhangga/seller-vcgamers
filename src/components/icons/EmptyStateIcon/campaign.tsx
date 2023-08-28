import Image from "next/image";

export default function EmptyStateIcon() {
  return (
    <Image
      src="/assets/campaign-empty-state.png"
      alt="Empty"
      width={288}
      height={197}
    />
  );
}
