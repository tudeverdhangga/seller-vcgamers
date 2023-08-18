import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";

export default function TransactionDetailCancelDialog(props: {
  reason?: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("transaction");

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
          {t("detail.list.detailCancel.title")}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={500}
          color="common.shade.700"
          textAlign="center"
          my={2}
        >
          {props.reason}
        </Typography>
        <VGButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={props.handleClose}
        >
          {t("detail.list.detailCancel.back")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}