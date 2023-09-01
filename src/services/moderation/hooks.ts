import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  fetchModerationMessage,
  fetchModerationDetail,
  fetchModerationList,
  moderationSendMessage,
  moderationInviteAdmin,
  moderationReadMessage,
} from "./api";
import { apiPaginationNextPageParam } from "../utils";
import type { BodyModeration, BodySendMessage } from "./types";
import { queryClient } from "../http";
import { mapModerationMessageListToChatMessageListProps } from "./mapper";

export function useGetModerationList(status: "1" | "2") {
  return useInfiniteQuery({
    queryKey: ["moderation-list", status],
    queryFn: ({ pageParam = "1" }) =>
      fetchModerationList({
        as: "seller",
        limit: 25,
        page: pageParam as string,
        status,
      }),
    getNextPageParam: apiPaginationNextPageParam,
  });
}

export function useGetModerationDetail(id: string) {
  return useQuery({
    queryKey: ["moderation-detail", id],
    queryFn: () => fetchModerationDetail(id),
  });
}

export function useGetModerationMessage(id: string) {
  const queryInfo = useInfiniteQuery({
    queryKey: ["moderation-messages", id],
    queryFn: ({ pageParam = "1" }) =>
      fetchModerationMessage(id, pageParam as string),
    getNextPageParam: apiPaginationNextPageParam,
  });

  return {
    ...queryInfo,
    data: useMemo(
      () =>
        mapModerationMessageListToChatMessageListProps(
          queryInfo.data?.pages.flatMap((page) => page.data)
        ),
      [queryInfo.data?.pages]
    ),
  };
}

// TODO: Optimistic update messages
export function usePostModerationSendMessage() {
  return useMutation({
    mutationFn: (body: BodySendMessage) => moderationSendMessage(body),
    onSuccess: (_, variable) => {
      void queryClient.invalidateQueries({
        queryKey: ["moderation-detail", variable.id],
      });
    },
  });
}

export function usePostModerationInviteAdmin() {
  return useMutation({
    mutationFn: (body: BodyModeration) => moderationInviteAdmin(body),
  });
}

export function usePostModerationReadMessage() {
  return useMutation({
    mutationFn: (body: BodyModeration) => moderationReadMessage(body),
  });
}
