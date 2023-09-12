import Badge, { type BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const CountBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.common.red[500],
    color: theme.palette.common.white,
    fontSize: 12,
    fontWeight: 700,
  },
}));

export default CountBadge;
