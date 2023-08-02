import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function VIPMenu({
  src = "/assets/badge-vip.svg",
}: {
  src?: string;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Image src={src} width={20} height={20} alt="Menu VIP Seller" />
      <Typography
        ml={1}
        fontSize={12}
        fontWeight={700}
        color="common.red.900"
      >
        VIP SELLER
      </Typography>
    </Box>
  );
}
