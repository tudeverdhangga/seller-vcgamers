import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";

export default function TransactionCancelDialog(props: {
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
          mb={2}
        >
          {t("detail.dialog.cancel")}
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
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
            {t("detail.dialog.back")}
          </VGButton>
          <VGButton
            variant="contained"
            color="error"
            size="large"
            fullWidth
            onClick={props.handleClose}
          >
            {t("detail.dialog.confirmation")}
          </VGButton>
        </Box>
      </Box>
    </VGDialog>
  )
}