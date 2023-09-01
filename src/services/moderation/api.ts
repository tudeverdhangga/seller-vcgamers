import type { APIApiResponse, APIApiResponsePagination } from "../types";
import { HTTPApi } from "../http";
import type {
  BodyModeration,
  BodySendMessage,
  DataModerationDetail,
  DataModerationList,
  DataModerationMessage,
  ModerationListParams,
} from "./types";

export async function fetchModerationList(params: ModerationListParams) {
  const res = await HTTPApi.get("moderation/list", { params });

  return res.data as APIApiResponsePagination<DataModerationList[]>;
}

export async function fetchModerationDetail(id: string) {
  const res = await HTTPApi.get(`moderation/${id}`);

  return res.data as APIApiResponse<DataModerationDetail>;
}

export async function fetchModerationMessage(id: string, page: string) {
  const res = await HTTPApi.get(`moderation/${id}/messages`, {
    params: { page, limit: 50 },
  });

  return res.data as APIApiResponsePagination<DataModerationMessage[]>;
}

export async function moderationSendMessage(body: BodySendMessage) {
  const res = await HTTPApi.post("moderation/send", body);

  return res.data as APIApiResponse<boolean>;
}

export async function moderationInviteAdmin(body: BodyModeration) {
  const res = await HTTPApi.post("moderation/invite", body);

  return res.data as APIApiResponse<boolean>;
}

export async function moderationReadMessage(body: BodyModeration) {
  const res = await HTTPApi.post("moderation/read", body);

  return res.data as APIApiResponse<boolean>;
}
