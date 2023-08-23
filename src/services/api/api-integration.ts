import { useMutation, useQuery } from "@tanstack/react-query"
import { HTTP } from "../http"

interface ResponseIPWhitelist {
  code: number
  status: string
  data: DataIPWhitelist
  message: string
}
export interface DataIPWhitelist {
  ip_whitelist: string
}

interface ResponseCallbackWebhook {
  code: number
  status: string
  data: DataCallbackWebhook
  message: string
}
export interface DataCallbackWebhook {
  callback_url: string,
  callback_type_withdraw: boolean,
  callback_type_notification: boolean,
  callback_type_promo: boolean,
  callback_type_transaction: boolean,
  callback_type_product_stock: boolean,
  callback_type_campaign: boolean,
  callback_type_feature_request: boolean
}

interface ResponseApiAccess {
  code: number
  status: string
  data: DataApiAccess
  message: string
}
export interface DataApiAccess {
  secret_key: string,
  can_generate_access_key: boolean,
  access_keys: Array<AccessKeyApiAccess>
}
export interface AccessKeyApiAccess {
  id: string,
  access_key: string
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

interface ErrorFormatResponse {
  field: string,
  tag: string,
  param: string,
  message: string
}

interface ResponseAPIFeature {
  code: number;
  status: string;
  data: any;
  message: string;
}

interface ResponseAPIGeneratedAccessKey {
  code: number;
  status: string;
  data: GeneratedAccessKeyResponse;
  message: string;
}
export interface GeneratedAccessKeyResponse {
  access_key: string
}

export interface BodyPayloadIPWhitelist {
  ip_list: string,
}

export interface BodyPayloadWebhookConfig {
  callback_url: string,
  callback_type_withdraw: boolean,
  callback_type_notification: boolean,
  callback_type_promo: boolean,
  callback_type_transaction: boolean,
  callback_type_product_stock: boolean,
  callback_type_campaign: boolean,
  callback_type_feature_request: boolean
}

export type SeverityType = 'success' | 'info' | 'warning' | 'error';

export const PrintErrorMessages = (errorData: ErrorFormatResponse[]) => {
  let msg = ""
  errorData.map((val) => {
    msg += `${val.field}: ${val.message}. `
  })
  return msg
}

export const useGetIPWhitelist = () => {
  return useQuery({
    queryKey: ['ip-whitelist'],
    queryFn: async () => {
      const res = await HTTP.get('/vip/api/ip-whitelist')
      return res.data as ResponseIPWhitelist
    }
  })
}

export const usePostIPWhitelist = () => {
  return useMutation({
    mutationKey: ['request-ip-whitelist'],
    mutationFn: async (jsonData: BodyPayloadIPWhitelist) => {
      const res = await HTTP.post("/vip/api/ip-whitelist", jsonData)
      return res.data as ResponseAPIFeature
    }
  })
}

export const useGetWebhookConfig = () => {
  return useQuery({
    queryKey: ['webhook-config'],
    queryFn: async () => {
      const res = await HTTP.get('/vip/api/webhook-config')
      return res.data as ResponseCallbackWebhook
    }
  })
}

export const usePostWebhookConfig = () => {
  return useMutation({
    mutationKey: ['webhook-config'],
    mutationFn: async (jsonData: BodyPayloadWebhookConfig) => {
      const res = await HTTP.post("/vip/api/webhook-config", jsonData)
      return res.data as ResponseAPIFeature
    }
  })
}

export const useGetApiAccess = () => {
  return useQuery({
    queryKey: ['api-access'],
    queryFn: async () => {
      const res = await HTTP.get('/vip/api/api-access')
      return res.data as ResponseApiAccess
    }
  })
}

export const useGenerateAccessKey = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await HTTP.post("/vip/api/generate-access")
      return res.data as ResponseAPIGeneratedAccessKey
    }
  })
}

export const useDeleteAccessKey = (params: string) => {
  return useMutation({
    mutationFn: async () => {
      const res = await HTTP.delete(`/vip/api/access?${params}`);
      return res.data as ResponseApiAccess;
    }
  })
}
