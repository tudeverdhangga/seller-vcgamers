import type {
  DataSellerPerformance,
  DataTotalSuccess,
  SellerPerformance,
  TotalSuccess,
  ValueDiff,
} from "./types";

export function mapSellerPerformance(value: DataSellerPerformance) {
  return {
    ...value,
    rating_diff: mapValueDiff(value.rating_diff),
    transaction_success_rate_diff: mapValueDiff(
      value.transaction_success_rate_diff
    ),
    average_sla_diff: mapValueDiff(value.average_sla_diff),
    total_visitor_diff: mapValueDiff(value.total_visitor_diff),
  } satisfies SellerPerformance;
}

export function mapTotalSuccess(value: DataTotalSuccess) {
  return {
    ...value,
    last_value_diff: mapValueDiff(value.last_value_diff),
  } satisfies TotalSuccess;
}

export function mapValueDiff(value: number) {
  const type = value === 0 ? "equal" : value < 0 ? "decrease" : "increase";

  return {
    type,
    value: value === 0 ? undefined : value,
  } satisfies ValueDiff;
}
