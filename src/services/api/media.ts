import { useMutation } from "@tanstack/react-query";
import { HTTPUpload } from "../http";

interface Response {
  code: number;
  status: string;
  data: {
    object_key: string;
    object_url: string;
  };
  message: string;
}

export const useMediaUpload = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await HTTPUpload.post("/media-upload", formData);

      return res.data as Response;
    },
  });
};

export const useFileUpload = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await HTTPUpload.post("/file-upload", formData);

      return res.data as Response;
    },
  });
};
