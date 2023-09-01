/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { useGetModerationDetail } from "~/services/moderation/hooks";
import VGChip from "../atomic/VGChip";

export default function ComplainMessageInfoBanner({
  complainId,
}: {
  complainId: string;
}) {
  const { data } = useGetModerationDetail(complainId);

  const completed = data?.data.status !== "ON_GOING";

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
        <img
          src={data?.data.transaction.product.image}
          width={23}
          height={23}
          alt="Attachment"
        />
        <Box sx={{ display: "block", flexGrow: 1 }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: { sm: "common.purple.500", xs: "common.shade.700" },
            }}
          >
            {data?.data.transaction.product.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: { sm: "common.purple.500", xs: "common.shade.200" },
            }}
          >
            {data?.data.transaction.code}
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
