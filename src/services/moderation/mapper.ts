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

  // TODO: should be seller checking for handling admin too
  if (data.sender_type !== "SELLER") {
    return {
      id: data.id,
      type: data.type,
      content: data.message,
      time: dayjs(data.sent_at).format("HH:MM"),
      side: data.sender_type === "BUYER" ? "left" : "admin",
    } satisfies ChatMessageProps;
  } else {
    return {
      id: data.id,
      type: data.type,
      content: data.message,
      time: dayjs(data.sent_at).format("HH:MM"),
      side: "right",
      status: "sent",
    } satisfies ChatMessageProps;
  }
}
