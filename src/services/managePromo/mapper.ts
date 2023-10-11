import { toast } from "react-toastify";
import { toastOption } from "~/utils/toast";
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

export function handleError(error: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const message = error.response.data.message as string;

  if (message === "Validation Error") {
    toast.error("Terdapat kesalahan dalam penginputan data.", toastOption);
  } else {
    toast.error(message, toastOption);
  }
}
