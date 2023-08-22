import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import VGDialog from "~/components/atomic/VGDialog";
import PinNumberInput, { pinErrorAtom } from "~/components/atomic/PinNumberInput";
import { usePostValidatePin } from "~/services/pin/hooks";
import VGButton from "~/components/atomic/VGButton";
import { pinRateLimitAtom } from "~/atom/voucher";

export default function PinVoucherDialog(props: {
  isOpen: boolean;
  id: string;
  productId: string;
  handleClose: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const router = useRouter()
  const { isOpen, handleClose, id, productId } = props;
  const [isError, setIsError] = useAtom(pinErrorAtom);
  const [isRateLimit, setIsRateLimit] = useAtom(pinRateLimitAtom);

  const onCloseModal = () => {
    setIsError(false)
    handleClose()
  }
  const pinMutation = usePostValidatePin(
    (res) => {
      localStorage.setItem("voucherPermission", "true");
      localStorage.setItem("pin", res.pin);
      void router.push(`/seller/produk/kelola-voucher?variation_id=${id}&product_id=${productId}`)
      onCloseModal()
    },
    () => {
      if (false) {
        setIsRateLimit(true);
      }
    }
  );

  return (
    <VGDialog
      isOpen={isOpen}
      width="400px"
      onClose={onCloseModal}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          color="primary"
        >
          {t("table.dialog.changeVoucher.title")}
        </Typography>
        {
          <>
            <Typography
              fontSize={14}
              fontWeight={600}
              color="common.shade.200"
              whiteSpace="pre-line"
              textAlign="center"
              mt={1}
            >
              {isRateLimit
                ? t("table.dialog.changeVoucher.errorDescription", { time: "15:30" })
                : t("table.dialog.changeVoucher.subTitle")}
            </Typography>
            {!isRateLimit && isError && (
              <Typography
                fontSize={14}
                fontWeight={600}
                color="common.red.500"
                mt={2}
              >
                {t("table.dialog.changeVoucher.errorText")}
              </Typography>
            )}
            {!isRateLimit && (
              <PinNumberInput
                onSubmit={(value) => {
                  pinMutation.mutate({ pin: value });
                }}
              />
            )}
          </>
        }
        <VGButton
          size="large"
          onClick={onCloseModal}
          color="primary"
        >
          {t("table.dialog.changeVoucher.forget")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}