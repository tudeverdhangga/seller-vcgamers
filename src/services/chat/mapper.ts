import dayjs from "dayjs";
import type { ChatMessageProps } from "../moderation/types";
import type { BodyChatSendMessage, DataChatMessage } from "./types";
import { priceFormat } from "~/utils/format";
import { uid } from "~/utils/mapper";

export function mapChatMessageListToChatMessageListProps(
  dataList?: DataChatMessage[],
  senderId?: string
) {
  if (!dataList) return new Map<string, ChatMessageProps[]>();

  const dataRecord = new Map<string, ChatMessageProps[]>();

  dataList.forEach((data) => {
    const date = dayjs(data.sent_at).format("DD MMM YYYY");

    const record: ChatMessageProps[] = dataRecord.get(date) ?? [];

    dataRecord.set(date, [
      ...record,
      mapChatMessageToChatMessageListItemProps(data, senderId),
    ] as ChatMessageProps[]);
  });

  return dataRecord;
}

export function mapChatMessageToChatMessageListItemProps(
  data?: DataChatMessage,
  senderId?: string
) {
  if (!data) return undefined;

  const side = senderId === data.sender_id ? "left" : "right";
  const status = data.sender_id === "" ? "sending" : "sent";

  switch (data.type) {
    case "TEXT":
      return {
        id: data.id,
        type: data.type,
        content: data.message,
        time: dayjs(data.sent_at).format("HH:MM"),
        side: side,
        status,
      } satisfies ChatMessageProps;
    case "IMAGE":
    case "VIDEO":
      return {
        id: data.id,
        type: data.type,
        content: data.attachment ?? "",
        time: dayjs(data.sent_at).format("HH:MM"),
        side: side,
        status,
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
        status,
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
        status,
      } satisfies ChatMessageProps;
  }
}

export function mapOptimisticChatSendMessageToChatMessageListProps(
  dataMap: Map<string, ChatMessageProps[]>,
  data: BodyChatSendMessage
) {
  const date = dayjs().format("DD MMM YYYY");

  const record: ChatMessageProps[] = dataMap.get(date) ?? [];

  dataMap.set(date, [
    ...record,
    mapOptimisticChatSendMessageToChatMessageListItemProps(data),
  ] as ChatMessageProps[]);

  return dataMap;
}

export function mapOptimisticChatSendMessageToChatMessageListItemProps(
  data: BodyChatSendMessage
) {
  switch (data.type) {
    case "TEXT":
      return {
        id: uid(),
        type: data.type,
        content: data.message,
        time: dayjs().format("HH:MM"),
        side: "right",
        status: "sending",
      } satisfies ChatMessageProps;
    case "IMAGE":
    case "VIDEO":
      return {
        id: uid(),
        type: data.type,
        content: data.attachment ?? "",
        time: dayjs().format("HH:MM"),
        side: "right",
        status: "sending",
      } satisfies ChatMessageProps;
  }
}
