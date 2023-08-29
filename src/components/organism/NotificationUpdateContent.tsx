import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

import { useGetNotificationList } from "~/services/notification/hooks";
import NotificationCard from "../molecule/NotificationCard";
import NotificationDetailDialog from "../molecule/NotificationDetailDialog";
import NotificationEmptyState from "../molecule/NotificationEmptyState";

export default function NotificationSalesContent() {
  const { data, hasNextPage, fetchNextPage } = useGetNotificationList();

  if (!data?.pages.length) return <NotificationEmptyState />;

  const notifications = data?.pages.flatMap((page) => page.data);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "common.shade.0",
        borderRadius: "10px",
      }}
    >
      <InfiniteScroll
        dataLength={notifications ? notifications.length : 0}
        hasMore={hasNextPage ?? false}
        next={fetchNextPage}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        loader={<Skeleton variant="rounded" height={100} width="100%" />}
      >
        {notifications &&
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
      </InfiniteScroll>
      <NotificationDetailDialog />
    </Box>
  );
}
