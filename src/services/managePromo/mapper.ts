import type { Promo, DataPromo } from "./types";

export function mapPromo(data: DataPromo) {
  const status = [
    "",
    "waiting-approval",
    "accepted",
    "in-progress",
    "disabled",
    "completed",
    "rejected",
  ] as const;

  return { ...data, status_name: status.at(data.status) ?? "" } satisfies Promo;
}
