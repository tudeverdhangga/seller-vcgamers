import Image from "next/image";

export default function ProfilePicture({
  src = "/assets/default-profile-pic.svg",
}: {
  src?: string;
}) {
  return <Image src={src} width={32} height={32} alt="Profile Picture" />;
}
