import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";

export default function TransactionProcessDialog(props: {
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
          {t("detail.dialog.process")}
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          sx={{my: 2}}
        />
        <VGButton
          variant="contained"
          color="success"
          size="large"
          fullWidth
          onClick={props.handleClose}
        >
          {t("detail.dialog.send")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}