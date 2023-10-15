import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
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
import type {
  BodyModeration,
  BodySendMessage,
  DataModerationMessage,
} from "./types";
import { queryClient } from "../http";
import {
  mapModerationMessageListToChatMessageListProps,
  readTrue,
} from "./mapper";
import type { APIApiResponsePagination } from "../types";
import dayjs from "dayjs";

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

export function usePostModerationSendMessage() {
  return useMutation({
    mutationFn: (body: BodySendMessage) => moderationSendMessage(body),
    async onMutate(message) {
      await queryClient.cancelQueries({
        queryKey: ["moderation-messages", message.id],
      });

      const previousMessages = queryClient.getQueryData([
        "moderation-messages",
        message.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["moderation-messages", message.id],
        (old: unknown) => {
          const oldRecord = old as
            | InfiniteData<APIApiResponsePagination<DataModerationMessage[]>>
            | undefined;

          const lastPage:
            | APIApiResponsePagination<DataModerationMessage[]>
            | undefined = !oldRecord?.pages.length
            ? undefined
            : oldRecord.pages.length === 1
            ? oldRecord.pages.at(0)
            : oldRecord.pages.at(-1);

          const pages: APIApiResponsePagination<DataModerationMessage[]>[] =
            !lastPage
              ? []
              : [
                  {
                    ...lastPage,
                    data: [
                      ...lastPage?.data,
                      {
                        id: "",
                        message: message.message,
                        type: message.type as
                          | "TEXT"
                          | "VIDEO"
                          | "IMAGE"
                          | "DOCUMENT",
                        sent_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                        sender_id: "",
                        is_read: false,
                        is_important: false,
                        is_admin: false,
                        attachment: message.attachment_url,
                        sender_type: "SELLER",
                      },
                    ],
                  },
                ];

          return {
            ...oldRecord,
            pages,
          };
        }
      );

      return { previousMessages };
    },
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
    onSuccess: async (_, variable) => {
      await queryClient.invalidateQueries({
        queryKey: ["moderation-detail", variable.moderation_id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["moderation-messages", variable.moderation_id],
      });
    },
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
