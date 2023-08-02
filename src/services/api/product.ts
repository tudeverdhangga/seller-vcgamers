import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { HTTP } from "../http"

interface ResponseProduct {
  code: number
  status: string
  data: Data
  message: string
}
interface Data {
  data: Item[]
  pagination_data: PaginationData
}
interface Item {
  final_price: number
  id: string
  image_url: string
  is_active: boolean
  is_instant: boolean
  is_kilat: boolean
  is_kilat_switchable: boolean
  next_update_price: string
  next_activate_kilat: string
  name: string
  product_id: string
  stock: number
}
interface PaginationData {
  prev_cursor: string
  next_cursor: string
  current_records: number
}

export const useGetProduct = (params: string) => {
  return useInfiniteQuery<ResponseProduct, string>({
    queryKey: ["product-list", params],
    queryFn: async ({ pageParam }) => {
      let nextCursor = ""
      if (typeof pageParam !== "undefined") {
        nextCursor = "&next_cursor=" + (pageParam as string);
      }
      const url = `/product/product/all?${params}${nextCursor}`;
      const res = await HTTP.get(url);
      return res.data as ResponseProduct;
    },
    getNextPageParam: (currentPage) => {
      const nextCursor = currentPage.data.pagination_data.next_cursor
      const prevCursor = currentPage.data.pagination_data.prev_cursor

      return nextCursor === prevCursor ? undefined : nextCursor || ""
    }
  })
}

export const useUpdatePrice = (params: string) => {
  return useMutation({
    mutationKey: ["update-price", params],
    mutationFn: async (price: number) => {
      const res = await HTTP.put(`/product/product/update-price?${params}`, { price });
      return res.data as ResponseProduct;
    }
  })
}

export const useUpdateStock = (params: string) => {
  return useMutation({
    mutationKey: ["update-stock", params],
    mutationFn: async (price: number) => {
      const res = await HTTP.put(`/product/product/update-price?${params}`, { price });
      return res.data as ResponseProduct;
    }
  })
}

export const useDeactive = (params: string) => {
  return useMutation({
    mutationKey: ["deactivate", params],
    mutationFn: async () => {
      const res = await HTTP.put(`/product/product/deactivate?${params}`);
      return res.data as ResponseProduct;
    }
  })
}

export const useActivate = (params: string) => {
  return useMutation({
    mutationKey: ["activate", params],
    mutationFn: async () => {
      const res = await HTTP.put(`/product/product/activate?${params}`);
      return res.data as ResponseProduct;
    }
  })
}

export const useDelete = (params: string) => {
  return useMutation({
    mutationKey: ["delete", params],
    mutationFn: async () => {
      const res = await HTTP.delete(`/product/product/delete?${params}`);
      return res.data as ResponseProduct;
    }
  })
}

export const useDeactiveKilat = (params: string) => {
  return useMutation({
    mutationKey: ["deactive-kilat", params],
    mutationFn: async () => {
      const res = await HTTP.put(`/product/product/kilat/deactivate?${params}`);
      return res.data as ResponseProduct;
    }
  })
}

export const useActiveKilat = (params: string) => {
  return useMutation({
    mutationKey: ["active-kilat", params],
    mutationFn: async () => {
      const res = await HTTP.put(`/product/product/kilat/activate?${params}`);
      return res.data as ResponseProduct;
    }
  })
}