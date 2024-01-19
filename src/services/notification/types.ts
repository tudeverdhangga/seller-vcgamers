export interface DataNotification {
  id: string;
  title: string;
  description: string;
  author: string;
  clickable_id: string;
  transaction_id: string;
  clickable_type:
    | "Chat"
    | "Transaction"
    | "Instant_kilat"
    | "Moderation"
    | "Topup"
    | "Withdraw"
    | "Update"
    | "Review";
  icon: string;
  is_clickable: boolean;
  date: string;
  desc_date: string;
  flag: string;
  type: string;
  marker: string;
  is_read: boolean;
}

export interface DataNotificationCount {
  flag: string;
  count: number;
}

export interface NotificationListParam {
  flag?: string;
  type?: string;
  page: string;
  limit: number;
}

export interface BodyNotificationRead {
  flag: string;
  notification_id: string;
}
