import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  chatReadMessage,
  chatSendMessage,
  fetchChatMessage,
  fetchChatRoomIdByBuyerId,
  fetchChatRoomDetail,
  fetchChatRoomList,
} from "./api";
import { apiPaginationNextPageParam } from "../utils";
import { mapChatMessageListToChatMessageListProps } from "./mapper";
import { queryClient } from "../http";
import type { APIApiResponsePagination } from "../types";
import type { DataChatMessage } from "./types";
import dayjs from "dayjs";

export function useGetChatRoomIdByBuyerId(buyerId?: string) {
  return useQuery({
    queryKey: ["chat-room-by-buyerId", buyerId],
    queryFn: () => fetchChatRoomIdByBuyerId(buyerId ?? ""),
    enabled: typeof buyerId !== "undefined",
  });
}

export function useGetChatRoom() {
  return useInfiniteQuery({
    queryKey: ["chat-room"],
    queryFn: ({ pageParam = "1" }) =>
      fetchChatRoomList({
        page: pageParam as string,
        limit: 60,
      }),
    getNextPageParam: apiPaginationNextPageParam,
  });
}

export function useGetChatMessage(id: string) {
  const { data: chatRoom } = useGetChatRoomDetail(id);

  const queryInfo = useInfiniteQuery({
    queryKey: ["chat-messages", id],
    queryFn: ({ pageParam = "1" }) =>
      fetchChatMessage(id, { page: pageParam as string, limit: 60 }),
    getNextPageParam: apiPaginationNextPageParam,
  });

  return {
    ...queryInfo,
    senderId: chatRoom?.data.buyer.id,
    data: mapChatMessageListToChatMessageListProps(
      queryInfo.data?.pages.flatMap((page) => page.data),
      chatRoom?.data.buyer.id
    ),
  };
}

export function useChatSendMessage() {
  return useMutation({
    mutationFn: chatSendMessage,
    onMutate: async (message) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["chat-messages", message.room_id],
      });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData([
        "chat-messages",
        message.room_id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["chat-messages", message.room_id],
        (old: unknown) => {
          const oldRecord = old as
            | InfiniteData<APIApiResponsePagination<DataChatMessage[]>>
            | undefined;

          const lastPage:
            | APIApiResponsePagination<DataChatMessage[]>
            | undefined = !oldRecord?.pages.length
            ? undefined
            : oldRecord.pages.length === 1
            ? oldRecord.pages.at(0)
            : oldRecord.pages.at(-1);

          const pages: APIApiResponsePagination<DataChatMessage[]>[] = !lastPage
            ? []
            : [
                {
                  ...lastPage,
                  data: [
                    {
                      id: "",
                      message: message.message,
                      type: message.type as
                        | "TEXT"
                        | "IMAGE"
                        | "TRANSACTION"
                        | "VIDEO"
                        | "PRODUCT",
                      sent_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                      sender_id: "",
                      is_read: true,
                      attachment: message.attachment_url,
                    },
                    ...lastPage?.data,
                  ],
                },
              ];

          return {
            ...oldRecord,
            pages,
          };
        }
      );

      // Return a context object with the snapshotted value
      return { previousMessages };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, message, context) => {
      queryClient.setQueryData(
        ["chat-messages", message.room_id],
        context?.previousMessages
      );
    },
    // Always refetch after error or success:
    onSettled: (_, __, variable) => {
      void queryClient.invalidateQueries({
        queryKey: ["chat-messages", variable.room_id],
      });
    },
  });
}

export function useChatReadMessage() {
  return useMutation({
    mutationFn: chatReadMessage,
  });
}

export function useGetChatRoomDetail(roomId: string | undefined) {
  return useQuery({
    queryKey: ["chat-room-detail", roomId],
    queryFn: () => fetchChatRoomDetail(roomId ?? ""),
    enabled: typeof roomId !== "undefined",
  });
}
