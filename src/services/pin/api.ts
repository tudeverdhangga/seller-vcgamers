import type { APIResponse } from "../types";
import { HTTPApi } from "../http";
import type { BodyValidatePin, DataPreValidatePin } from "./types";

export async function preValidatePin() {
  const res = await HTTPApi.get("user/profile");

  return res.data as APIResponse<DataPreValidatePin>;
}

export async function postValidatePin(body: BodyValidatePin) {
  const res = await HTTPApi.post("user/validate-pin", body);

  return res.data as APIResponse<boolean>;
}
