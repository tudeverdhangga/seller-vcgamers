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
interface ProductVariationMaster {
  value: string
  label: string
}
interface ResponseProductDetail {
  code: number
  status: string
  data: Data
  message: string
}
interface Data {
  id: string
  product_category: ProductCategory
  product_brand: ProductBrand
  product_group: ProductGroup
  name: string
  slug: string
  description: string
  images_url: ImagesUrl[]
  is_active: boolean
  created_at: string
  updated_at: string
  variations: Variation[]
}
interface ProductCategory {
  value: string
  label: string
}
interface ProductBrand {
  value: string
  label: string
}
interface ProductGroup {
  value: string
  label: string
}
interface ImagesUrl {
  object_key: string
  object_url: string
}
interface Variation {
  id: string
  product_variation_master: ProductVariationMaster
  slug: string
  code: string
  name: string
  price: number
  discount: number
  final_price: number
  rating: number
  is_custom_image: boolean
  images_url: ImagesUrl[]
  stock: number
  sold: number
  total_visited: number
  total_wishlist: number
  sla_second: number
  max_sla_second: number
  sold_total: number
  is_active: boolean
  is_featured: boolean
  is_kilat: boolean
  is_instant: boolean
  is_host_active: boolean
  is_preorder: boolean
  is_new_item: boolean
  min_order: number
  success_rate: number
  delivery_type: number
  created_at: string
  updated_at: string
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

export const useGetProductDetail = () => {
  return useMutation({
    mutationKey: ["product-detail"],
    mutationFn: async (params: string) => {
      const res = await HTTP.get(`/product/product/detail?${params}`);
      return res.data as ResponseProductDetail;
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
    mutationFn: async (stock: number) => {
      const res = await HTTP.put(`/product/product/update-stock?${params}`, { stock });
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

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (payload: object) => {
      const res = await HTTP.post("/product/product/create", payload);
      return res.data as ResponseProduct;
    }
  })
}

export const useEditProduct = (params: string) => {
  return useMutation({
    mutationKey: ["edit-product", params],
    mutationFn: async (payload: object) => {
      const res = await HTTP.put(`/product/product/update?${params}`, payload);
      return res.data as ResponseProduct;
    }
  })
}