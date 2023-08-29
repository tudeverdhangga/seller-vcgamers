import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useQueryState } from "next-usequerystate";
import { apiPaginationNextPageParam } from "../utils";
import {
  fetchNotificationCount,
  fetchNotificationDetail,
  fetchNotificationList,
  readNotification,
} from "./api";

export function useGetNotificationList() {
  const [type] = useQueryState("type");

  return useInfiniteQuery({
    queryKey: ["notification-list", type],
    queryFn: ({ pageParam = "1" }) =>
      fetchNotificationList({
        flag: type as string,
        page: pageParam as string,
        limit: 64,
      }),
    enabled: type !== null,
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
    queryKey: ["notification-count"],
    queryFn: fetchNotificationCount,
  });
}

export function useReadNotification() {
  return useMutation({
    mutationFn: readNotification,
  });
}
