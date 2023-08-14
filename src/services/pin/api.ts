import type { APIResponse } from "../types";
import { HTTPApi } from "../http";
import { type BodyValidatePin } from "./types";

export async function postValidatePin(body: BodyValidatePin) {
  const res = await HTTPApi.post("user/validate-pin", body);

  return res.data as APIResponse<boolean>;
}
