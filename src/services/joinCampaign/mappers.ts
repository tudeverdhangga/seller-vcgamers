import dayjs from "dayjs";
import type {
  Campaign,
  CampaignHistory,
  CampaignHistoryType,
  CampaignType,
  DataCampaign,
  DataCampaignHistory,
} from "./types";

export function mapToCampaign(data: DataCampaign): Campaign {
  const date_start = dayjs(data.date_start).format("DD MMM YYYY");
  const date_end = dayjs(data.date_end).format("DD MMM YYYY");
  const join_before_date = dayjs(data.join_before_date).format("DD MMM YYYY");
  const is_expired = dayjs() > dayjs(data.date_end);

  return {
    ...data,
    date_start,
    date_end,
    is_expired,
    deadline: `Gabung sebelum ${join_before_date}`,
    status: data.status as CampaignType,
    period: `${date_start} - ${date_end}`,
  } satisfies Campaign;
}

export function mapToCampaignHistory(data: DataCampaignHistory) {
  const date_start = dayjs(data.date_start).format("DD MMM YYYY");
  const date_end = dayjs(data.date_end).format("DD MMM YYYY");

  return {
    ...data,
    status: data.status as CampaignHistoryType,
    period: `${date_start} - ${date_end}`,
  } satisfies CampaignHistory;
}
