import { type APIResponse } from "../types";
import { HTTP } from "../http";
import { mapSellerPerformance, mapTotalSuccess } from "./mapper";
import type {
  DataTransactionSummary,
  DataProductStat,
  PeriodFilterParams,
  DataTotalSuccess,
  DataSellerPerformance,
  GraphSuccessUrl,
  DataGraphSuccess,
} from "./types";

export async function fetchDashboardProductStat() {
  const res = await HTTP.get("dashboard/product-stat");

  return res.data as APIResponse<DataProductStat>;
}

export async function fetchDashboardTransactionSummary() {
  const res = await HTTP.get("dashboard/transaction-summary");

  return res.data as APIResponse<DataTransactionSummary>;
}

export async function fetchDashboardTotalSuccessQty(
  params: PeriodFilterParams
) {
  const res = await HTTP.get("dashboard/total-success-qty", { params });

  const data = res.data as APIResponse<DataTotalSuccess>;

  return { ...data, data: mapTotalSuccess(data.data) };
}

export async function fetchDashboardTotalSuccessAmount(
  params: PeriodFilterParams
) {
  const res = await HTTP.get("dashboard/total-success-price", { params });

  const data = res.data as APIResponse<DataTotalSuccess>;

  return { ...data, data: mapTotalSuccess(data.data) };
}

export async function fetchDashboardSellerPerformance(
  params: PeriodFilterParams
) {
  const res = await HTTP.get("dashboard/seller-performance", { params });

  const data = res.data as APIResponse<DataSellerPerformance>;

  return { ...data, data: mapSellerPerformance(data.data) };
}

export async function fetchDashboardGraphSuccess(url: GraphSuccessUrl) {
  const res = await HTTP.get(`dashboard/graph-success-${url}`);

  return res.data as APIResponse<DataGraphSuccess>;
}
