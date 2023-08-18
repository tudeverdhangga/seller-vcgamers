import { useState } from "react";
import { toast } from "react-toastify";
import queryString from "query-string";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import { useCancelTransaction } from "~/services/api/transaction";
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function TransactionCancelDialog(props: {
  id: string;
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
}) {
  const { t } = useTranslation("transaction");
  const [cancelReason, setCancelReason] = useState("")
  const cancelTransaction = useCancelTransaction(queryString.stringify({ transaction_detail_id: props.id }))

  const onChangeCancel = (reason: string) => {
    setCancelReason(reason)
  }
  const onSubmitCancel = () => {
    cancelTransaction.mutate(cancelReason,
      {
        onSuccess: () => {
          toast.success(t("detail.list.cancel.onSuccess"), toastOption)
          props.refetch()
          props.handleClose()
        },
        onError: (error) => {
          const err = error as ErrorResponse
          const errorMessage = `${t("detail.list.cancel.onError")}: ${err?.response?.data?.message}`
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
          mb={2}
        >
          {t("detail.list.cancel.title")}
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          InputProps={{
            inputProps: {
              maxLength: 200
            },
            endAdornment: (
              <Typography
                variant="caption"
                fontSize={14}
                fontWeight={500}
                color="common.shade.100"
                position="absolute"
                bottom={0}
                right={0}
                padding={1}
              >
                {cancelReason.length}/200
              </Typography>
            )
          }}
          placeholder={t("detail.list.cancel.placeholder")}
          onChange={(e) => onChangeCancel(e.target.value)}
        />
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          mt={2}
        >
          <VGButton
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ mr: 2 }}
            onClick={props.handleClose}
          >
            {t("detail.list.cancel.back")}
          </VGButton>
          <VGButton
            variant="contained"
            color="error"
            size="large"
            fullWidth
            disabled={!cancelReason}
            onClick={onSubmitCancel}
          >
            {t("detail.list.cancel.submit")}
          </VGButton>
        </Box>
      </Box>
    </VGDialog>
  )
}