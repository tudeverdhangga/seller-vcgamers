import Image from "next/image";

export default function ChatProfilePicture({
  src = "/assets/default-chat-pic.png",
}) {
  return (
    <div style={{ position: "relative", width: 40, height: 40 }}>
      <Image
        src="/assets/default-profile-pic.svg"
        width={40}
        height={40}
        alt="Profile Picture Border"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Image
        src={src}
        width={29.47}
        height={29.47}
        alt="Profile Picture"
        style={{
          position: "absolute",
          top: 5.5,
          left: 5.25,
          clipPath:
            "polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
        }}
      />
    </div>
  );
}
