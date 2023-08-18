import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleIcon from '@mui/icons-material/CircleOutlined';

import VGCard from "~/components/atomic/VGCard";
import { dateToTime, shortDateFormat } from "~/utils/format";
import Skeleton from "@mui/material/Skeleton";

interface History {
  description: string
  description_text: string
  code: string
  timestamp: string
  status: number
}

export default function TransactionDetailStatus(props: {
  status: History[];
  isLoading: boolean;
}) {
  const { t } = useTranslation("transaction");
  const warningStatus = [6, 5]
  const progressStatus = [2, 3]

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
        props.isLoading
          ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height={60}
            />
          ) : (
            props.status && props.status.map((item, index) => (
              <Box
                key={index}
                display="flex"
                my={1}
              >
                <Box
                  mr={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    fontSize={14}
                    fontWeight={700}
                    color="common.shade.700"
                  >
                    {dateToTime(item.timestamp)}
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
                    {item.description}
                  </Typography>
                  <Box display="flex">
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="common.shade.700"
                      mr={1}
                    >
                      {item.description_text}
                    </Typography>
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="common.shade.100"
                    >
                      ({item.code})
                    </Typography>
                  </Box>
                  <Typography
                    fontSize={12}
                    fontWeight={600}
                    color="common.shade.200"
                  >
                    {shortDateFormat(item.timestamp)}
                  </Typography>
                </Box>
              </Box>
            ))
          )
      }
    </VGCard>
  )
}
