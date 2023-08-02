import Image from "next/image";

export default function InstantMenu({
  src = "/assets/badge-instant.svg",
}: {
  src?: string;
}) {
  return <Image src={src} width={54} height={13} alt="Menu Instant" />;
}
