import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";

export default styled(LoadingButton)((props) => ({
  fontSize: "14px",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: "10px",
  boxShadow: "none",
  padding:
    props.size === "small"
      ? "5px 8px"
      : props.size === "medium"
      ? "8px 14px"
      : "10px 15px",
}));
