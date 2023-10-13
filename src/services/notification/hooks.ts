import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryTypes, useQueryState } from "next-usequerystate";
import { apiPaginationNextPageParam } from "../utils";
import {
  fetchNotificationCount,
  fetchNotificationDetail,
  fetchNotificationList,
  readNotification,
} from "./api";

export function useGetNotificationList() {
  const [flag] = useQueryState(
    "flag",
    queryTypes.string.withDefault("marketplace")
  );
  const type = flag === "marketplace" ? "store" : "";

  return useInfiniteQuery({
    queryKey: ["notification-list", flag],
    queryFn: ({ pageParam = "1" }) =>
      fetchNotificationList({
        flag,
        type,
        page: pageParam as string,
        limit: 64,
      }),
    enabled: flag !== null,
    getNextPageParam: apiPaginationNextPageParam,
  });
}

export function useGetNotificationDetail(notification_id: string) {
  return useQuery({
    queryKey: ["notification-detail", notification_id],
    queryFn: () => fetchNotificationDetail(notification_id),
  });
}

export function useGetNotificationCount() {
  return useQuery({
    queryKey: ["notification-tab-count"],
    queryFn: fetchNotificationCount,
  });
}

export function useReadNotification() {
  return useMutation({
    mutationFn: readNotification,
  });
}
