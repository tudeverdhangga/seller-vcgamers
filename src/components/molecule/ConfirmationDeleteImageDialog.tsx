import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import VGButton from "~/components/atomic/VGButton";
import VGDialog from "~/components/atomic/VGDialog";

export default function ConfirmationDeleteImageDialog({
  isOpen,
  handleClose,
  handleDelete
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}) {
  const { t } = useTranslation("addProduct");

  return (
    <VGDialog
      isOpen={isOpen}
      width="400px"
      onClose={handleClose}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="/assets/warning-icon.svg"
          width={75}
          height={69.35}
          alt="Warning Icon"
        />
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
          {t("deleteImage.title")}
        </Typography>
        <Typography
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 500,
            fontSize: 15,
            color: "common.shade.200",
            my: 1,
          }}
        >
          {t("deleteImage.subTitle")}
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
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ width: "100%", mr: 1 }}
          onClick={handleClose}
        >
          {t("deleteImage.cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="error"
          size="large"
          sx={{ width: "100%", ml: 1 }}
          onClick={handleDelete}
        >
          {t("deleteImage.delete")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}