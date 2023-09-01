import { HTTPApi } from "../http";
import type { APIApiResponse, APIApiResponsePagination } from "../types";
import type {
  BodyChatReadMessage,
  BodyChatSendMessage,
  ChatListParams,
  ChatMessageParam,
  DataChatMessage,
  DataChatRoom,
  DataChatSendMessage,
} from "./types";

export async function fetchChatRoomList(params: ChatListParams) {
  const res = await HTTPApi.get("chat/seller/rooms", { params });

  return res.data as APIApiResponsePagination<DataChatRoom[]>;
}

export async function fetchChatMessage(id: string, params: ChatMessageParam) {
  const res = await HTTPApi.get(`chat/messages/list/${id}`, { params });

  return res.data as APIApiResponsePagination<DataChatMessage[]>;
}

export async function chatReadMessage(body: BodyChatReadMessage) {
  const res = await HTTPApi.post("chat/messages/read", body);

  return res.data as APIApiResponse<boolean>;
}

export async function chatSendMessage(body: BodyChatSendMessage) {
  const res = await HTTPApi.post("chat/send", body);

  return res.data as APIApiResponse<DataChatSendMessage>;
}
