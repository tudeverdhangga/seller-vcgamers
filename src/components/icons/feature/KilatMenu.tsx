import Image from "next/image";

export default function KilatMenu({
  src = "/assets/badge-kilat.svg",
}: {
  src?: string;
}) {
  return <Image src={src} width={70} height={14} alt="Menu Kilat" />;
}
