/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import Link from "@mui/material/Link";

export default function TransactionDetailVoucherDialog(props: {
  deliveryData: string[];
  imageUrl: string;
  code: string;
  name: string;
  brandName: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("transaction");

  const copyNotes = async (isAll: boolean, voucher?: string) => {
    if (isAll) {
      const deliveryDataAsString = props.deliveryData.join('\n');
      await navigator.clipboard.writeText(deliveryDataAsString);
    } else if (voucher) {
      await navigator.clipboard.writeText(voucher);
    }
    return;
  }

  return (
    <VGDialog
      isOpen={props.isOpen}
      width="360px"
      onClose={props.handleClose}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        p={1}
      >
        <Box display="flex">
          <img
            src={props.imageUrl}
            width={50}
            height={50}
            alt="Product Picture"
            style={{ objectFit: "cover" }}
          />
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            ml={2}
          >
            <Typography
              fontSize={12}
              fontWeight={500}
              color="common.shade.200"
            >
              {props.code}
            </Typography>
            <Typography
              fontSize={14}
              fontWeight={700}
              color="common.shade.700"
            >
              {props.name}
            </Typography>
            <Typography
              fontSize={12}
              fontWeight={700}
              color="primary"
            >
              {props.brandName}
            </Typography>
          </Box>
        </Box>
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
          mt={2}
        >
          <Typography
            fontSize={12}
            fontWeight={700}
            color="common.shade.200"
          >
            {t("detail.list.voucher.detail")}
          </Typography>
          <Link
            fontSize={12}
            fontWeight={500}
            color="common.shade.100"
            sx={{
              cursor: "pointer",
              textDecoration: "none"
            }}
            onClick={() => copyNotes(true)}
          >
            {t("detail.list.voucher.copyAll")}
          </Link>
        </Box>
        {
          props.deliveryData.map((voucher, index) => (
            <Box
              key={index}
              width="100%"
              height="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderTop="1px solid #DEDEDE"
              py={1}
            >
              <Typography
                fontSize={12}
                fontWeight={500}
                color="common.shade.200"
              >
                {voucher}
              </Typography>
              <Link
                fontSize={12}
                fontWeight={500}
                color="common.shade.100"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none"
                }}
                onClick={() => copyNotes(false, voucher)}
              >
                {t("detail.list.voucher.copyCode")}
              </Link>
            </Box>
          ))
        }
        <VGButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mt: 1 }}
          onClick={props.handleClose}
        >
          {t("detail.list.voucher.close")}
        </VGButton>
      </Box>
    </VGDialog>
  );
}
