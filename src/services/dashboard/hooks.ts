import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchDashboardGraphSuccess,
  fetchDashboardProductStat,
  fetchDashboardSellerPerformance,
  fetchDashboardTotalSuccessAmount,
  fetchDashboardTotalSuccessQty,
  fetchDashboardTransactionSummary,
  sendFeedback,
} from "./api";
import type { GraphSuccessUrl } from "./types";
import { queryTypes, useQueryState } from "next-usequerystate";
import dayjs from "dayjs";

export function useGetDashboardProductStat() {
  const [periode_filter] = useQueryState(
    "periode_filter",
    queryTypes.string.withDefault(dayjs().format("YYYY-MM"))
  );

  return useQuery({
    queryKey: ["dashboard-product-stat", periode_filter],
    queryFn: () => fetchDashboardProductStat({ periode_filter }),
  });
}

export function useGetDashboardTransactionSummary() {
  const [periode_filter] = useQueryState(
    "periode_filter",
    queryTypes.string.withDefault(dayjs().format("YYYY-MM"))
  );

  return useQuery({
    queryKey: ["dashboard-transaction-summary", periode_filter],
    queryFn: () => fetchDashboardTransactionSummary({ periode_filter }),
  });
}

export function useGetDashboardTotalSuccessQty() {
  const [periode_filter] = useQueryState(
    "periode_filter",
    queryTypes.string.withDefault(dayjs().format("YYYY-MM"))
  );

  return useQuery({
    queryKey: ["dashboard-total-success-qty", periode_filter],
    queryFn: () => fetchDashboardTotalSuccessQty({ periode_filter }),
  });
}

export function useGetDashboardTotalSuccessAmount() {
  const [periode_filter] = useQueryState(
    "periode_filter",
    queryTypes.string.withDefault(dayjs().format("YYYY-MM"))
  );

  return useQuery({
    queryKey: ["dashboard-total-success-amount", periode_filter],
    queryFn: () => fetchDashboardTotalSuccessAmount({ periode_filter }),
  });
}

export function useGetDashboardSellerPerformance() {
  const [periode_filter] = useQueryState(
    "periode_filter",
    queryTypes.string.withDefault(dayjs().format("YYYY-MM"))
  );

  return useQuery({
    queryKey: ["dashboard-seller-performance", periode_filter],
    queryFn: () => fetchDashboardSellerPerformance({ periode_filter }),
  });
}

export function useGetDashboardGraphSuccess(url: GraphSuccessUrl) {
  const [periode_filter] = useQueryState(
    "periode_filter",
    queryTypes.string.withDefault(dayjs().format("YYYY-MM"))
  );

  return useQuery({
    queryKey: [`dashboard-graph-success-${url}`, periode_filter],
    queryFn: () => fetchDashboardGraphSuccess(url, { periode_filter }),
  });
}

export function useSendFeedback() {
  return useMutation({
    mutationFn: sendFeedback,
  });
}
