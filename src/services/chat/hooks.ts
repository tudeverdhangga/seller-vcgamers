import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  chatReadMessage,
  chatSendMessage,
  fetchChatMessage,
  fetchChatRoomList,
} from "./api";
import { apiPaginationNextPageParam } from "../utils";
import { useMemo } from "react";
import { mapChatMessageListToChatMessageListProps } from "./mapper";
import { useGetProfile } from "../api/auth";

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
  const { data: profileData } = useGetProfile();

  const queryInfo = useInfiniteQuery({
    queryKey: ["chat-messages", id],
    queryFn: ({ pageParam = "1" }) =>
      fetchChatMessage(id, { page: pageParam as string, limit: 60 }),
    getNextPageParam: apiPaginationNextPageParam,
  });

  return {
    ...queryInfo,
    senderId: useMemo(
      () =>
        queryInfo.data?.pages
          .flatMap((p) => p.data)
          .find((d) => d.sender_id !== profileData?.data.id)?.sender_id,
      [profileData?.data.id, queryInfo.data?.pages]
    ),
    data: useMemo(
      () =>
        mapChatMessageListToChatMessageListProps(
          queryInfo.data?.pages.flatMap((page) => page.data)
        ),
      [queryInfo.data?.pages]
    ),
  };
}

export function useChatSendMessage() {
  return useMutation({
    mutationFn: chatSendMessage,
  });
}

export function useChatReadMessage() {
  return useMutation({
    mutationFn: chatReadMessage,
  });
}
