/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import VGChip from "../atomic/VGChip";
import { useRouter } from "next/router";

export default function ComplainMessageInfoBanner() {
  //TODO(rizanafis): change logic with API integration
  const router = useRouter();
  const data = {
    name: "Asphalt 6 Legend Coins",
    transactionId: "TRX-1234567890-01234",
    image: "/assets/chat-product-img.png",
  };

  const chatId = router.query.chatId as string[] | undefined;

  const completed = chatId && chatId[0] === "234";

  return (
    <Link href="" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: { sm: "common.purple.0", xs: "background.paper" },
          p: "10px 15px",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img src={data.image} width={23} height={23} alt="Attachment" />
        <Box sx={{ display: "block", flexGrow: 1 }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: { sm: "common.purple.500", xs: "common.shade.700" },
            }}
          >
            {data.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: { sm: "common.purple.500", xs: "common.shade.200" },
            }}
          >
            {data.transactionId}
          </Typography>
        </Box>
        {completed ? (
          <VGChip label="Komplain Selesai" color="success" size="small" />
        ) : (
          <VGChip label="Dalam Proses" color="warning" size="small" />
        )}
      </Box>
    </Link>
  );
}
