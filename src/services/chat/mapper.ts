import dayjs from "dayjs";
import { type ChatMessageProps } from "../moderation/types";
import type { DataChatMessage } from "./types";

export function mapChatMessageListToChatMessageListProps(
  dataList?: DataChatMessage[]
) {
  if (!dataList) return new Map<string, ChatMessageProps[]>();

  const dataRecord = new Map<string, ChatMessageProps[]>();

  dataList.forEach((data) => {
    const date = dayjs(data.sent_at).format("DD MMM YYYY");

    const record: ChatMessageProps[] = dataRecord.get(date) ?? [];

    dataRecord.set(date, [
      ...record,
      mapChatMessageToChatMessageListItemProps(data),
    ] as ChatMessageProps[]);
  });

  return dataRecord;
}

export function mapChatMessageToChatMessageListItemProps(
  data?: DataChatMessage
) {
  if (!data) return undefined;

  if (data.sender_id && data.type === "TEXT") {
    return {
      id: data.id,
      type: data.type,
      content: data.message,
      time: dayjs(data.sent_at).format("HH:MM"),
      side: "left",
    } satisfies ChatMessageProps;
  }
}
