import { Box, Typography } from "@mui/material"

export default function PageTitle(props: {
  subTitle: string;
  title: string;
}) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600
        }}
        color="common.shade.200"
      >
        {props.subTitle}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700
        }}
        color="primary.main"
      >
        {props.subTitle}
      </Typography>
    </Box>
  )
}
