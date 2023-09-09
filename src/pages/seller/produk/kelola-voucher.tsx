import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import queryString from "query-string";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import Skeleton from "@mui/material/Skeleton";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import VoucherInput from "~/components/organism/VoucherInput";
import VoucherList from "~/components/organism/VoucherList";
import { useCreateVoucher, useGetProductDetail, useGetVoucher, useUpdateVoucher, useValidateVoucher } from "~/services/api/product";
import { checkVoucher, voucherCode, withdrawReason, isSuccessCreateVoucher } from "~/atom/voucher";
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function KelolaVoucherPage() {
  const { t } = useTranslation("voucher");
  const [id, setId] = useState("");
  const router = useRouter()
  const [withdrawData] = useAtom(withdrawReason);
  const [vouchers, setVouchers] = useAtom(voucherCode);
  const [checkVoucherData, setCheckVoucher] = useAtom(checkVoucher);
  const [, setSuccessCreateVoucher] = useAtom(isSuccessCreateVoucher);
  const getVoucher = useGetVoucher()
  const updateVoucher = useUpdateVoucher(queryString.stringify({ voucher_id: withdrawData.voucher_id }))
  const productDetail = useGetProductDetail()
  const validateVoucher = useValidateVoucher()
  const createVoucher = useCreateVoucher()
  const [params, setParams] = useState({
    variation_id: "",
    search: ""
  })

  useEffect(() => {
    if (typeof router.query.variation_id === "string" && typeof router.query.product_id === "string") {
      setId(router.query.variation_id)
      setParams({ ...params, variation_id: router.query.variation_id })
      productDetail.mutate(queryString.stringify({ product_id: router.query.product_id }))
    }
  }, [router.query.variation_id])
  useEffect(() => {
    if (params.variation_id !== "") {
      getVoucher.mutate(queryString.stringify(params))
    }
  }, [params])

  const handleWithdraw = () => {
    if (withdrawData.voucher_id !== "") {
      updateVoucher.mutate({
        status: withdrawData.status,
        pulled_reason: withdrawData.pulled_reason,
        pin: localStorage.getItem("pin")
      }, {
        onSuccess: () => {
          getVoucher.mutate(queryString.stringify(params));
          toast.success(t("list.alert.onSuccess"), toastOption);
        },
        onError: (error) => {
          const err = error as ErrorResponse
          const errorMessage = `${t("list.alert.onError")}: ${err?.response?.data?.message}`
          toast.error(errorMessage, toastOption)
        }
      })
    }
  }
  const handleCheckTotalCode = () => {
    validateVoucher.mutate({
      variation_id: id,
      vouchers,
      pin: localStorage.getItem("pin")
    }, {
      onSuccess: (res) => {
        if (res.data.total !== 0) {
          setCheckVoucher({
            isDisable: true,
            isValidate: true,
            isDuplicate: res.data.is_duplicate,
            vouchers: res.data.vouchers,
            total: res.data.total
          })
          setVouchers(res.data.vouchers)
        } else {
          setSuccessCreateVoucher(false)
        }
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("input.onError")}: ${err?.response?.data?.message}`
        toast.error(errorMessage, toastOption)
      }
    })
  }
  const handleSubmitCode = () => {
    createVoucher.mutate({
      variation_id: id,
      vouchers,
      pin: localStorage.getItem("pin")
    }, {
      onSuccess: () => {
        setCheckVoucher({
          ...checkVoucherData,
          isDisable: false,
          isValidate: false,
          isDuplicate: false,
          vouchers: ""
        })
        setVouchers("")
        setSuccessCreateVoucher(true)
        getVoucher.mutate(queryString.stringify(params))
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("input.onError")}: ${err?.response?.data?.message}`
        toast.error(errorMessage, toastOption)
      }
    })
  }
  const handleSearch = (search: string) => {
    setParams({ ...params, search })
  }

  return (
    <>
      <VGPageTitle
        subTitle={t("subTitle")}
        title={(
          <Box display="flex" alignItems="center">
            {t("title")}
            <Image
              src="/assets/badge-instant.svg"
              width={88}
              height={21}
              alt="Badge Instant"
              style={{ marginLeft: "8px" }}
            />
          </Box>
        )}
        sx={{ width: "100%" }}
      />

      <VoucherInput
        name={productDetail?.data?.data?.name || ''}
        available={getVoucher?.data?.data?.available || 0}
        isLoading={validateVoucher.isLoading || createVoucher.isLoading}
        handleCheckTotalCode={handleCheckTotalCode}
        handleSubmitCode={handleSubmitCode}
      />
      <VoucherList
        isLoading={validateVoucher.isLoading || createVoucher.isLoading}
        vouchers={getVoucher?.data?.data.vouchers}
        handleWithdraw={handleWithdraw}
        handleSearch={handleSearch}
      />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["voucher"]);
