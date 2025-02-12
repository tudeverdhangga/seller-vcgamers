import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import queryString from "query-string";
import { toast } from "react-toastify";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import { useProcessTransaction } from "~/services/api/transaction";
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function TransactionProcessVoucherDialog(props: {
  id: string;
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
}) {
  const { t } = useTranslation("transaction");
  const processTransaction = useProcessTransaction(queryString.stringify({ transaction_detail_id: props.id }))

  const onProcess = () => {
    processTransaction.mutate(
      [""],
      {
        onSuccess: () => {
          toast.success(t("detail.list.noVoucher.onSuccess"), toastOption)
          props.handleClose()
          props.refetch()
        },
        onError: (error) => {
          const err = error as ErrorResponse
          const errorMessage = `${t("detail.list.noVoucher.onError")}: ${err?.response?.data?.message}`
          toast.error(errorMessage, toastOption)
        }
      }
    )
  }

  return (
    <VGDialog
      isOpen={props.isOpen}
      width="400px"
      onClose={props.handleClose}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          color="primary"
        >
          {t("detail.list.noVoucher.title")}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={500}
          color="common.shade.200"
          my={3}
        >
          {t("detail.list.noVoucher.subTitle")}
        </Typography>
        <Box
          display="flex"
          width="100%"
        >
          <VGButton
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ mr: 2 }}
            onClick={props.handleClose}
          >
            {t("detail.list.noVoucher.back")}
          </VGButton>
          <VGButton
            variant="contained"
            color="success"
            size="large"
            fullWidth
            onClick={onProcess}
          >
            {t("detail.list.noVoucher.submit")}
          </VGButton>
        </Box>
      </Box>
    </VGDialog>
  )
}