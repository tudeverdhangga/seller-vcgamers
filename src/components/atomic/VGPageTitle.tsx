import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type SxProps } from "@mui/material/styles";

export default function VGPageTitle(props: {
  subTitle: string;
  title: string;
  sx?: SxProps;
}) {
  return (
    <Box sx={props.sx}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
        }}
        color="common.shade.200"
      >
        {props.subTitle}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700,
        }}
        color="primary.main"
      >
        {props.title}
      </Typography>
    </Box>
  );
}
