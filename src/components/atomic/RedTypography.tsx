import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const RedTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default RedTypography;
