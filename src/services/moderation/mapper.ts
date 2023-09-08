import type { ChatMessageProps, DataModerationMessage } from "./types";
import dayjs from "dayjs";

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

  const userId = localStorage.getItem("user_id");

  const side =
    userId === data.sender_id
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
        time: dayjs(data.sent_at).format("HH:MM"),
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
        time: dayjs(data.sent_at).format("HH:MM"),
        side: side,
        status: "sent",
      } satisfies ChatMessageProps;
  }
}
