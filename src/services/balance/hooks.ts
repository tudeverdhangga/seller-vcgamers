import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryTypes, useQueryState } from "next-usequerystate";

import {
  fetchBalanceHistories,
  fetchBalanceHistoryStatus,
  fetchBalanceInfo,
  fetchWithdrawalSummary,
  postRequestWithdrawal,
} from "./api";
import { paginationNextPageParam } from "../utils";
import { queryClient } from "../http";

export function useGetBalanceInfo() {
  return useQuery({
    queryKey: ["balance", "info"],
    queryFn: fetchBalanceInfo,
  });
}

export function useGetWithdrawalSummary(enabled: boolean) {
  return useQuery({
    queryKey: ["balance", "withdrawal-summary"],
    queryFn: fetchWithdrawalSummary,
    enabled,
  });
}

export function useGetBalanceHistories() {
  const [status] = useQueryState("status", queryTypes.string.withDefault(""));
  const [dateStart] = useQueryState(
    "date_start",
    queryTypes.string.withDefault("")
  );
  const [dateEnd] = useQueryState(
    "date_end",
    queryTypes.string.withDefault("")
  );

  return useInfiniteQuery({
    queryKey: ["balance", "history", status, dateStart, dateEnd],
    queryFn: ({ pageParam }) =>
      fetchBalanceHistories({
        status,
        dateStart,
        dateEnd,
        pageParam: pageParam as string,
      }),
    getNextPageParam: paginationNextPageParam,
  });
}

export function useGetBalanceHistoryStatus() {
  return useQuery({
    queryKey: ["balance", "history", "status"],
    queryFn: fetchBalanceHistoryStatus,
  });
}

export function useRequestWithdrawal() {
  return useMutation({
    mutationFn: postRequestWithdrawal,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
}
