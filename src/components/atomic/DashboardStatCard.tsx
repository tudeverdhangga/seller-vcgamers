import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { type SxProps } from "@mui/material/styles";
import DashboardStatDescription from "./DashboardStatDescription";

export default function DashboardStatCard(props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  sx?: SxProps;
  stat: Parameters<typeof DashboardStatDescription>[0];
  onClick: () => void;
}) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "common.shade.75",
        display: "inline-flex",
        flexDirection: "column",
        width: { sm: "49%", xs: "230px" },
        flex: "none",
        height: "100%",
        alignItems: "flex-start",
        gap: "10px",
        borderRadius: "12px",
        cursor: "pointer",
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      <Box sx={{ display: "inline-flex", mx: 2, mt: 2, gap: "10px" }}>
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
      <Divider
        sx={{
          backgroundColor: "common.shade.50",
          width: "100%",
        }}
      />
      <DashboardStatDescription {...props.stat} sx={{ mx: 2, mb: 2 }} />
    </Box>
  );
}
