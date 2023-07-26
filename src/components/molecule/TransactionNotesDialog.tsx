import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import Link from "@mui/material/Link";

export default function TransactionNotesDialog(props: {
  notes: string | undefined;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("transaction");

  const copyNotes = async() => {
    if (typeof props.notes !== 'undefined') {
      await navigator.clipboard.writeText(props.notes);
    }
    return;
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
          {t("detail.dialog.notes")}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={500}
          color="common.shade.700"
          my={2}
        >
          {props.notes}
        </Typography>
        <Link
          fontSize={12}
          fontWeight={500}
          color="primary"
          mb={2}
          sx={{
            cursor: "pointer", 
            textDecoration: "none"
          }}
          onClick={copyNotes}
        >
          {t("detail.list.copyNotes")}
        </Link>
        <VGButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={props.handleClose}
        >
          {t("detail.dialog.close")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}