import dayjs from "dayjs";

import { priceFormat } from "~/utils/format";
import type {
  DataBalanceInfo,
  BalanceHistoryParams,
  BalanceHistoryRequestParams,
  DataBalanceHistory,
  BalanceType,
  BalanceHistory,
} from "./types";

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
