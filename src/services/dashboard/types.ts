import { z } from "zod";

export interface DataProductStat {
  total_active: number;
  total_inactive: number;
  total_stock_run_out: number;
  total_review: number;
}

export interface DataTransactionSummary {
  total_pending: number;
  total_sent: number;
  total_success: number;
  total_moderation: number;
}

export interface PeriodFilterParams {
  periode_filter?: string | null;
}

export interface DataTotalSuccess {
  current_value: number;
  last_value_diff: number;
}

export interface TotalSuccess {
  current_value: number;
  last_value_diff: ValueDiff;
}

export interface DataSellerPerformance {
  rating: number;
  rating_diff: number;
  transaction_success_rate: number;
  transaction_success_rate_diff: number;
  average_sla: number;
  average_sla_diff: number;
  total_visitor: number;
  total_visitor_diff: number;
}

export interface SellerPerformance {
  rating: number;
  rating_diff: ValueDiff;
  transaction_success_rate: string;
  transaction_success_rate_diff: ValueDiff;
  average_sla: string;
  average_sla_diff: ValueDiff;
  total_visitor: number;
  total_visitor_diff: ValueDiff;
}

export interface ValueDiff {
  type: "increase" | "decrease" | "equal";
  value?: string | number;
}

export interface DataGraphSuccess {
  label: string[];
  data: number[];
}

export type GraphSuccessUrl = "qty" | "price";

export const feedbackSchema = z.object({ message: z.string().min(1) });

export type Feedback = z.infer<typeof feedbackSchema>;
