import type { Dayjs } from "dayjs";
import type { SellerBank } from "../types";

export interface DataBalanceInfo {
  balance: number;
  pending_withdrawal: number;
  withdrawal_status: number;
  withdrawal_status_error: boolean;
  withdrawal_status_name: string;
  withdrawal_status_text: "progress" | "hold";
  bank: SellerBank;
  bank_info: string;
}

export interface DataWithdrawalSummary {
  bank: {
    bank_name: string;
    bank_account_number: string;
    bank_account_name: string;
  };
  summary: {
    name: string;
    value: number;
  }[];
}

export interface Bank {
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
}

export interface Summary {
  name: string;
  value: number;
}

export interface BalanceHistory {
  id: string;
  status: BalanceType;
  description: string;
  description_reason: string;
  amount: string;
  last_amount: string;
  new_amount: string;
  date: string;
}

export type BalanceType = "debit" | "credit" | "progress" | "cancel" | "hold";

export interface DataBalanceHistory {
  id: string;
  status_name: string;
  description: string;
  description_reason: string;
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

export interface BalanceHistoryRequestParams {
  limit: number;
  prev_cursor: string;
  next_cursor: string;
  search: string;
  status: string;
  date_start: string;
  date_end: string;
}

export interface BalanceHistoryStatus {
  label: string;
  value: string;
}
