/* eslint-disable @next/next/no-img-element */
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box"
import TagIcon from '@mui/icons-material/LocalOffer';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { useRouter } from "next/router";
import { type UseInfiniteQueryResult } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";

import VGCard from "~/components/atomic/VGCard"
import VGAlert from "~/components/atomic/VGAlert"
import { fullDateFormat, priceFormat } from "~/utils/format";
import { useResponsive } from "~/utils/mediaQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export interface ResponseTransaction {
  code: number
  status: string
  data: DataTransactions
  message: string
}
export interface DataTransactions {
  data: Transactions[]
  pagination_data: PaginationData
}
export interface Transactions {
  code: string
  id: string
  is_instant: boolean
  is_kilat: boolean
  member_name: string
  notes: string
  order_date: string
  price: number
  product_image_url: string
  product_name: string
  qty: number
  status: number
  status_name: string
}
export interface PaginationData {
  prev_cursor: string
  next_cursor: string
  current_records: number
}

export default function ListTransaction({
  transactions
}: {
  transactions: UseInfiniteQueryResult<ResponseTransaction, string>
}) {
  const { t } = useTranslation("transaction");
  const { isMobile } = useResponsive();
  const router = useRouter();
  const transactionList = transactions?.data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data.data] as Transactions[];
  }, [] as Transactions[]);
  const [status] = useState(router.query.status && "2")

  const moveToDetail = (id: string) => {
    void router.push(`/seller/toko/daftar-penjualan/detail?transaction_id=${id}`)
  }

  const emptyBadContainer = (
    <Box
      width="100%"
      textAlign="center"
      mt={6}
    >
      <Image
        src="/assets/empty-img-bad.png"
        width={300}
        height={240}
        alt="Empty Bad"
      />
      <Typography>
        {t("label.emptyBad")}
      </Typography>
    </Box>
  )
  const emptyGoodContainer = (
    <Box
      width="100%"
      textAlign="center"
      mt={6}
    >
      <Image
        src="/assets/empty-img-good.png"
        width={300}
        height={240}
        alt="Empty Good"
      />
      <Typography>
        {t("label.emptyGood")}
      </Typography>
    </Box>
  )

  return (
    <>
      <InfiniteScroll
        dataLength={transactionList ? transactionList.length : 0}
        hasMore={transactions.hasNextPage ?? false}
        next={transactions.fetchNextPage}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        loader={
          <Skeleton
            variant="rounded"
            width="100%"
            height={187}
            sx={{ m: 1 }}
          />
        }
      >
        {transactionList &&
          transactionList.map((transaction, index) => (
            <VGCard
              key={index}
              onClick={() => moveToDetail(transaction.id)}
              sx={{ cursor: "pointer", margin: 0 }}
            >
              <Box
                display={isMobile ? "block" : "flex"}
                justifyContent="space-between"
                alignItems="center"
              >
                <VGAlert
                  sx={{
                    '.MuiAlert-message': {
                      p: 0
                    },
                    width: "fit-content"
                  }}
                >
                  <Box>
                    <Typography
                      display="flex"
                      alignItems="center"
                      fontSize={12}
                      fontWeight={700}
                      color="common.shade.100"
                    >
                      <TagIcon
                        sx={{ mr: 1 }}
                        fontSize="small"
                      />
                      {transaction.code}
                    </Typography>
                  </Box>
                </VGAlert>
                <Box width={isMobile ? "100%" : "auto"} mt={isMobile ? 1 : 0}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontSize={12}
                    fontWeight={700}
                    color="common.shade.100"
                  >
                    <CalendarIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                    {fullDateFormat(transaction.order_date)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                display={isMobile ? "block" : "flex"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  width="100%"
                >
                  <Box>
                    <img
                      src={transaction.product_image_url}
                      width={74}
                      height={74}
                      alt="Product Picture"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Box
                    width="100%"
                    ml={1}
                  >
                    <Typography
                      fontSize={14}
                      fontWeight={700}
                      color="common.shade.700"
                    >
                      {transaction.product_name}
                    </Typography>
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="common.shade.200"
                    >
                      {transaction.member_name}
                    </Typography>
                    {
                      transaction.is_kilat ?
                        (
                          <Image
                            src="/assets/badge-kilat.svg"
                            width={66}
                            height={16}
                            alt="Badge Kilat"
                          />
                        ) :
                        transaction.is_instant ?
                          (
                            <Image
                              src="/assets/badge-instant.svg"
                              width={62}
                              height={14}
                              alt="Badge Instant"
                            />
                          ) : ""
                    }
                    {
                      isMobile && (
                        <Box
                          width="100%"
                          display={isMobile ? "flex" : "block"}
                          justifyContent="space-between"
                        >
                          <Box display="flex">
                            <Typography
                              fontSize={14}
                              fontWeight={700}
                              color="common.shade.100"
                              width="100%"
                            >
                              {t("label.price")}
                            </Typography>
                            <Typography
                              fontSize={14}
                              fontWeight={700}
                              color="primary.main"
                              width="100%"
                              textAlign={isMobile ? "left" : "right"}
                              ml={isMobile ? 2 : 0}
                            >
                              {priceFormat(transaction.price)}
                            </Typography>
                          </Box>
                          <Typography
                            textAlign="right"
                            fontSize={14}
                            fontWeight={700}
                            color="primary.main"
                            width="100%"
                          >
                            {t("label.qty")}: {transaction.qty}
                          </Typography>
                        </Box>
                      )
                    }
                  </Box>
                </Box>
                {
                  !isMobile && (
                    <Box
                      width="100%"
                      textAlign="right"
                      display={isMobile ? "flex" : "block"}
                      justifyContent="space-between"
                    >
                      <Typography
                        fontSize={14}
                        fontWeight={700}
                        color="common.shade.100"
                        width="100%"
                      >
                        {t("label.price")}
                      </Typography>
                      <Typography
                        fontSize={14}
                        fontWeight={700}
                        color="primary.main"
                        width="100%"
                        textAlign={isMobile ? "left" : "right"}
                        ml={isMobile ? 2 : 0}
                      >
                        {priceFormat(transaction.price)}
                      </Typography>
                      <Typography
                        fontSize={14}
                        fontWeight={700}
                        color="primary.main"
                        width="100%"
                      >
                        {t("label.qty")}: {transaction.qty}
                      </Typography>
                    </Box>
                  )
                }
              </Box>
            </VGCard>
          ))}
      </InfiniteScroll>
      {
        transactions.isSuccess && transactionList?.length === 0 && (
          status === "5" || status === "6"
            ? (emptyGoodContainer)
            : (emptyBadContainer)
        )
      }
    </>
  )
}