import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function DashboardStatCard(props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: { sm: "240px", xs: "130px" },
        p: 2,
        alignItems: "flex-start",
        gap: "10px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "primary.main",
          borderRadius: 43,
          height: 43,
          width: 43,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.icon}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            color: "common.shade.100",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {props.title}
        </Typography>
        <Typography
          sx={{
            color: "common.purple.500",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {props.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
