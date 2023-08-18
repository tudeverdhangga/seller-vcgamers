import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { HTTP, HTTPCsv } from "../http"

interface ResponseTransaction {
  code: number
  status: string
  data: DataTransactions
  message: string
}
interface DataTransactions {
  data: Transactions[]
  pagination_data: PaginationData
}
interface Transactions {
  code: string
  id: string
  is_instant: boolean
  is_kilat: boolean
  member_name: string
  notes: string
  order_date: string
  price: number
  product_image_url: string
  product_name: string
  qty: number
  status: number
  status_name: string
}
interface PaginationData {
  prev_cursor: string
  next_cursor: string
  current_records: number
}
interface ResponseDetailTransaction {
  code: number
  status: string
  data: DataDetailTransaction
  message: string
}
interface DataDetailTransaction {
  id: string
  member: Member
  code: string
  order_date: string
  histories: History[]
  items: Item[]
  summary: Summary
}
interface Member {
  id: string
  name: string
}
interface History {
  description: string
  description_text: string
  code: string
  timestamp: string
  status: number
}
interface Item {
  id: string
  code: string
  qty: number
  price: number
  service_fee: number
  status: number
  status_name: string
  image_url: string
  is_kilat: boolean
  is_instant: boolean
  brand_name: string
  product_name: string
  transaction_expired_time: string
  kilat_expired_time: string
  auto_finish_time: string
  delivery_data: string[]
  is_voucher: boolean
  is_account: boolean
  cancel_note: string
  note: string
}
interface Summary {
  sub_total: number
  service_fee: number
  promo: number
  grand_total: number
}
interface ResponseTabStatus {
  code: number
  status: string
  data: DataTabStatus[]
  message: string
}
interface DataTabStatus {
  value: string
  label: string
  counter: string
}
interface ResponseUpdateTransaction {
  code: number
  status: string
  data: string | null
  message: string
}

export const useGetTransaction = (params: string) => {
  return useInfiniteQuery<ResponseTransaction, string>({
    queryKey: ["transaction-list", params],
    queryFn: async ({ pageParam }) => {
      let nextCursor = ""
      if (typeof pageParam !== "undefined") {
        nextCursor = "&next_cursor=" + (pageParam as string);
      }
      const url = `/transaction/transaction?${params}${nextCursor}`;
      const res = await HTTP.get(url);
      return res.data as ResponseTransaction;
    },
    getNextPageParam: (currentPage) => {
      const nextCursor = currentPage.data.pagination_data.next_cursor
      const prevCursor = currentPage.data.pagination_data.prev_cursor

      return nextCursor === prevCursor ? undefined : nextCursor || ""
    }
  })
}

export const useGetDetailTransaction = (params: string) => {
  const id = params.split("=")[1]

  return useQuery({
    enabled: id !== "",
    queryKey: ["transaction-detail", params],
    queryFn: async () => {
      const res = await HTTP.get(`transaction/transaction/detail?${params}`)
      return res.data as ResponseDetailTransaction
    }
  })
}

export const useGetTransactionStatus = () => {
  return useQuery({
    queryKey: ["transaction-status"],
    queryFn: async () => {
      const res = await HTTP.get("/transaction/transaction/tabs")
      return res.data as ResponseTabStatus
    }
  })
}

export const useCancelTransaction = (params: string) => {
  return useMutation({
    mutationKey: ["cancel-transaction", params],
    mutationFn: async (payload: string) => {
      const res = await HTTP.put(`/transaction/transaction/cancel?${params}`, {cancel_note: payload})
      return res.data as ResponseUpdateTransaction
    }
  })
}

export const useProcessTransaction = (params: string) => {
  return useMutation({
    mutationKey: ["process-transaction", params],
    mutationFn: async (payload: string[]) => {      
      const res = await HTTP.put(`/transaction/transaction/process?${params}`, {delivery_data: payload})
      return res.data as ResponseUpdateTransaction
    }
  })
}

export const useDownloadReport = () => {
  return useMutation({
    mutationKey: ["process-transaction"],
    mutationFn: async (payload: string) => {
      const res = await HTTPCsv.post(`/transaction/transaction/export-csv?${payload}`, )
      return res.data as string
    }
  })
}