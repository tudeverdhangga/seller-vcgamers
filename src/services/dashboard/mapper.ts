import { priceFormat } from "~/utils/format";
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
    rating_diff: mapValueDiff(value.rating_diff, normalFormatter),
    transaction_success_rate: `${value.transaction_success_rate}%`,
    transaction_success_rate_diff: mapValueDiff(
      value.transaction_success_rate_diff,
      (value) =>
        value === 0 ? undefined : value < 0 ? `-${value}%` : `+${value}%`
    ),
    average_sla: `±${value.average_sla} menit`,
    average_sla_diff: mapValueDiff(
      value.average_sla_diff,
      (value) =>
        value === 0
          ? undefined
          : value < 0
          ? `-${value} menit`
          : `+${value} menit`,
      true
    ),
    total_visitor_diff: mapValueDiff(value.total_visitor_diff, normalFormatter),
  } satisfies SellerPerformance;
}

export function mapTotalSuccess(value: DataTotalSuccess, money?: boolean) {
  return {
    ...value,
    last_value_diff: mapValueDiff(
      value.last_value_diff,
      money ? moneyFormatter : normalFormatter
    ),
  } satisfies TotalSuccess;
}

function normalFormatter(value: number) {
  return value === 0 ? undefined : value < 0 ? `-${value}` : `+${value}`;
}

function moneyFormatter(value: number) {
  return value === 0
    ? undefined
    : value < 0
    ? `${priceFormat(value)}`
    : `+${priceFormat(value)}`;
}

export function mapValueDiff(
  value: number,
  formatter?: (value: number) => string | undefined,
  inverse?: boolean
) {
  const type =
    value === 0
      ? "equal"
      : inverse
      ? value > 0
        ? "decrease"
        : "increase"
      : value < 0
      ? "decrease"
      : "increase";

  return {
    type,
    value:
      value === 0
        ? undefined
        : typeof formatter === "undefined"
        ? value
        : formatter(value),
  } satisfies ValueDiff;
}
