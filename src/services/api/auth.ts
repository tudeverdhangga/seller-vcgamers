import { useMutation, useQuery } from "@tanstack/react-query";
import { HTTP } from "../http";

interface Response {
  code: number;
  status: string;
  data: Data;
  message: string;
}

interface Data {
  id: string;
  seller_name: string;
  seller_url: string;
  seller_photo: SellerPhoto;
  seller_cover_photo: SellerPhoto;
  seller_description: string;
  seller_address: string;
  seller_has_instant: boolean;
  seller_has_kilat: boolean;
  seller_has_vip: boolean;
  phone: string;
  email: string;
  seller_join_date: string;
  rating: number;
  total_transaction: number;
  total_success_transaction: number;
  total_failed_transaction: number;
  average_sla: number;
  total_visitor: number;
  status: number;
  seller_bank: SellerBank;
  is_closed: boolean;
  seller_can_change_name: boolean;
  operational_hours: OperationalHour[];
}

interface SellerBank {
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
}

interface OperationalHour {
  weekday: number;
  is_always_open: boolean;
  hour_start: string;
  hour_finish: string;
  is_active: boolean;
  is_today: boolean;
}

interface SellerPhoto {
  object_url: string;
  object_key: string;
}

interface ResponseCheckUrl {
  code: number;
  status: string;
  data: {
    available: boolean;
  };
  message: string;
}

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await HTTP.get("/get-profile");

      const resData = res.data as Response;

      return resData;
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (formData: FormData) => {
      const res = await HTTP.put("/update-profile", formData);
      return res.data as Response;
    },
  });
};

export const useCheckUrlAvailability = () => {
  return useMutation({
    mutationFn: async (url: string) => {
      const res = await HTTP.post("/check-url-availability", { url_slug: url });
      return res.data as ResponseCheckUrl;
    },
  });
};

export const useCheckNameAvailability = () => {
  return useMutation({
    mutationFn: async (name: string) => {
      const res = await HTTP.post("/check-name-availability", {
        seller_name: name,
      });
      return res.data as ResponseCheckUrl;
    },
  });
};

export const useUpdateOperational = () => {
  return useMutation({
    mutationKey: ["update-operational-hour"],
    mutationFn: async (formData: OperationalHour) => {
      const res = await HTTP.put("/update-operational-hour", formData);
      return res;
    },
  });
};
