import { useQuery } from "@tanstack/react-query";
import {
  fetchDashboardGraphSuccess,
  fetchDashboardProductStat,
  fetchDashboardSellerPerformance,
  fetchDashboardTotalSuccessAmount,
  fetchDashboardTotalSuccessQty,
  fetchDashboardTransactionSummary,
} from "./api";
import type { GraphSuccessUrl, PeriodFilterParams } from "./types";

export function useGetDashboardProductStat() {
  return useQuery({
    queryKey: ["dashboard-product-stat"],
    queryFn: () => fetchDashboardProductStat(),
  });
}

export function useGetDashboardTransactionSummary() {
  return useQuery({
    queryKey: ["dashboard-transaction-summary"],
    queryFn: () => fetchDashboardTransactionSummary(),
  });
}

export function useGetDashboardTotalSuccessQty(params: PeriodFilterParams) {
  return useQuery({
    queryKey: ["dashboard-total-success-qty", params.periode_filter],
    queryFn: () => fetchDashboardTotalSuccessQty(params),
  });
}

export function useGetDashboardTotalSuccessAmount(params: PeriodFilterParams) {
  return useQuery({
    queryKey: ["dashboard-total-success-amount", params.periode_filter],
    queryFn: () => fetchDashboardTotalSuccessAmount(params),
  });
}

export function useGetDashboardSellerPerformance(params: PeriodFilterParams) {
  return useQuery({
    queryKey: ["dashboard-seller-performance", params.periode_filter],
    queryFn: () => fetchDashboardSellerPerformance(params),
  });
}

export function useGetDashboardGraphSuccess(url: GraphSuccessUrl) {
  return useQuery({
    queryKey: [`dashboard-graph-success-${url}`],
    queryFn: () => fetchDashboardGraphSuccess(url),
  });
}
