import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import InfiniteScroll from "react-infinite-scroll-component";

import { useGetNotificationList } from "~/services/notification/hooks";
import NotificationCard from "../molecule/NotificationCard";
import NotificationDetailDialog from "../molecule/NotificationDetailDialog";
import NotificationEmptyState from "../molecule/NotificationEmptyState";

export default function NotificationUpdateContent() {
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
      <List sx={{ width: "100%" }}>
        <InfiniteScroll
          dataLength={notifications ? notifications.length : 0}
          hasMore={hasNextPage ?? false}
          next={fetchNextPage}
          style={{ display: "flex", flexDirection: "column" }}
          loader={<Skeleton variant="rounded" height={100} width="100%" />}
        >
          {notifications &&
            notifications.map((notification, index) => (
              <>
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
                {index !== notifications.length - 1 && <Divider />}
              </>
            ))}
        </InfiniteScroll>
      </List>
      <NotificationDetailDialog />
    </Box>
  );
}
