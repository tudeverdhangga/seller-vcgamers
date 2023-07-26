import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";

import { useResponsive } from "~/utils/mediaQuery";
import TransactionDetailItemDesktop from "~/components/molecule/TransactionDetailItem/desktop";
import TransactionDetailItemMobile from "~/components/molecule/TransactionDetailItem/mobile";
import VGCard from "~/components/atomic/VGCard";
import Divider from "@mui/material/Divider";

interface ListItem {
  image: string;
  code: string;
  status: string;
  productName: string;
  categoryName: string;
  notes?: string;
  cancelTime: string;
  price: number;
  qty: number;
  subTotal: number;
}

export default function TransactionDetail(props: { list: ListItem[] }) {
  const { t } = useTranslation("transaction");
  const { isMobile } = useResponsive();

  return (
    <>
      {
        props.list.length
          ? (
            <VGCard>
              <Typography
                fontSize={14}
                fontWeight={700}
                color="primary"
              >
                {t("detail.list.title")}
              </Typography>
              <Divider sx={{ mt: 3 }} />
              {
                isMobile
                  ? (
                    <>
                      {
                        props.list.map((item, index) => (
                          <TransactionDetailItemMobile
                            key={index}
                            image={item.image}
                            code={item.code}
                            status={item.status}
                            productName={item.productName}
                            categoryName={item.categoryName}
                            notes={item.notes}
                            cancelTime={item.cancelTime}
                            price={item.price}
                            qty={item.qty}
                            subTotal={item.subTotal}
                          />
                        ))
                      }
                    </>
                  )
                  : (
                    <>
                      {
                        props.list.map((item, index) => (
                          <TransactionDetailItemDesktop
                            key={index}
                            image={item.image}
                            code={item.code}
                            status={item.status}
                            productName={item.productName}
                            categoryName={item.categoryName}
                            notes={item.notes}
                            cancelTime={item.cancelTime}
                            price={item.price}
                            qty={item.qty}
                            subTotal={item.subTotal}
                          />
                        ))
                      }
                    </>
                  )
              }
            </VGCard>
          )
          : (
            <Typography>Empty</Typography>
          )
      }
    </>
  )
}