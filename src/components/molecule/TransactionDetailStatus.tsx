import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleIcon from '@mui/icons-material/CircleOutlined';

import VGCard from "~/components/atomic/VGCard";

interface StatusItem {
  time: string;
  status: string;
  date: string;
  productName?: string;
  code: string;
}

export default function TransactionDetailStatus(props: {status: StatusItem[]}) {
  const { t } = useTranslation("transaction");
  const warningStatus = ["wait", "complain", "cancel"]
  const progressStatus = ["onProcess", "sent"]

  const getLabelStatus = (status: string | undefined) => {
    switch(status) {
      case "wait":
        return t("detail.status.wait")
      case "onProcess":
        return t("detail.status.process")
      case "sent":
        return t("detail.status.sent")
      case "complain":
        return t("detail.status.complain")
      case "done":
        return t("detail.status.done")
      case "cancel":
        return t("detail.status.cancel")
      default:
        return "unknown status"
    }
  }

  return (
    <VGCard>
      <Typography
        fontSize={16}
        fontWeight={700}
        color="primary"
        mb={1}
      >
        {t("detail.status.title")}
      </Typography>
      {
        props.status.map((item, index) => (
          <Box
            key={index}
            display="flex"
            my={1}
          >
            <Box
              mr={2}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography
                fontSize={14}
                fontWeight={700}
                color="common.shade.700"
              >
                {item.time}
              </Typography>
              <Typography
                fontSize={14}
                fontWeight={500}
                color="common.shade.100"
              >
                WIB
              </Typography>
            </Box>
            <CircleIcon
              fontSize="small"
              color={
                warningStatus.includes(item.status)
                  ? "error"
                  : progressStatus.includes(item.status)
                    ? "primary"
                    : "success"
              }
            />
            <Box
              ml={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography
                fontSize={14}
                fontWeight={600}
                color="common.shade.700"
              >
                {`${getLabelStatus(item.status)} (${item.code})`}
              </Typography>
              <Typography
                fontSize={12}
                fontWeight={600}
                color="common.shade.200"
              >
                {item.date}
              </Typography>
            </Box>
          </Box>
        ))
      }
    </VGCard>
  )
}
