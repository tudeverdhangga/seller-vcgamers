import { Paper, SxProps, Theme, Typography } from "@mui/material";

export default function CustomizedContentCard(props: {
  title?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}) {

  const titleContentStyle = {
    color: "primary.main",
    fontSize: {xs: "14px", md: "16px"}, 
    fontWeight: "bold"
  }

  return (
    <Paper sx={{ mt:1, p: 2, backgroundColor: "#fff", borderRadius: '8px', ...props.sx }}>
      {
        props.title && 
        <Typography
          component="span"
          sx={titleContentStyle}
        >
          {props.title}
        </Typography>
      }
      {props.children}
    </Paper>
  )
}