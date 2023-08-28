import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllCampaign,
  fetchCampaignRejectedDetail,
  fetchHistoryCampaign,
  fetchHistoryCampaignTabStatus,
  joinCampaign,
  requestCancelCampaign,
} from "./api";
import { paginationNextPageParam } from "../utils";
import { queryTypes, useQueryState } from "next-usequerystate";
import { queryClient } from "../http";

export function useGetAllCampaign() {
  const [active] = useQueryState("active");

  return useInfiniteQuery({
    queryKey: ["campaign", active],
    queryFn: ({ pageParam }) =>
      fetchAllCampaign({
        limit: 10,
        next_cursor: pageParam as string,
        only_active: active ?? "false",
      }),
    getNextPageParam: paginationNextPageParam,
  });
}

export function useGetHistoryCampaignTabStatus() {
  return useQuery({
    queryKey: ["campaign-history-tab"],
    queryFn: fetchHistoryCampaignTabStatus,
  });
}

export function useGetHistoryCampaign() {
  const [status] = useQueryState("status", queryTypes.integer.withDefault(1));
  const [search] = useQueryState("search", queryTypes.string.withDefault(""));

  return useInfiniteQuery({
    queryKey: ["campaign-history", status, search],
    queryFn: ({ pageParam }) =>
      fetchHistoryCampaign({
        search,
        limit: 10,
        next_cursor: pageParam as string,
        status,
      }),
    getNextPageParam: paginationNextPageParam,
  });
}

export function useGetCampaignRejectedDetail(campaign_id: string | undefined) {
  return useQuery({
    queryKey: ["campaign-rejected-detail", campaign_id],
    queryFn: () => fetchCampaignRejectedDetail(campaign_id ?? ""),
    enabled: typeof campaign_id !== "undefined",
  });
}

export function useJoinCampaign() {
  return useMutation({
    mutationFn: joinCampaign,
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: ["campaign"] });
    },
  });
}

export function useRequestCancelCampaign() {
  const [status] = useQueryState("status", queryTypes.integer.withDefault(1));
  const [search] = useQueryState("search", queryTypes.string.withDefault(""));
  return useMutation({
    mutationFn: requestCancelCampaign,
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: ["campaign-history", status, search],
      });
    },
  });
}
