import { useMutation, useQuery } from "@tanstack/react-query";
import { HTTP } from "../http";

interface ResponseCategory {
  code: number;
  status: string;
  data: DataCategory[];
  message: string;
}
interface DataCategory {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  is_kilat: boolean;
  is_instant: boolean;
  is_voucher: boolean;
}

interface ResponseBrands {
  code: number;
  status: string;
  data: DataBrands[];
  message: string;
}
interface DataBrands {
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
}

interface ResponseFeatures {
  code: number;
  status: string;
  data: DataFeatures[];
  message: string;
}
interface DataFeatures {
  name: string;
  value: string;
}

interface ResponseGroups {
  code: number;
  status: string;
  data: DataGroups[];
  message: string;
}

interface DataGroups {
  id: string;
  name: string;
  is_active: boolean;
}

interface ResponseVariations {
  code: number;
  status: string;
  data: DataVariations[];
  message: string;
}

interface DataVariations {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
}

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await HTTP.get("/product/categories");
      return res.data as ResponseCategory;
    },
  });
};

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await HTTP.get("/product/brands");
      return res.data as ResponseBrands;
    },
  });
};

export const useGetBrandByCategory = () => {
  return useMutation({
    mutationKey: ["brands"],
    mutationFn: async (params: string) => {
      const res = await HTTP.get(`/product/brands?${params}`);
      return res.data as ResponseBrands;
    },
  });
};

export const useGetBrandsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["brands", categoryId],
    queryFn: async () => {
      const res = await HTTP.get("/product/brands", {
        params: { category_id: categoryId },
      });
      return res.data as ResponseBrands;
    },
    enabled: categoryId !== "",
  });
};

export const useGetGroup = () => {
  return useMutation({
    mutationKey: ["groups"],
    mutationFn: async (params: string) => {
      const res = await HTTP.get(`/product/groups?${params}`);
      return res.data as ResponseGroups;
    },
  });
};

export const useGetFeature = () => {
  return useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const res = await HTTP.get("/product/options/features");
      return res.data as ResponseFeatures;
    },
  });
};

export const useGetProductStatus = () => {
  return useQuery({
    queryKey: ["product-status"],
    queryFn: async () => {
      const res = await HTTP.get("/product/options/tabs");
      return res.data as ResponseFeatures;
    },
  });
};

export const useGetVariationMaster = () => {
  return useMutation({
    mutationKey: ["variation-master"],
    mutationFn: async (params: string) => {
      const res = await HTTP.get(`/product/variation-master?${params}`);
      return res.data as ResponseVariations;
    },
  });
};
