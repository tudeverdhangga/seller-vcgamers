export interface ChatListParams {
  page: string;
  limit: number;
}

export interface DataChatRoom {
  id: string;
  name: string;
  icon: string;
  thumbnail_message_type: string;
  thumbnail_message: string;
  unread_count: number;
  last_message_date: string;
}

export interface ChatMessageParam {
  page: string;
  limit: number;
}

export interface DataChatMessage {
  id: string;
  message: string;
  type: "TEXT" | "IMAGE" | "TRANSACTION" | "VIDEO" | "PRODUCT";
  sent_at: string;
  sender_id: string;
  is_read: boolean;
  attachment?: string;
  attachment_url?: string;
  product?: {
    name: string;
    price: number;
    slug: string;
    image: string;
  };
  transaction?: { code: string; status: string; thumbnail: string };
}

export interface BodyChatReadMessage {
  room_id: string;
  requester: string;
}

export interface BodyChatSendMessage {
  type: string;
  attachment?: string;
  attachment_url?: string;
  message: string;
  room_id: string;
  receiver: string;
  requester: string;
  product_id?: string;
  transaction_id?: string;
}

export interface DataChatSendMessage {
  room: DataChatSendMessageRoom;
  message: DataChatSendMessageMessage;
}

export interface DataChatSendMessageRoom {
  id: string;
}

export interface DataChatSendMessageMessage {
  id: string;
  sent_at: string;
}

export interface DataChatRoomDetail {
  id?: string;
  name?: string;
  last_message_id?: string;
  icon?: string;
  buyer?: {
    id?: string;
  };
}
