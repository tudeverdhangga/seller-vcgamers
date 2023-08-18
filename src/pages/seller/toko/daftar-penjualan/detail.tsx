import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { useTranslation } from "next-i18next";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useRouter } from "next/router";

import VGPageTitle from "~/components/atomic/VGPageTitle";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import { useResponsive } from "~/utils/mediaQuery";
import TransactionDetailHeadingDesktop from "~/components/molecule/TransactionDetailHeading/desktop";
import TransactionDetailHeadingMobile from "~/components/molecule/TransactionDetailHeading/mobile";
import TransactionDetail from "~/components/organism/TransactionDetail";
import TransactionDetailSummary from "~/components/molecule/TransactionDetailSummary";
import TransactionDetailStatus from "~/components/molecule/TransactionDetailStatus";
import queryString from "query-string";
import { useGetDetailTransaction } from "~/services/api/transaction";
import { fullDateFormat } from "~/utils/format";

interface Summary {
  sub_total: number
  service_fee: number
  promo: number
  grand_total: number
}
interface History {
  description: string
  description_text: string
  code: string
  timestamp: string
  status: number
}

export default function DetailPenjualanPage() {
  const { t } = useTranslation("transaction");
  const { isMobile } = useResponsive();
  const router = useRouter();
  const [id, setId] = useState("");
  const transaction = useGetDetailTransaction(queryString.stringify({ transaction_id: id }))

  useEffect(() => {
    if (typeof router.query.transaction_id === 'string') {
      setId(router.query.transaction_id)
    }
  }, [router.query.transaction_id])

  const moveToList = () => {
    void router.push("/seller/toko/daftar-penjualan")
  }
  const refetchTransactionDetail = () => {
    void transaction.refetch()
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
                color: "common.shade.200",
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
                buyer={transaction?.data?.data?.member?.name || ""}
                code={transaction?.data?.data?.code || ""}
                date={fullDateFormat(transaction?.data?.data?.order_date || "")}
                isLoading={transaction.isLoading}
              />
            </>
          )
          : (
            <>
              <TransactionDetailHeadingDesktop
                buyer={transaction?.data?.data?.member?.name || ""}
                code={transaction?.data?.data?.code || ""}
                date={fullDateFormat(transaction?.data?.data?.order_date || "")}
                isLoading={transaction.isLoading}
              />
            </>
          )
      }
      <TransactionDetail
        list={transaction.data?.data.items as []}
        isLoading={transaction.isLoading}
        refetch={refetchTransactionDetail}
      />
      <TransactionDetailSummary
        summary={transaction?.data?.data?.summary as Summary}
      />
      <TransactionDetailStatus
        status={transaction?.data?.data?.histories as History[]}
        isLoading={transaction.isLoading}
      />
    </>
  )
}

export const getStaticProps = getStaticPropsWithTransNamespace(["transaction"]);
