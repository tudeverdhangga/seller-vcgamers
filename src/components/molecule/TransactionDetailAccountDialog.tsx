/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

export default function TransactionDetailAccountDialog(props: {
  deliveryData: string[];
  imageUrl: string;
  code: string;
  name: string;
  brandName: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("transaction");

  const copyNotes = async (isAll: boolean, account?: string) => {
    if (isAll) {
      const deliveryDataAsString = props.deliveryData.join('\n');
      await navigator.clipboard.writeText(deliveryDataAsString);
    } else if (account) {
      await navigator.clipboard.writeText(account);
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
              color="success"
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
            {t("detail.list.account.detail")}
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
            {t("detail.list.account.copyAll")}
          </Link>
        </Box>
        <Divider />
        {
          props.deliveryData.map((account, index) => (
            <Box
              key={index}
              borderRadius="10px"
              p="10px"
              my={1}
              sx={{ backgroundColor: "common.shade.50" }}
            >
              <Typography
                component="pre"
                fontSize={14}
                fontWeight={700}
                color="primary"
                pb={1}
              >
                {t("detail.list.account.label", { counter: index + 1 })}
              </Typography>
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderTop="1px solid #DEDEDE"
                pt={1}
              >
                <Typography
                  component="pre"
                  fontSize={12}
                  fontWeight={500}
                  color="common.shade.700"
                >
                  {account}
                </Typography>
                <Link
                  fontSize={12}
                  fontWeight={500}
                  color="common.shade.700"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                  onClick={() => copyNotes(false, account)}
                >
                  {t("detail.list.account.copyCode")}
                </Link>
              </Box>
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
          {t("detail.list.account.close")}
        </VGButton>
      </Box>
    </VGDialog>
  );
}
