import { useMutation, useQuery } from "@tanstack/react-query"
import { HTTP } from "../http"

interface ResponseInstant {
  code: number
  status: string
  data: DataInstant
  message: string
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
export interface DataInstant {
  total_transaction: number
  total_success_transaction: number
  total_rate_transaction: number
  seller_has_instant: boolean
  request_status: string
  request_date: Date | null
  approved_date: Date | null
  reject_date: Date | null
  reject_reason: string
}

interface ResponseKilat {
  code: number
  status: string
  data: DataKilat
  message: string
}
export interface DataKilat {
  total_transaction: number
  total_success_transaction: number
  total_rate_transaction: number
  seller_has_kilat: boolean
  request_status: string
  request_date: Date | null
  approved_date: Date | null
  reject_date: Date | null
  reject_reason: string
}

interface ResponseRequestFeaure {
  code: number;
  status: string;
  data: any;
  message: string;
}

export type SeverityType = 'success' | 'info' | 'warning' | 'error';

export const useGetStatusInstant = () => {
  return useQuery({
    queryKey: ['status-instant'],
    queryFn: async () => {
      const res = await HTTP.get('/status-instant')
      return res.data as ResponseInstant
    }
  })
}

export const useGetStatusKilat = () => {
  return useQuery({
    queryKey: ['status-kilat'],
    queryFn: async () => {
      const res = await HTTP.get('/status-kilat')
      return res.data as ResponseKilat
    }
  })
}

export const useRequestKilat = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await HTTP.post("/request-kilat")
      return res.data as ResponseRequestFeaure
    }
  })
}

export const useRequestInstant = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await HTTP.post("/request-instant")
      return res.data as ResponseRequestFeaure
    }
  })
}