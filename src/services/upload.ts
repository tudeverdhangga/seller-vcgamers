import { HTTPApi } from "./http";
import type { APIApiResponse } from "./types";

export async function uploadFile(body: BodyUploadFile) {
  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("module", body.module);

  const res = await HTTPApi.post("storage/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data as APIApiResponse<DataUploadFile>;
}

export interface BodyUploadFile {
  file: File;
  module: "moderation" | "chat";
}

export interface DataUploadFile {
  url: string;
  key: string;
}
