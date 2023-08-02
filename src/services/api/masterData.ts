import { useQuery } from "@tanstack/react-query"
import { HTTP } from "../http"

interface ResponseCategory {
  code: number
  status: string
  data: DataCategory[]
  message: string
}
interface DataCategory {
  id: string
  name: string
  slug: string
  is_active: boolean
  is_kilat: boolean
  is_instant: boolean
}

interface ResponseBrands {
  code: number
  status: string
  data: DataBrands[]
  message: string
}
interface DataBrands {
  id: string
  type: string
  name: string
  slug: string
  description: string
  is_active: boolean
}

interface ResponseFeatures {
  code: number
  status: string
  data: DataFeatures[]
  message: string
}
interface DataFeatures {
  name: string
  value: string
}

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await HTTP.get("/product/categories")
      return res.data as ResponseCategory
    }
  })
}

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await HTTP.get("/product/brands")
      return res.data as ResponseBrands
    }
  })
}

export const useGetFeature = () => {
  return useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const res = await HTTP.get("/product/options/features")
      return res.data as ResponseFeatures
    }
  })
}

export const useGetProductStatus = () => {
  return useQuery({
    queryKey: ["product-status"],
    queryFn: async () => {
      const res = await HTTP.get("/product/options/tabs")
      return res.data as ResponseFeatures
    }
  })
}