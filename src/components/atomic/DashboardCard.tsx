import { type SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function DashboardCard(props: {
  sx?: SxProps;
  title: string;
  titleTrailing?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: "20px",
        borderRadius: "10px",
        backgroundColor: "background.paper",
        p: { sm: "20px", xs: "16px" },
        ...props.sx,
      }}
    >
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: { sm: 16, xs: 14 },
            fontWeight: 700,
          }}
        >
          {props.title}
        </Typography>
        {props.titleTrailing}
      </Box>
      {props.children}
    </Box>
  );
}
