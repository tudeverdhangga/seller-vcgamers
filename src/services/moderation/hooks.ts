import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  fetchModerationMessage,
  fetchModerationDetail,
  fetchModerationList,
  moderationSendMessage,
  moderationInviteAdmin,
  moderationReadMessage,
  fetchNotificationCount,
  fetchModerationDetailByTransactionId,
} from "./api";
import { apiPaginationNextPageParam } from "../utils";
import type { BodyModeration, BodySendMessage } from "./types";
import { queryClient } from "../http";
import {
  mapModerationMessageListToChatMessageListProps,
  readTrue,
} from "./mapper";

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
    async onMutate(variables) {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["moderation-list", "1"],
      });
      await queryClient.cancelQueries({
        queryKey: ["moderation-list", "2"],
      });

      // Snapshot the previous value
      const previousRoom1 = queryClient.getQueryData(["moderation-list", "1"]);
      const previousRoom2 = queryClient.getQueryData(["moderation-list", "2"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["moderation-list", "1"], (old: unknown) =>
        readTrue(old, variables.moderation_id)
      );
      queryClient.setQueryData(["moderation-list", "2"], (old: unknown) =>
        readTrue(old, variables.moderation_id)
      );

      // Return a context object with the snapshotted value
      return { previousRoom1, previousRoom2 };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["moderation-list", "1"],
        context?.previousRoom1
      );
      queryClient.setQueryData(
        ["moderation-list", "2"],
        context?.previousRoom2
      );
    },
  });
}

export function useGetNotificationCount() {
  return useQuery({
    queryKey: ["notification-count"],
    queryFn: fetchNotificationCount,
  });
}

export function useGetModerationDetailByTransactionId(transactionId?: string) {
  return useQuery({
    queryKey: ["moderation-detail-transaction", transactionId],
    queryFn: () =>
      fetchModerationDetailByTransactionId({
        transaction_detail_id: transactionId ?? "",
      }),
    enabled: typeof transactionId !== "undefined",
  });
}
