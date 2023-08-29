import { HTTPApi } from "../http";
import type { APIApiResponse, APIApiResponsePagination } from "../types";
import type {
  BodyNotificationRead,
  DataNotification,
  DataNotificationCount,
  NotificationListParam,
} from "./types";

export async function fetchNotificationList(params: NotificationListParam) {
  const res = await HTTPApi.get("notification/list", { params });

  return res.data as APIApiResponsePagination<DataNotification[]>;
}

export async function fetchNotificationDetail(notification_id: string) {
  const res = await HTTPApi.get(`notification/detail/${notification_id}`);

  return res.data as APIApiResponse<DataNotification>;
}

export async function fetchNotificationCount() {
  const res = await HTTPApi.get("notification/count");

  return res.data as APIApiResponse<DataNotificationCount[]>;
}

export async function readNotification(body: BodyNotificationRead) {
  const res = await HTTPApi.post("notification/read", body);

  return res.data as APIApiResponse<null>;
}
