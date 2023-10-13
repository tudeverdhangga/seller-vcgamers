import type { APIResponse, APIResponsePagination } from "../types";
import { HTTP } from "../http";
import { mapBalanceHistory, mapBalanceInfo } from "./mapper";
import type {
  BalanceHistory,
  BalanceHistoryRequestParams,
  BalanceHistoryStatus,
  DataBalanceHistory,
  DataBalanceInfo,
  DataWithdrawalSummary,
} from "./types";

export async function fetchBalanceInfo() {
  const res = await HTTP.get("/balance/balance-info");

  const response = res.data as APIResponse<DataBalanceInfo>;
  response.data = mapBalanceInfo(response.data);

  return response;
}

export async function fetchWithdrawalSummary() {
  const res = await HTTP.get("balance/request-withdrawal-summary");

  return res.data as APIResponse<DataWithdrawalSummary>;
}

export async function fetchBalanceHistories(params: {
  status: string;
  dateStart: string;
  dateEnd: string;
  pageParam: string;
}) {
  const queryParams: BalanceHistoryRequestParams = {
    limit: 10,
    prev_cursor: "",
    next_cursor: params.pageParam,
    search: "",
    status: params.status,
    date_start: params.dateStart,
    date_end: params.dateEnd,
  };

  const res = await HTTP.get("/balance/balance-histories", {
    params: queryParams,
  });

  const data = res.data as APIResponsePagination<DataBalanceHistory[]>;

  return {
    ...data,
    data: { ...data.data, data: data.data.data.map(mapBalanceHistory) },
  } as APIResponsePagination<BalanceHistory[]>;
}

export async function fetchBalanceHistoryStatus() {
  const res = await HTTP.get("/balance/history-statuses");

  const response = res.data as APIResponse<BalanceHistoryStatus[]>;

  return response;
}

export async function postRequestWithdrawal(body: { pin: string }) {
  const res = await HTTP.post(`/balance/request-withdrawal`, body);

  return res.data as APIResponse<{ data: string }>;
}
