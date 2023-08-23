import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queryTypes, useQueryState } from "next-usequerystate";

import {
  fetchBalanceHistories,
  fetchBalanceHistoryStatus,
  fetchBalanceInfo,
} from "./api";
import { paginationNextPageParam } from "../utils";

export function useGetBalanceInfo() {
  return useQuery({
    queryKey: ["balance-info"],
    queryFn: () => fetchBalanceInfo(),
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
    queryKey: ["balance-histories", status, dateStart, dateEnd],
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
    queryKey: ["balance-history-status"],
    queryFn: () => fetchBalanceHistoryStatus(),
  });
}
