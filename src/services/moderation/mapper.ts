import { type InfiniteData } from "@tanstack/react-query";
import type {
  ChatMessageProps,
  DataModerationList,
  DataModerationMessage,
} from "./types";
import dayjs from "dayjs";
import { type APIApiResponsePagination } from "../types";

export function mapModerationMessageListToChatMessageListProps(
  dataList?: DataModerationMessage[]
) {
  if (!dataList) return new Map<string, ChatMessageProps[]>();

  const dataRecord = new Map<string, ChatMessageProps[]>();

  dataList.forEach((data) => {
    const date = dayjs(data.sent_at).format("DD MMMM YYYY");

    const record: ChatMessageProps[] = dataRecord.get(date) ?? [];

    dataRecord.set(date, [
      ...record,
      mapModerationMessageToChatMessageListItemProps(data),
    ] as ChatMessageProps[]);
  });

  return dataRecord;
}

export function mapModerationMessageToChatMessageListItemProps(
  data?: DataModerationMessage
) {
  if (!data) return undefined;

  const side =
    data.sender_type === "SELLER"
      ? "right"
      : data.sender_type === "BUYER"
      ? "left"
      : "admin";

  switch (data.type) {
    case "TEXT":
      return {
        id: data.id,
        type: data.type,
        content: data.message,
        time: dayjs(data.sent_at).format("HH:mm"),
        side: side,
        status: "sent",
      } satisfies ChatMessageProps;
    case "IMAGE":
    case "VIDEO":
    case "DOCUMENT":
      return {
        id: data.id,
        type: data.type,
        content: data.attachment ?? "",
        time: dayjs(data.sent_at).format("HH:mm"),
        side: side,
        status: "sent",
      } satisfies ChatMessageProps;
  }
}

export function readTrue(old: unknown, id: string) {
  const oldRecord = old as
    | InfiniteData<APIApiResponsePagination<DataModerationList[]>>
    | undefined;

  oldRecord?.pages.forEach((p) =>
    p.data.forEach((d) => {
      if (d.id === id) {
        d.is_read = true;
      }
    })
  );

  return oldRecord;
}

// trimming transaction code
export function trimCode(code: string) {
  if (code.length <= 16) {
    return code; // Return input as is if it's 16 characters or shorter
  }

  const firstPart = code.substring(0, 8);
  const lastPart = code.substring(code.length - 8);
  return `${firstPart}...${lastPart}`;
}
