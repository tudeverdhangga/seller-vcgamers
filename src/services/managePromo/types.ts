import { z } from "zod";
import dayjs from "dayjs";
import { type checkCodeAvailability } from "./api";

export const promoItemSchema = z.array(
  z.object({
    category_id: z.string(),
    brand_id: z.array(z.string()),
  })
);

export const promoSchema = z.object({
  name: z.string(),
  date_start: z.date().transform((val) => dayjs(val).format("YYYY-MM-DD")),
  date_end: z.date().transform((val) => dayjs(val).format("YYYY-MM-DD")),
  promo_code: z.string(),
  stock: z.number(),
  limit_user: z.number(),
  is_percent: z.boolean().default(false),
  amount_promo: z.number().optional(),
  percent_promo: z.number().optional(),
  minimum_transaction_amount: z.number().optional(),
  maximum_discount_amount: z.number().optional(),
  items: promoItemSchema,
});

const preprocessNumber = z.preprocess(
  (val) => (val ? Number(val) : undefined),
  z.number().optional()
);

export const promoSchemaMerge = (mutateAsync: typeof checkCodeAvailability) =>
  z.object({
    stock: preprocessNumber,
    limit_user: preprocessNumber,
    amount_promo: preprocessNumber,
    percent_promo: preprocessNumber,
    minimum_transaction_amount: preprocessNumber,
    maximum_discount_amount: preprocessNumber,
    promo_code: z.string().refine(async (promo_code: string) => {
      try {
        const res = await mutateAsync({ promo_code });

        return res.data.is_available;
      } catch (error) {
        return false;
      }
    }),
  });

export type BodyPromo = z.infer<typeof promoSchema>;

export type BodyPromoItem = z.infer<typeof promoItemSchema>;

export interface BodyCheckCode {
  promo_code: string;
}

export interface DataCheckCodeAvailability {
  is_available: boolean;
}

export interface DataTabStatus {
  value: number;
  name: string;
  counter: number;
}

export interface PromoRequestParam {
  search?: string;
  limit?: number;
  next_cursor?: string;
  prev_cursor?: string;
  status?: number;
}

export interface DataPromo {
  id: string;
  name: string;
  promo_code: string;
  periode: string;
  transaction_rule: string;
  discount_rule: string;
  status: number;
  status_name: string;
  stock: number;
}

export interface Promo {
  id: string;
  name: string;
  promo_code: string;
  periode: string;
  transaction_rule: string;
  discount_rule: string;
  status: number;
  status_name: PromoType;
  stock: number;
}

export type PromoType =
  | ""
  | "waiting-approval"
  | "rejected"
  | "in-progress"
  | "completed"
  | "disabled";

export interface DataPromoDetail {
  id: string;
  name: string;
  date_start: string;
  date_end: string;
  promo_code: string;
  stock: number;
  limit_user: number;
  is_percent: boolean;
  amount_promo: number;
  percent_promo: number;
  minimum_transaction_amount: number;
  maximum_discount_amount: number;
  status: number;
  status_name: string;
  request_date: string;
  approved_date: string;
  nonactive_date: string;
  rejected_date: string;
  rejected_reason: string;
  created_at: string;
  updated_at: string;
  items: DataPromoDetailItem[];
}

export interface DataPromoDetailItem {
  category: DataPromoDetailCategory;
  brands: DataPromoDetailBrand[];
}

export interface DataPromoDetailCategory {
  value: string;
  label: string;
}

export interface DataPromoDetailBrand {
  value: string;
  label: string;
}

export interface DataPromoPerformance {
  total_usage: number;
  total_gross_amount: number;
  total_nett_amount: number;
  total_fee_amount: number;
  total_discount_amount: number;
  total_percent_comparison: number;
}
