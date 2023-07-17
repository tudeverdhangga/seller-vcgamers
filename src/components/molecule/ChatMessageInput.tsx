import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import AttachmentIcon from "../icons/chat/AttachmentIcon";
import CloseIcon from "../icons/chat/CloseIcon";
import SendIcon from "../icons/chat/SendIcon";

export default function ChatMessageInput() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation("chat");

  return (
    <>
      <Box
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "background.paper",
          borderRadius: "5px",
        }}
      >
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="attachment"
          onClick={() => setModalOpen(true)}
        >
          <AttachmentIcon />
        </IconButton>
        <TextField
          variant="standard"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tulis pesan..."
          inputProps={{ "aria-label": "input chat message" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="send">
          <SendIcon />
        </IconButton>
      </Box>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            py: "10px",
            fontSize: 16,
            fontWeight: 700,
            color: "primary.main",
            textAlign: "center",
            mt: "30px",
          }}
        >
          <Image
            src="/assets/warning-icon.svg"
            width={75}
            height={69.35}
            alt="Warning Icon"
          />
          <p>{t("dialog.uploadFailed.title")}</p>
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 2 }}>
          <DialogContentText
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "common.shade.200",
              textAlign: "center",
            }}
          >
            {t("dialog.uploadFailed.subtitle")}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => setModalOpen(false)}
            color="primary"
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            {t("dialog.uploadFailed.back")}
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={() => setModalOpen(false)}
            color="primary"
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            {t("dialog.uploadFailed.retry")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
