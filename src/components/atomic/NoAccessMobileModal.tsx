import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";

export default function NoAccessMobileModal(props: {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("listProduct");

  return (
    <VGDialog
      isOpen={props.isOpen}
      onClose={props.handleClose}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Image
          src="/assets/mobile-product.png"
          width={178}
          height={136}
          alt="No Access Mobile"
        />
        <Typography
          fontSize={14}
          fontWeight={700}
          color="primary"
          mt={3}
        >
          {props.title}
        </Typography>
        <Typography
          fontSize={12}
          fontWeight={600}
          color="common.shade.200"
          my={2}
          textAlign="center"
        >
          {t("noAccessMobile.title")}
        </Typography>
        <VGButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={props.handleClose}
        >
          {t("noAccessMobile.confirm")}
        </VGButton>
      </Box>
    </VGDialog>
  )
}