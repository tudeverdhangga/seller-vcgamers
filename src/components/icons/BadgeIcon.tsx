import { styled } from "@mui/material/styles";

const BadgeIcon = styled(
  (props: { className?: string; content: string | number | JSX.Element }) => (
    <div className={props.className}>{props.content}</div>
  )
)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "50%",
  width: 18,
  height: 18,
  color: theme.palette.common.white,
  fontSize: 12,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default BadgeIcon;
