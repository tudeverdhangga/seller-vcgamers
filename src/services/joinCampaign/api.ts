import { HTTP } from "../http";
import type { APIResponse, APIResponsePagination, TabStatus } from "../types";
import { mapToCampaign, mapToCampaignHistory } from "./mappers";
import type {
  DataCampaign,
  CampaignListParam,
  HistoryCampaignListParam,
  DataCampaignHistory,
  DataCampaignRejectedDetail,
  DataCampaignDetail,
} from "./types";

export async function fetchAllCampaign(params: CampaignListParam) {
  const res = await HTTP.get("vip/campaign/all", { params });

  const resData = res.data as APIResponsePagination<DataCampaign[]>;

  const data = resData.data.data.map(mapToCampaign);

  return { ...resData, data: { ...resData.data, data } };
}

export async function fetchCampaignDetail(params: { campaign_id: string }) {
  const res = await HTTP.get("vip/campaign/detail", { params });

  return res.data as APIResponse<DataCampaignDetail>;
}

export async function fetchHistoryCampaignTabStatus() {
  const res = await HTTP.get("vip/campaign/history-tab-status");

  return res.data as APIResponse<TabStatus[]>;
}

export async function fetchHistoryCampaign(params: HistoryCampaignListParam) {
  const res = await HTTP.get("vip/campaign/all-history", { params });

  const resData = res.data as APIResponsePagination<DataCampaignHistory[]>;
  const data = resData.data.data.map(mapToCampaignHistory);

  return { ...resData, data: { ...resData.data, data } };
}

export async function fetchCampaignRejectedDetail(campaign_id: string) {
  const res = await HTTP.get("vip/campaign/rejected-detail", {
    params: { campaign_id },
  });

  return res.data as APIResponse<DataCampaignRejectedDetail>;
}

export async function joinCampaign(campaign_id: string) {
  const res = await HTTP.post("vip/campaign/join", undefined, {
    params: { campaign_id },
  });

  return res.data as APIResponse<null>;
}

export async function requestCancelCampaign(campaign_id: string) {
  const res = await HTTP.post("vip/campaign/request-cancel", undefined, {
    params: { campaign_id },
  });

  return res.data as APIResponse<null>;
}
