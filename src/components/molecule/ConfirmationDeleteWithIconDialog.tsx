import Image from "next/image";
import { Box, Typography, Stack, Card, CardMedia } from "@mui/material";
import { useTranslation } from "next-i18next";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";

export default function ConfirmationDeleteWithIconDialog(props: {
  title: string | "undefined";
  contentDeleteAlert: string | "undefined";
  desc?: string;
  isOpen: boolean;
  iconSrc: string;
  handleClose: () => void;
}) {
  const { t } = useTranslation("vip");

  return (
    <VGDialog
      isOpen={props.isOpen}
      width="400px"
      onClose={props.handleClose}
    >
      <Box>
        <Stack
          direction={{ xs: 'row', sm: 'column' }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          useFlexGap flexWrap="wrap"
        >
          <Card sx={{ width: {xs: '20%', sm: '25%'}, boxShadow: 0 }}>
            <CardMedia
              sx={{border: 0}}
              component="img"
              image={props.iconSrc}
              title={`Delete Access Token`}
            />
          </Card>
        </Stack>
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
            my: 1,
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
            { props.contentDeleteAlert }
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
          onClick={props.handleClose}
        >
          {t("contentApi.accessKey.modalDelete.backBtn")}
        </VGButton>
        <VGButton
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ width: "100%", ml: 1 }}
        >
          {t("contentApi.accessKey.modalDelete.deleteBtn")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}