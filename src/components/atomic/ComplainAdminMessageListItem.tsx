/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import VGChip from "./VGChip";

export default function AdminTextMessage({
  content,
  time,
  side = "left",
}: {
  content: string;
  time: string;
  side?: "left" | "right";
}) {
  const justifyContent = side === "left" ? "flex-start" : "flex-end";
  const backgroundColor = side === "left" ? "common.blue.300" : "primary.light";
  const fontColor = side === "left" ? "common.market.2" : "primary.main";
  const borderRadius =
    side === "left" ? "0px 10px 10px 10px" : "10px 0px 10px 10px";

  return (
    <ListItem sx={{ justifyContent }} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius,
          backgroundColor,
          maxWidth: { xs: "100%", sm: "50%" },
          p: "10px",
          gap: "5px",
          alignItems: "flex-start",
        }}
      >
        <Typography sx={{ color: fontColor, fontSize: 14, fontWeight: 500 }}>
          {content}
        </Typography>
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <VGChip
            label="VCGamers Support"
            size="small"
            sx={{
              color: "common.white",
              backgroundColor: "common.market.1",
              fontWeight: 500,
            }}
          />
          <Typography
            sx={{ color: "common.shade.100", fontSize: 12, fontWeight: 500 }}
          >
            {time}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
