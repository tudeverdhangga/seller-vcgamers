import { z } from "zod";

export interface ModerationListParams {
  as: "buyer" | "seller";
  page: string;
  limit: number;
  status: string | null;
}

export interface DataModerationList {
  id: string;
  name: string;
  date: string;
  reason: string;
  is_read: boolean;
  transaction: DataModerationListTransaction;
}

export interface DataModerationListTransaction {
  code: string;
  transaction_code: string;
  product: DataModerationListProduct;
}

export interface DataModerationListProduct {
  name: string;
  image: string;
  price: number;
}

export interface DataModerationDetail {
  id: string;
  name: string;
  status: string;
  date: string;
  reason: string;
  admin_invited: boolean;
  transaction: DataModerationListTransaction;
  participants: DataModerationDetailParticipant[];
}

export interface DataModerationDetailParticipant {
  name: string;
  type: string;
  photo: string;
}

export interface DataModerationMessage {
  id: string;
  message: string;
  type: "TEXT";
  sent_at: string;
  sender_id: string;
  is_read: boolean;
  is_important: boolean;
  is_admin: boolean;
  attachment?: string;
  sender_type: string;
}

export const sendMessageSchema = z.object({
  id: z.string().min(1),
  attachment: z.string().optional(),
  message: z.string().min(1),
});

export type BodySendMessage = z.infer<typeof sendMessageSchema>;

export interface BodyModeration {
  moderation_id: string;
}

export type SideProps =
  | {
      side: "left" | "admin";
    }
  | {
      side: "right";
      status: "sent" | "sending" | "failed";
    };

export type TextProps = {
  id: string;
  type: "TEXT";
  content: string;
  time: string;
};

export type ProductProps = {
  type: "PRODUCT";
  content: {
    img: string;
    title: string;
    price: string;
    rating: string;
    sold: string;
  };
};

export type TransactionProps = {
  type: "TRANSACTION";
  content: {
    status: string;
    code: string;
    transaction_code: string;
    image: string;
  };
};

export type AttachmentProps = {
  id: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT";
  content: string;
  time: string;
};

export type InfoProps = {
  id: string;
  type: "INFO";
  content: string;
};

export type ChatMessageProps =
  | InfoProps
  | ((TextProps | AttachmentProps | ProductProps | TransactionProps) &
      SideProps);
