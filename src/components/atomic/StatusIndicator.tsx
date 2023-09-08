import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function StatusIndicator(props: {
  status: "online" | "offline";
  time?: string;
}) {
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
