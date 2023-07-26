import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { useTranslation } from "next-i18next";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useRouter } from "next/router";

import VGPageTitle from "~/components/atomic/VGPageTitle";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import { transactions } from "~/utils/dummy/transactions";
import { useResponsive } from "~/utils/mediaQuery";
import TransactionDetailHeadingDesktop from "~/components/molecule/TransactionDetailHeading/desktop";
import TransactionDetailHeadingMobile from "~/components/molecule/TransactionDetailHeading/mobile";
import TransactionDetail from "~/components/organism/TransactionDetail";
import TransactionDetailSummary from "~/components/molecule/TransactionDetailSummary";
import TransactionDetailStatus from "~/components/molecule/TransactionDetailStatus";

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

interface StatusItem {
  time: string;
  status: string;
  date: string;
  productName?: string;
  code: string;
}

interface TransactionDetail {
  code: string;
  date: string;
  productName: string;
  customerName: string;
  feature: string;
  image: string;
  price: number;
  qty: number;
  list: ListItem[];
  status: StatusItem[];
}

export default function DetailPenjualanPage() {
  const { t } = useTranslation("transaction");
  const { isMobile } = useResponsive();
  const router = useRouter();
  const [id, setId] = useState<number>(0);
  const transaction = transactions[id] as TransactionDetail;
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setId(parseInt(router.query.id as string))
    setPrice(transaction.list.reduce((price, current) => price + current.price, 0))
  }, [router.query.id, transaction.list])

  const moveToList = () => {
    void router.push("/seller/toko/daftar-penjualan")
  }

  return (
    <>
      <VGPageTitle
        subTitle={(
          <>
            <Link
              underline="hover"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                color:"common.shade.200",
                cursor: "pointer"
              }}
              onClick={moveToList}
            >
              <ArrowBackIcon
                fontSize="small"
                sx={{ mr: 1 }}
              />
              {t("detail.subTitle")}
            </Link>
          </>
        )}
        title={t("detail.title")}
        sx={{ width: "100%" }}
      />
      {
        isMobile
          ? (
            <>
              <TransactionDetailHeadingMobile
                buyer={transaction?.customerName}
                code={transaction?.code}
                date={transaction?.date}
              />
            </>
          )
          : (
            <>
              <TransactionDetailHeadingDesktop
                buyer={transaction?.customerName}
                code={transaction?.code}
                date={transaction?.date}
              />
            </>
          )
      }
      <TransactionDetail list={transaction.list} />
      <TransactionDetailSummary price={price} />
      <TransactionDetailStatus status={transaction?.status} />
    </>
  )
}

export const getStaticProps = getStaticPropsWithTransNamespace(["transaction"]);
