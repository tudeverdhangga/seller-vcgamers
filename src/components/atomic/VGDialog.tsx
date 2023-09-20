import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { type ReactNode } from "react";

export default function VGDialog(props: {
  children: ReactNode;
  width?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      sx={{
        minWidth: 100,
        minHeight: 100,
        "& .MuiDialog-container": {
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            width: "100%",
            maxWidth: props.width,
          },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, mb: 1, p: 2 }}>
        <IconButton
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        {props.children}
      </DialogTitle>
    </Dialog>
  );
}
