import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ChatProfilePicture from "../atomic/ChatProfilePicture";
import Typography from "@mui/material/Typography";

export default function ChatMessageToolbar() {
  return (
    <Toolbar disableGutters sx={{ px: 2, backgroundColor: "common.white" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <ChatProfilePicture />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <Typography
            sx={{ color: "primary.main", fontWeight: 700, fontSize: "16px" }}
          >
            Rully gaming
          </Typography>
          <StatusIndicator status="offline" time="Aktif 1 jam lalu" />
        </Box>
      </Box>
    </Toolbar>
  );
}

function StatusIndicator(
  props: { status: "online" } | { status: "offline"; time: string }
) {
  const backgroundColor =
    props.status === "online" ? "common.green.500" : "common.red.500";
  const text = props.status === "online" ? "Online" : props.time;

  return (
    <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <Box
        sx={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor,
        }}
      />
      <Typography
        sx={{
          color: "common.shade.100",
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
