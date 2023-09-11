import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";

import { useResponsive } from "~/utils/mediaQuery";
import TransactionDetailItemDesktop from "~/components/molecule/TransactionDetailItem/desktop";
import TransactionDetailItemMobile from "~/components/molecule/TransactionDetailItem/mobile";
import VGCard from "~/components/atomic/VGCard";
import Divider from "@mui/material/Divider";
import { diffDateInTime } from "~/utils/format";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

interface ListItem {
  id: string
  code: string
  qty: number
  price: number
  service_fee: number
  status: number
  status_name: string
  image_url: string
  is_kilat: boolean
  is_instant: boolean
  brand_name: string
  product_name: string
  transaction_expired_time: string
  kilat_expired_time: string
  auto_finish_time: string
  delivery_data: string[]
  is_voucher: boolean
  is_account: boolean
  cancel_note: string
  note: string
}

export default function TransactionDetail({
  list,
  isLoading,
  refetch
}: {
  list: ListItem[];
  isLoading: boolean;
  refetch: () => void;
}) {
  const { t } = useTranslation("transaction");
  const { isMobile } = useResponsive();

  return (
    <>
      <VGCard>
        <Typography
          fontSize={16}
          fontWeight={700}
          color="primary"
        >
          {t("detail.list.title")}
        </Typography>
        {
          isLoading
            ? (
              <Skeleton
                variant="rounded"
                width="100%"
                height={140}
              />
            ) : list && list.length !== 0 && (
              isMobile
                ? (
                  list.map((item, index) => (
                    <Box key={index}>
                      <Divider sx={{ mt: 3 }} />
                      <TransactionDetailItemMobile
                        id={item.id}
                        image={item.image_url}
                        code={item.code}
                        status={item.status}
                        statusName={item.status_name}
                        productName={item.product_name}
                        brandName={item.brand_name}
                        deliveryData={item.delivery_data}
                        cancelTime={diffDateInTime(item.transaction_expired_time)}
                        finishTime={diffDateInTime(item.auto_finish_time)}
                        kilatTime={item.kilat_expired_time}
                        price={item.price}
                        qty={item.qty}
                        notes={item.note}
                        cancelNote={item.cancel_note}
                        subTotal={item.price * item.qty}
                        isKilat={item.is_kilat}
                        isInstant={item.is_instant}
                        isAccount={item.is_account}
                        isVoucher={item.is_voucher}
                        refetch={refetch}
                      />
                    </Box>
                  ))
                ) : (
                  list.map((item, index) => (
                    <Box key={index}>
                      <Divider sx={{ mt: 3 }} />
                      <TransactionDetailItemDesktop
                        id={item.id}
                        image={item.image_url}
                        code={item.code}
                        status={item.status}
                        statusName={item.status_name}
                        productName={item.product_name}
                        brandName={item.brand_name}
                        deliveryData={item.delivery_data}
                        cancelTime={diffDateInTime(item.transaction_expired_time)}
                        finishTime={diffDateInTime(item.auto_finish_time)}
                        kilatTime={item.kilat_expired_time}
                        price={item.price}
                        qty={item.qty}
                        notes={item.note}
                        cancelNote={item.cancel_note}
                        subTotal={item.price * item.qty}
                        isKilat={item.is_kilat}
                        isInstant={item.is_instant}
                        isAccount={item.is_account}
                        isVoucher={item.is_voucher}
                        refetch={refetch}
                      />
                    </Box>
                  ))
                )
            )

        }
      </VGCard>
    </>
  )
}