import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";

import ComplainConversationToolbar from "~/components/molecule/ComplainConversationToolbar";
import ComplainRoomContent from "../ComplainRoomContent/desktop";
import ComplainConversationContent from "../ComplainConversationContent/desktop";

export default function ComplainContent() {
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
          <ComplainConversationToolbar />
          <Divider />
          <ComplainConversationContent />
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
          <ComplainRoomContent />
        </Grid>
      </Grid>
    </>
  );
}
