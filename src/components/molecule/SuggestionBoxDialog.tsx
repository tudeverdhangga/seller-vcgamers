import * as React from "react";

import { useTranslation } from "next-i18next";
import { useAtom } from "jotai";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  confirmationOpenAtom,
  suggestionBoxOpenAtom,
} from "~/atom/suggestionBox";

export default function SuggestionBoxDialog() {
  const { t } = useTranslation("dashboard");

  const [open, setOpen] = useAtom(suggestionBoxOpenAtom);
  const [, setConfirmationOpen] = useAtom(confirmationOpenAtom);

  const onClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          {t("suggestionBox.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "common.shade.200",
              textAlign: "center",
              mb: "20px",
            }}
          >
            {t("suggestionBox.subtitle")}
          </DialogContentText>
          <TextField
            placeholder={t("suggestionBox.placeholder")}
            multiline
            rows={4}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={onClose}
            sx={{
              borderColor: "common.shade.200",
              "&:hover": {
                backgroundColor: "common.shade.10",
                borderColor: "common.shade.200",
              },
              color: "common.shade.200",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            {t("suggestionBox.back")}
          </Button>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => {
              setConfirmationOpen(true);
              onClose();
            }}
            sx={{
              backgroundColor: "common.green.500",
              "&:hover": {
                backgroundColor: "common.green.500",
              },
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            {t("suggestionBox.sent")}
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessDialog />
    </>
  );
}

function SuccessDialog() {
  const { t } = useTranslation("dashboard");
  const [open, setConfirmationOpen] = useAtom(confirmationOpenAtom);

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
        }}
      >
        {t("suggestionBox.success.title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "common.shade.200",
            textAlign: "center",
          }}
        >
          {t("suggestionBox.success.subtitle")}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setConfirmationOpen(false)}
          color="primary"
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: "10px",
          }}
        >
          {t("suggestionBox.success.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
