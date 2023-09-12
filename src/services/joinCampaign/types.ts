export interface DataCampaign {
  id: string;
  name: string;
  date_start: string;
  date_end: string;
  image_url: string;
  status: number;
  status_name: string;
  join_before_date: string;
  has_joined: boolean;
}

export interface DataCampaignDetail {
  id: string;
  image_url: string;
  name: string;
  description: string;
  date_start: string;
  date_end: string;
  status: number;
  status_name: string;
  performance_link: string;
}

export interface Campaign extends DataCampaign {
  deadline: string;
  status: CampaignType;
  is_expired: boolean;
  period: string;
}

export interface DataCampaignHistory {
  id: string;
  name: string;
  date_start: string;
  date_end: string;
  status: number;
  status_name: string;
  approved_date: string;
  can_request_cancel_date: string;
  can_request_cancel: boolean;
}

export interface CampaignHistory extends DataCampaignHistory {
  status: CampaignHistoryType;
  period: string;
}

export interface DataCampaignRejectedDetail {
  rejected_date: string;
  rejected_reason: string;
}

export interface CampaignListParam {
  search?: string;
  limit?: number;
  next_cursor?: string;
  prev_cursor?: string;
  only_active?: string;
}

export type HistoryCampaignListParam = CampaignListParam & {
  status?: number;
};

// 1 - Akan Berjalan
// 2 - Active
// 3 - Berakhir
export type CampaignType = 1 | 2 | 3;

// 1 - Menunggu persetujuan
// 2 - Disetujui
// 3 - Sedang berlangsung
// 4 - Berakhir
// 5 - Permintaan Pembatalan
// 6 - Dibatalkan
// 7 - Ditolak
export type CampaignHistoryType = 1 | 2 | 3 | 4 | 5 | 6 | 7;
