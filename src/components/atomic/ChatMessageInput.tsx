import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AttachmentIcon from "../icons/chat/AttachmentIcon";
import SendIcon from "../icons/chat/SendIcon";
import TextField from "@mui/material/TextField";

export default function ChatMessageInput() {
  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "background.paper",
        borderRadius: "5px",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="attachment">
        <AttachmentIcon />
      </IconButton>
      <TextField
        variant="standard"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Tulis pesan..."
        inputProps={{ "aria-label": "input chat message" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="send">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
