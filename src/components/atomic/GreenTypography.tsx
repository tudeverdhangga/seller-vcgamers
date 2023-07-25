import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const GreenTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
}));

export default GreenTypography;
