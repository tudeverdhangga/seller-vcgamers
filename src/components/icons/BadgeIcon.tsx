import { styled } from "@mui/material/styles";

const BadgeIcon = styled(
  (props: {
    className?: string;
    content?: string | number | boolean | JSX.Element;
  }) => {
    if (typeof props.content === "undefined" || props.content === 0) {
      return <></>;
    }

    return <div className={props.className}>{props.content}</div>;
  }
)(({ theme }) => ({
  backgroundColor: theme.palette.common.red[500],
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
