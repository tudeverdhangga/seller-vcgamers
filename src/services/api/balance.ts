import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";
import { queryTypes, useQueryState } from "next-usequerystate";

import { priceFormat } from "~/utils/format";
import { HTTP } from "../http";
import type { APIResponse, APIResponsePagination, SellerBank } from "./types";

interface DataBalanceInfo {
  balance: number;
  pending_withdrawal: number;
  withdrawal_status: number;
  withdrawal_status_error: boolean;
  withdrawal_status_name: string;
  withdrawal_status_text: "progress" | "hold";
  bank: SellerBank;
  bank_info: string;
}

export interface BalanceHistory {
  id: string;
  status: BalanceType;
  description: string;
  amount: string;
  last_amount: string;
  new_amount: string;
  date: string;
}

export type BalanceType = "debit" | "credit" | "progress" | "cancel" | "hold";

interface DataBalanceHistory {
  id: string;
  status_name: string;
  description: string;
  amount: number;
  last_amount: number;
  new_amount: number;
  date: string;
}

export interface BalanceHistoryParams {
  limit?: number;
  prev_cursor?: string;
  next_cursor?: string;
  search?: string;
  status?: string;
  date_start?: Dayjs;
  date_end?: Dayjs;
}

interface BalanceHistoryRequestParams {
  limit: number;
  prev_cursor: string;
  next_cursor: string;
  search: string;
  status: string;
  date_start: string;
  date_end: string;
}

interface BalanceHistoryStatus {
  label: string;
  value: string;
}

export function mapBalanceInfo(value: DataBalanceInfo) {
  return {
    ...value,
    withdrawal_status_error: value.withdrawal_status === 1,
    withdrawal_status_text:
      value.withdrawal_status_name === "Diproses" ? "progress" : "hold",
    bank_info: `BANK ${value.bank.bank_name} ${value.bank.bank_account_number} a/n ${value.bank.bank_account_name}`,
  } satisfies DataBalanceInfo;
}

export function mapBalanceHistoryParams(value: BalanceHistoryParams) {
  return {
    limit: value.limit ?? 10,
    prev_cursor: value.prev_cursor ?? "",
    next_cursor: value.next_cursor ?? "",
    search: value.search ?? "",
    status: value.status ?? "",
    date_start: value.date_start?.format("YYYY-MM-DD") ?? "",
    date_end: value.date_end?.format("YYYY-MM-DD") ?? "",
  } satisfies BalanceHistoryRequestParams;
}

export function mapBalanceHistory(value: DataBalanceHistory) {
  const statusMapping = {
    "Dana Masuk": "debit",
    "Dana Keluar": "credit",
    Diproses: "progress",
    Ditolak: "cancel",
    Ditahan: "hold",
  } as {
    [K in string]: BalanceType;
  };

  return {
    id: value.id,
    status: statusMapping[value.status_name] ?? "debit",
    description: value.description,
    amount: priceFormat(value.amount),
    last_amount: priceFormat(value.last_amount),
    new_amount: priceFormat(value.new_amount),
    date: dayjs(value.date).format("DD MMMM YYYY"),
  } satisfies BalanceHistory;
}

export function useGetBalanceInfo() {
  return useQuery({
    queryKey: ["balance-info"],
    queryFn: async () => {
      const res = await HTTP.get("/balance/balance-info");

      const response = res.data as APIResponse<DataBalanceInfo>;
      response.data = mapBalanceInfo(response.data);

      return response;
    },
  });
}

export function useGetBalanceHistories() {
  const [status] = useQueryState("status", queryTypes.string.withDefault(""));
  const [date_start] = useQueryState(
    "date_start",
    queryTypes.string.withDefault("")
  );
  const [date_end] = useQueryState(
    "date_end",
    queryTypes.string.withDefault("")
  );

  return useInfiniteQuery({
    queryKey: ["balance-histories", status, date_start, date_end],
    queryFn: async ({ pageParam }) => {
      const queryParams: BalanceHistoryRequestParams = {
        limit: 10,
        prev_cursor: "",
        next_cursor: (pageParam as string) ?? "",
        search: "",
        status,
        date_start,
        date_end,
      };

      const res = await HTTP.get("/balance/balance-histories", {
        params: queryParams,
      });

      const data = res.data as APIResponsePagination<DataBalanceHistory[]>;

      return {
        ...data,
        data: { ...data.data, data: data.data.data.map(mapBalanceHistory) },
      } as APIResponsePagination<BalanceHistory[]>;
    },
    getNextPageParam: (currentPage) => {
      const nextCursor = currentPage.data.pagination_data.next_cursor;
      const prevCursor = currentPage.data.pagination_data.prev_cursor;

      return nextCursor === prevCursor ? undefined : nextCursor || "";
    },
  });
}

export function useGetBalanceHistoryStatus() {
  return useQuery({
    queryKey: ["balance-history-status"],
    queryFn: async () => {
      const res = await HTTP.get("/balance/history-statuses");

      const response = res.data as APIResponse<BalanceHistoryStatus[]>;

      return response;
    },
  });
}

export async function postRequestWithdrawal() {
  const res = await HTTP.post(`/balance/request-withdrawal`);

  return res.data as APIResponse<{ data: string }>;
}
