import dayjs from "dayjs";
import { HTTP } from "../http";
import type { APIResponse, APIResponsePagination } from "../types";
import { mapPromo } from "./mapper";
import type {
  BodyCheckCode,
  BodyPromo,
  DataCheckCodeAvailability,
  DataPromo,
  DataPromoDetail,
  DataPromoPerformance,
  DataTabStatus,
  Promo,
  PromoRequestParam,
} from "./types";

export async function createPromo(body: BodyPromo) {
  const res = await HTTP.post("vip/promo-management/create", body);

  return res.data as APIResponse<string>;
}

export async function updatePromo({
  promo_id,
  body,
}: {
  promo_id: string;
  body: BodyPromo;
}) {
  const res = await HTTP.put("vip/promo-management/update", body, {
    params: { promo_id },
  });

  return res.data as APIResponse<string>;
}

export async function checkCodeAvailability(body: BodyCheckCode) {
  const res = await HTTP.post("vip/promo-management/check-code", body);

  return res.data as APIResponse<DataCheckCodeAvailability>;
}

export async function fetchTabStatus() {
  const res = await HTTP.get("vip/promo-management/tab-status");

  return res.data as APIResponse<DataTabStatus[]>;
}

export async function fetchPromoList(params: PromoRequestParam) {
  const res = await HTTP.get("vip/promo-management/all", { params });

  const data = res.data as APIResponsePagination<DataPromo[]>;

  return {
    ...data,
    data: { ...data.data, data: data.data.data.map(mapPromo) },
  } satisfies APIResponsePagination<Promo[]>;
}

export async function fetchPromoDetail(promo_id: string) {
  const res = await HTTP.get("vip/promo-management/detail", {
    params: { promo_id },
  });

  return res.data as APIResponse<DataPromoDetail>;
}

export async function fetchPromoDetailMapped(promo_id: string) {
  const res = await HTTP.get("vip/promo-management/detail", {
    params: { promo_id },
  });

  const resData = res.data as APIResponse<DataPromoDetail>;

  return {
    ...resData,
    data: {
      ...resData.data,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      date_start: dayjs(resData.data.date_start).toDate(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      date_end: dayjs(resData.data.date_end).toDate(),
      items: resData.data.items.map((item) => ({
        category_id: item.category.value,
        brand_id: item.brands.map((brand) => brand.value),
      })),
    },
  } satisfies APIResponse<BodyPromo>;
}

export async function fetchPromoPerformance(promo_id: string) {
  const res = await HTTP.get("vip/promo-management/performance", {
    params: { promo_id },
  });

  return res.data as APIResponse<DataPromoPerformance>;
}

export async function deactivatePromo(promo_id: string) {
  const res = await HTTP.put("vip/promo-management/deactivate", undefined, {
    params: { promo_id },
  });

  return res.data as APIResponse<DataPromoDetail | null>;
}

export async function deletePromo(promo_id: string) {
  const res = await HTTP.delete("vip/promo-management/delete", {
    params: { promo_id },
  });

  return res.data as APIResponse<null>;
}
