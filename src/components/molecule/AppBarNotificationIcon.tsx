import Link from "next/link";

import Badge, { type BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import BellIcon from "../icons/BellIcon";
import { useGetNotificationCount } from "~/services/notification/hooks";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 13,
    padding: "0 4px",
    backgroundColor: theme.palette.common.red[500],
    color: theme.palette.common.white,
  },
}));

export default function AppBarNotificationIcon() {
  const { data } = useGetNotificationCount();

  const notificationCount =
    data?.data.reduce((acc, count) => acc + count.count, 0) ?? 0;

  return (
    <Link
      href={"/seller/notifikasi"}
      passHref
      legacyBehavior
      style={{ textDecoration: "none" }}
    >
      <IconButton>
        {notificationCount ? (
          <StyledBadge badgeContent={notificationCount}>
            <BellIcon color="action" />
          </StyledBadge>
        ) : (
          <BellIcon color="action" />
        )}
      </IconButton>
    </Link>
  );
}

