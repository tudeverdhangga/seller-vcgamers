import { Box, Typography, Stack, Card, CardMedia } from "@mui/material";
import { useTranslation } from "next-i18next";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";

export default function ConfirmationGenerateWithIconDialog(props: {
  title: string | "undefined";
  contentGenerateAlert: string | "undefined";
  desc?: string;
  isOpen: boolean;
  handleClose: () => void;
  handleCopy?: () => void;
}) {
  const { t } = useTranslation("vip");

  return (
    <VGDialog
      isOpen={props.isOpen}
      width="400px"
      onClose={props.handleClose}
    >
      <Box>
        <Typography
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: "primary.main",
            my: 1,
          }}
        >
          { props.title }
        </Typography>
        <VGAlert
          color="info"
          sx={{
            width: "100%",
            my: 2,
            "& .MuiAlert-message" : {
              width: "100%",
              alignItems: "center"
            }
          }}
        >
          <Typography
            textAlign="center" 
            sx={{
              fontWeight: 700,
              fontSize: 14,
              color: "primary.main"
            }}
          >
            { props.contentGenerateAlert }
          </Typography>
        </VGAlert>
        <Typography 
          textAlign="center"
          sx={{
            color: "common.shade.200",
            fontWeight: 400, 
            fontSize: 12
          }}>
          { props.desc }
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <VGButton
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "100%", mr: 1 }}
          onClick={props.handleCopy ? props.handleCopy : props.handleClose}
        >
          {t("contentApi.accessKey.modalGenerate.copyBtn")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}