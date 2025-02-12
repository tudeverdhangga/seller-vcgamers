import * as React from "react";

import { useTranslation } from "next-i18next";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Controller, useForm } from "react-hook-form";
import { type Feedback, feedbackSchema } from "~/services/dashboard/types";
import { useSendFeedback } from "~/services/dashboard/hooks";

export default function SuggestionBoxDialog() {
  const { t } = useTranslation("dashboard");

  const [open, setOpen] = useAtom(suggestionBoxOpenAtom);
  const [, setConfirmationOpen] = useAtom(confirmationOpenAtom);
  const { mutate: sendFeedback } = useSendFeedback();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Feedback>({ resolver: zodResolver(feedbackSchema) });

  const onClose = () => setOpen(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiDialog-paper": {
              borderRadius: "10px",
            },
          },
        }}
      >
        <form
          onSubmit={handleSubmit((data) =>
            sendFeedback(data, {
              onSuccess: () => {
                setConfirmationOpen(true);
                onClose();
              },
            })
          )}
        >
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
            <Controller
              control={control}
              name="message"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  placeholder={t("suggestionBox.placeholder")}
                  multiline
                  rows={4}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                  autoFocus
                />
              )}
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
              disabled={!isValid}
              type="submit"
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
        </form>
      </Dialog>
      <SuccessDialog />
    </>
  );
}

function SuccessDialog() {
  const { t } = useTranslation("dashboard");
  const [open, setConfirmationOpen] = useAtom(confirmationOpenAtom);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        },
      }}
    >
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
