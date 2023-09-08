import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ChatProfilePicture from "../atomic/ChatProfilePicture";
import Typography from "@mui/material/Typography";
import { useChatOnlineIndicator } from "~/utils/firebase";
import StatusIndicator from "../atomic/StatusIndicator";
import { useGetModerationDetail } from "~/services/moderation/hooks";

export default function ComplainMessageToolbar(props: { complainId: string }) {
  const { data } = useGetModerationDetail(props.complainId);
  const buyer = data?.data.participants.find((p) => p.type === "BUYER");
  const { online } = useChatOnlineIndicator(props.complainId);

  return (
    <Toolbar disableGutters sx={{ px: 2, backgroundColor: "common.white" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <ChatProfilePicture src={buyer?.photo} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <Typography
            sx={{ color: "primary.main", fontWeight: 700, fontSize: "16px" }}
          >
            {buyer?.name}
          </Typography>
          <StatusIndicator
            status={
              (online.status as "offline" | "online" | undefined) ?? "offline"
            }
            time={online.time}
          />
        </Box>
      </Box>
    </Toolbar>
  );
}
