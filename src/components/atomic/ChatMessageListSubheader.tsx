import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";

export default function ChatMessageListSubheader(props: { content: string }) {
  return (
    <ListSubheader sx={{ backgroundColor: "transparent" }}>
      <Typography
        sx={{
          color: "common.shade.100",
          fontSize: 12,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {props.content}
      </Typography>
    </ListSubheader>
  );
}
