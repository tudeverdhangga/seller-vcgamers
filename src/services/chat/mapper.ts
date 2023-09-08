import dayjs from "dayjs";
import { type ChatMessageProps } from "../moderation/types";
import type { DataChatMessage } from "./types";
import { priceFormat } from "~/utils/format";

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

  const userId = localStorage.getItem("user_id");

  const side = userId === data.sender_id ? "right" : "left";

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
      return {
        id: data.id,
        type: data.type,
        content: data.attachment,
        time: dayjs(data.sent_at).format("HH:MM"),
        side: side,
        status: "sent",
      } satisfies ChatMessageProps;
    case "PRODUCT":
      if (!data.product) return undefined;

      return {
        id: data.id,
        type: data.type,
        content: {
          image: data.product.image,
          name: data.product.name,
          price: priceFormat(data.product.price),
          slug: data.product.slug,
          rating: "5",
          sold: "1",
        },
        side: side,
        status: "sent",
      } satisfies ChatMessageProps;
    case "TRANSACTION":
      if (!data.transaction) return undefined;

      return {
        id: data.id,
        type: data.type,
        content: {
          status: data.transaction.status,
          code: data.transaction.code,
          transaction_code: data.transaction.code,
          image: data.transaction.thumbnail,
        },
        side: side,
        status: "sent",
      } satisfies ChatMessageProps;
  }
}
