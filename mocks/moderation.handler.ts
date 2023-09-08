import { rest } from "msw";
import { env } from "~/env.mjs";

const getModerationList = rest.get(
  env.NEXT_PUBLIC_API_URL + "/moderation/list",
  (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "3") {
      return res(
        ctx.json({
          code: 200,
          status: "success",
          data: [],
          paginate: {
            page: parseInt(req.url.searchParams.get("page") as string, 10),
            limit: parseInt(req.url.searchParams.get("limit") as string, 10),
            total: 0,
          },
        })
      );
    }

    const data = (i: number) => ({
      id: "85a37fde-6ead-479c-a735-beb284f71e6f",
      name: `Store - ${i}`,
      date: "2023-08-01 21:04:24",
      reason: "Kode voucher tidak bisa di redeem gan",
      is_read: true,
      transaction: {
        code: "TRX-1690896992-63882E11-0530af7f",
        transaction_code: "TRX-1690896992-63882E11-0530af7f",
        product: {
          name: `Product - G${i}`,
          price: 10000,
        },
      },
    });

    return res(
      ctx.json({
        code: 200,
        status: "success",
        data: Array.from({ length: 25 }, (_, i) => data(i)),
        paginate: {
          page: parseInt(req.url.searchParams.get("page") as string, 10),
          limit: parseInt(req.url.searchParams.get("limit") as string, 10),
          total: 25,
        },
      })
    );
  }
);

const getModerationDetail = rest.get(
  env.NEXT_PUBLIC_API_URL + "/moderation/:moderationId",
  (req, res, ctx) => {
    return res(
      ctx.json({
        code: 200,
        status: "success",
        data: {
          id: req.params["moderationId"],
          name: "",
          status: "1", // 1 => process, 2 => closed
          date: "2023-08-01 21:04:24",
          reason: "Kode voucher tidak bisa di redeem gan",
          is_read: true,
          transaction: {
            code: "TRX-1690896992-63882E11-0530af7f",
            transaction_code: "TRX-1690896992-63882E11-0530af7f",
            product: {
              name: "Product - G1",
              price: 10000,
            },
          },
          participants: [
            {
              name: "",
              type: "",
              photo: "",
            },
            {
              name: "",
              type: "",
              photo: "",
            },
          ],
        },
      })
    );
  }
);

const handlers = [getModerationList, getModerationDetail];

export default handlers;
