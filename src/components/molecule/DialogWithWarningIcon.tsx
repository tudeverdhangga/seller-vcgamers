import Image from "next/image";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import VGStyledDialog from "../atomic/VGStyledDialog";
import CloseIcon from "../icons/chat/CloseIcon";
import VGButton from "../atomic/VGButton";

export default function DialogWithWarningIcon(props: {
  open: boolean;
  handleClose: () => void;
  title: string;
  contentTitle?: string;
  contentSubtitle?: string;
  description?: React.ReactNode;
  backBtnTitle: string;
  okBtnTitle: string;
  okBtnClick: () => void;
  okBtnProps?: Parameters<typeof VGButton>[0];
}) {
  return (
    <VGStyledDialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
          py: "10px",
          mt: "30px",
        }}
      >
        <Image
          src="/assets/warning-icon.svg"
          width={75}
          height={69.35}
          alt="Warning Icon"
        />
        <p style={{ marginBottom: "0px" }}>{props.title}</p>
        <IconButton
          onClick={props.handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, textAlign: "center" }}>
        <Box
          sx={{
            mt: "10px",
            p: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "10px",
            backgroundColor: "common.purple.100",
          }}
        >
          <Typography
            sx={{ color: "primary.main", fontSize: 14, fontWeight: 700 }}
          >
            {props.contentTitle}
          </Typography>
          <Typography
            sx={{ color: "common.shade.200", fontSize: 14, fontWeight: 500 }}
          >
            {props.contentSubtitle}
          </Typography>
        </Box>
        {props.description}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={props.handleClose}
          color="primary"
        >
          {props.backBtnTitle}
        </VGButton>
        <VGButton
          variant="outlined"
          size="large"
          fullWidth
          onClick={props.okBtnClick}
          color="primary"
          {...props.okBtnProps}
        >
          {props.okBtnTitle}
        </VGButton>
      </DialogActions>
    </VGStyledDialog>
  );
}
