import { useEffect, useRef, useState } from "react";

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
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";

import AttachmentIcon from "../icons/chat/AttachmentIcon";
import CloseIcon from "../icons/chat/CloseIcon";
import SendIcon from "../icons/chat/SendIcon";
import { uploadFile, type BodyUploadFile } from "~/services/upload";
import { messageAttachmentAtom, messageTextAtom } from "~/atom/chat";
import { useAtom } from "jotai";
import { mimeMapper } from "~/utils/mapper";

export type BodySubmit = {
  message: string;
  attachment?: string;
  attachment_url?: string;
  type: string;
};

export default function ChatMessageInput(props: {
  roomId: string;
  type: BodyUploadFile["module"];
  onSubmit: SubmitHandler<BodySubmit>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [attachment, setAttachment] = useAtom(messageAttachmentAtom);
  const { t } = useTranslation("chat");
  const [messageText] = useAtom(messageTextAtom);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadForm = useForm<BodyUploadFile>({
    defaultValues: { module: props.type },
  });
  const { ref: fileRef, ...fileRest } = uploadForm.register("file");

  const inputForm = useForm<BodySubmit>({
    defaultValues: { type: "TEXT" },
  });

  const uploadMutation = useMutation({
    mutationFn: (body: BodyUploadFile) => uploadFile(body),
    onMutate: (variable) => {
      inputForm.setValue("attachment_url", URL.createObjectURL(variable.file));
    },
    onSuccess: (data, variable) => {
      console.log("uploadMutation: onSuccess: ", data);
      inputForm.setValue("attachment", data.data.key);
      inputForm.setValue("type", mimeMapper(variable.file.type));
      uploadForm.reset({ module: props.type });
    },
    onError: () => {
      setModalOpen(true);
    },
    onSettled: () => {
      setAttachment({ show: false });
    },
  });

  useEffect(() => {
    if (messageText) {
      inputForm.setValue("message", messageText);
    }
  }, [messageText, inputForm]);

  useEffect(() => {
    if (!attachment.url) {
      uploadForm.resetField("file");
    }
  }, [attachment, uploadForm]);

  const onClickPickFile = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFileSubmit = () => {
    void uploadForm.handleSubmit((data) => {
      const file = data.file as unknown as FileList;

      if (file[0]) {
        uploadMutation.mutate({
          ...data,
          file: file[0],
        });
      }
    })();
  };

  const retryUpload = () => {
    handleUploadFileSubmit();
    setModalOpen(false);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = () => {
    handleUploadFileSubmit();

    void inputForm.handleSubmit((data) => {
      props.onSubmit(data);
      inputForm.reset({ message: "", type: "TEXT" });
    })();
  };

  console.log(uploadForm.watch("file"));

  return (
    <>
      <Box
        component="form"
        onSubmit={inputForm.handleSubmit((data) => {
          props.onSubmit(data);
          inputForm.reset({ message: "", type: "TEXT" });
        })}
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
          onClick={onClickPickFile}
        >
          <AttachmentIcon />
        </IconButton>
        <input
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          {...fileRest}
          ref={(e) => {
            fileRef(e);
            fileInputRef.current = e;
          }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setAttachment({
                show: true,
                url: URL.createObjectURL(e.target.files[0]),
              });
            }

            void fileRest.onChange(e);
          }}
        />
        <Controller
          control={inputForm.control}
          name="message"
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => (
            <TextField
              variant="standard"
              helperText={error ? error.message : null}
              error={!!error}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tulis pesan..."
              autoFocus
              autoComplete="off"
              onChange={onChange}
              value={value}
              inputRef={ref}
            />
          )}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="send"
          onClick={handleSubmit}
        >
          <SendIcon />
        </IconButton>
      </Box>
      <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="xs">
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
            onClick={closeModal}
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
            onClick={closeModal}
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
            onClick={retryUpload}
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
