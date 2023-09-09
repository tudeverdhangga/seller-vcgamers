import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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

export default function TransactionProcessAccountDialog(props: {
  id: string;
  qty: number;
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
}) {
  const { t } = useTranslation("transaction");
  const processTransaction = useProcessTransaction(queryString.stringify({ transaction_detail_id: props.id }));
  const [accountValues, setAccountValues] = useState<string[]>(Array(props.qty).fill(''));

  const onProcess = () => {
    processTransaction.mutate(
      accountValues,
      {
        onSuccess: () => {
          toast.success(t("detail.list.account.onSuccess"), toastOption)
          props.handleClose()
          props.refetch()
        },
        onError: (error) => {
          const err = error as ErrorResponse
          const errorMessage = `${t("detail.list.account.onError")}: ${err?.response?.data?.message}`
          toast.error(errorMessage, toastOption)
        }
      }
    )
  }
  const handleAccountChange = (index: number, value: string) => {
    const newAccountValues = accountValues;
    newAccountValues[index] = value;
    setAccountValues(newAccountValues);
  };

  const textFields = [];
  for (let index = 0; index < props.qty; index++) {
    textFields.push(
      <TextField
        key={index}
        variant="outlined"
        placeholder={t("detail.list.account.placeholder", { counter: index + 1 })}
        fullWidth
        multiline
        size="small"
        sx={{ my: "10px" }}
        onChange={(event) => handleAccountChange(index, event.target.value)}
      />
    );
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
          {t("detail.list.account.title")}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={700}
          color="common.shade.700"
          width="100%"
          textAlign="start"
        >
          {t("detail.list.account.subTitle")}
        </Typography>
        <Box
          maxHeight={360}
          width="100%"
          overflow="auto"
        >
          {textFields}
        </Box>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          fullWidth
          sx={{ mt: 1 }}
          onClick={onProcess}
        >
          {t("detail.list.account.submit")}
        </VGButton>
      </Box>
    </VGDialog>
  );
}
