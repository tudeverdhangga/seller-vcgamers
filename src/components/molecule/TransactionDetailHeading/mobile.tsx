import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import CopyIcon from '@mui/icons-material/ContentCopyOutlined';

import VGCard from "~/components/atomic/VGCard";
import Skeleton from "@mui/material/Skeleton";

export default function TransactionDetailHeadingMobile(props: {
  buyer: string;
  code: string;
  date: string;
  isLoading: boolean;
}) {
  const { t } = useTranslation("transaction");

  const copyTransactionId = async () => {
    await navigator.clipboard.writeText(props.code);
    return;
  }

  const titleStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "common.shade.200"
  }
  const bodyStyle = {
    fontSize: "12px",
    fontWeight: "600",
    color: "common.shade.700"
  }

  return (
    <>
      <VGCard>
        <Typography
          fontSize={14}
          fontWeight={700}
          color="primary"
          mb={1.5}
        >
          {t("detail.heading.title")}
        </Typography>
        <Box
          my={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={titleStyle}>
            {t("detail.heading.transactionId")}
          </Typography>
          {
            props.isLoading
              ? (
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={20}
                />
              ) : (
                <Typography sx={bodyStyle} display="flex">
                  #{props.code}
                  <CopyIcon
                    sx={{
                      cursor: "pointer",
                      ml: 1,
                      fontSize: "16px",
                      color: "primary.main"
                    }}
                    onClick={copyTransactionId}
                  />
                </Typography>
              )
          }
        </Box>
        <Box
          my={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={titleStyle}>
            {t("detail.heading.date")}
          </Typography>
          {
            props.isLoading
              ? (
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={20}
                />
              ) : (
                <Typography sx={bodyStyle}>
                  {props.date}
                </Typography>
              )
          }
        </Box>
        <Box
          my={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={titleStyle}>
            {t("detail.heading.buyer")}
          </Typography>
          {
            props.isLoading
              ? (
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={20}
                />
              ) : (
                <Typography sx={bodyStyle}>
                  {props.buyer}
                </Typography>
              )
          }
        </Box>
      </VGCard>
    </>
  )
}