import Image from "next/image";

export default function EmptyStateIcon() {
  return (
    <Image
      src="/assets/promo-empty-state.png"
      alt="Empty"
      width={300}
      height={197}
    />
  );
}
