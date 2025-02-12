import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastOption } from "~/utils/toast";
import { paginationNextPageParam } from "../utils";
import {
  fetchTabStatus,
  fetchPromoList,
  deactivatePromo,
  deletePromo,
  fetchPromoDetail,
  createPromo,
  fetchPromoPerformance,
  checkCodeAvailability,
  fetchPromoDetailMapped,
  updatePromo,
} from "./api";
import { queryTypes, useQueryState } from "next-usequerystate";
import { queryClient } from "../http";
import { axiosErrorMapper } from "~/utils/mapper";
import { handleError } from "./mapper";

export function useGetTabStatus() {
  return useQuery({
    queryKey: ["manage-promo-tab"],
    queryFn: fetchTabStatus,
  });
}

export function useGetPromoList() {
  const [status] = useQueryState("status", queryTypes.integer.withDefault(3));
  const [search] = useQueryState("search", queryTypes.string.withDefault(""));

  return useInfiniteQuery({
    queryKey: ["manage-promo-list", status, search],
    queryFn: ({ pageParam }) =>
      fetchPromoList({
        search,
        limit: 10,
        next_cursor: pageParam as string,
        status,
      }),
    getNextPageParam: paginationNextPageParam,
  });
}

export function useGetPromoDetail(
  promo_id: string | undefined,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["manage-promo-detail", promo_id],
    queryFn: () => fetchPromoDetail(promo_id ?? ""),
    enabled: typeof promo_id !== "undefined" && enabled,
  });
}

export function useGetPromoDetailMapped(
  promo_id: string | undefined,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["manage-promo-detail-mapped", promo_id],
    queryFn: () => fetchPromoDetailMapped(promo_id ?? ""),
    enabled: typeof promo_id !== "undefined" && enabled,
  });
}

export function useGetPromoPerformance(
  promo_id: string | undefined,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["manage-promo-performance", promo_id],
    queryFn: () => fetchPromoPerformance(promo_id ?? ""),
    enabled: typeof promo_id !== "undefined" && enabled,
  });
}

export function useDeactivatePromo() {
  const [status] = useQueryState("status", queryTypes.integer.withDefault(3));
  const [search] = useQueryState("search", queryTypes.string.withDefault(""));

  return useMutation({
    mutationFn: deactivatePromo,
    onError(error) {
      const message = axiosErrorMapper(error);
      toast.error(message, toastOption);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["manage-promo-tab"] });

      void queryClient.invalidateQueries({
        queryKey: ["manage-promo-list", status, search],
      });
    },
  });
}

export function useDeletePromo() {
  const [status] = useQueryState("status", queryTypes.integer.withDefault(3));
  const [search] = useQueryState("search", queryTypes.string.withDefault(""));

  return useMutation({
    mutationFn: deletePromo,
    onError(error) {
      const message = axiosErrorMapper(error);
      toast.error(message, toastOption);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["manage-promo-tab"] });

      void queryClient.invalidateQueries({
        queryKey: ["manage-promo-list", status, search],
      });
    },
  });
}

export function useCheckPromoCode() {
  return useMutation({
    mutationFn: checkCodeAvailability,
  });
}

export function useCreatePromo() {
  const [status] = useQueryState("status", queryTypes.integer.withDefault(3));
  const [search] = useQueryState("search", queryTypes.string.withDefault(""));

  return useMutation({
    mutationFn: createPromo,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["manage-promo-list", status, search],
      });
    },
    onError(error) {
      handleError(error);
    },
  });
}

export function useUpdatePromo() {
  const [status] = useQueryState("status", queryTypes.integer.withDefault(3));
  const [search] = useQueryState("search", queryTypes.string.withDefault(""));

  return useMutation({
    mutationFn: updatePromo,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["manage-promo-list", status, search],
      });
    },
    onError(error) {
      handleError(error);
    },
  });
}
