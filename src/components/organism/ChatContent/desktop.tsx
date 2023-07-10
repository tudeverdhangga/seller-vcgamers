import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";

import ChatConversationToolbar from "~/components/molecule/ChatConversationToolbar";
import ChatRoomContent from "../ChatRoomContent/desktop";
import ChatConversationContent from "../ChatConversationContent/desktop";

export default function ChatContent() {
  return (
    <>
      <Grid
        container
        sx={{
          mt: "20px",
          borderRadius: "10px",
          backgroundColor: "background.paper",
          flexGrow: 1,
        }}
      >
        <Grid sm={4}>
          <ChatConversationToolbar />
          <Divider />
          <ChatConversationContent />
        </Grid>
        <Grid
          sm={8}
          sx={{
            borderLeft: "1px solid",
            borderColor: "common.shade.50",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatRoomContent />
        </Grid>
      </Grid>
    </>
  );
}
