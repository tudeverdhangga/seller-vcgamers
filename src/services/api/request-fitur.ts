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
export interface CustomErrorResponse {
  response: {
    data: ErrorCustomResponse;
  };
}
interface ErrorCustomResponse {
  code: number,
  data: any,
  status: string,
  message: string,
  validation_fields: ErrorFormatResponse[]
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

interface ResponseVIP {
  code: number
  status: string
  data: DataVIP
  message: string
}
export interface DataVIP {
  seller_has_vip: boolean
  status: string,
  request_date: string,
  reject_date: Date | null,
  reject_reason: string,
  deactivate_date: Date | null,
  deactivate_reason: string,
  approved_date: Date | null,
  requirement_text: Array<FeatureChecksType>
}
interface RequirementVIP {
  phone_verified: boolean,
  email_verified: boolean,
  account_active_for_required_time: boolean,
  bank_valid: boolean,
  minimum_order_completed: boolean,
  minimum_rating_achieved: boolean,
  minimum_sla: boolean
}

export interface MediaUploaded {
  object_url: string
  object_key: string
}

export interface FeatureChecksType {
  text: string;
  active: boolean;
}

interface ResponseRequestFeaure {
  code: number;
  status: string;
  data: any;
  message: string;
}

export interface BodyPayloadRegisterVIP {
  ktp_image_url: string,
  ktp_selfie_image_url: string,
  transaction_data_file_url: string,
  other_platform_url: string
}

interface ErrorFormatResponse {
  field: string,
  tag: string,
  param: string,
  message: string
}

export type SeverityType = 'success' | 'info' | 'warning' | 'error';

export const PrintErrorMessages = (errorData: ErrorFormatResponse[]) => {
  let msg = ""
  errorData.map((val) => {
    msg += `${val.field}: ${val.message}. `
  })
  return msg
}

export const useGetStatusVIP = () => {
  return useQuery({
    queryKey: ['status-instant'],
    queryFn: async () => {
      const res = await HTTP.get('/vip/status')
      return res.data as ResponseVIP
    }
  })
}

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

export const useRequestVIP = () => {
  return useMutation({
    mutationKey: ['update-operational-hour'],
    mutationFn: async (jsonData: BodyPayloadRegisterVIP) => {
      const res = await HTTP.post("/vip/registration", jsonData)
      return res
    }
  })
}