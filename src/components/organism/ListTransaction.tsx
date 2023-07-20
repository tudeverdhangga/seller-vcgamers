import { useTranslation } from "next-i18next";
import { transactions } from "~/utils/dummy/transactions";
import Box from "@mui/material/Box"
import TagIcon from '@mui/icons-material/LocalOffer';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Image from "next/image";

import VGCard from "~/components/atomic/VGCard"
import VGAlert from "~/components/atomic/VGAlert"
import { priceFormat } from "~/utils/format";
import { useResponsive } from "~/utils/mediaQuery";

export default function ListTransaction() {
  const { t } = useTranslation("transaction");
  const { isMobile } = useResponsive();

  const emptyBadContainer = (
    <Box
      width="100%"
      textAlign="center"
    >
      <Image
        src="/assets/empty-img-bad.png"
        width={300}
        height={197}
        alt="Empty Bad"
      />
      <Typography>
        {t("label.emptyBad")}
      </Typography>
    </Box>
  )
  const emptyGoodContainer = (
    <Box
      width="100%"
      textAlign="center"
    >
      <Image
        src="/assets/empty-img-good.png"
        width={300}
        height={197}
        alt="Empty Good"
      />
      <Typography>
        {t("label.emptyGood")}
      </Typography>
    </Box>
  )

  return (
    <>
      {
        transactions.map((transaction, index) => (
          <VGCard key={index}>
            <Box
              display={isMobile ? "block" : "flex"}
              justifyContent="space-between"
              alignItems="center"
            >
              <VGAlert
                sx={{
                  '.MuiAlert-message': {
                    p: 0
                  }
                }}
              >
                <Box>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontSize={12}
                    fontWeight={700}
                    color="common.shade.100"
                  >
                    <TagIcon
                      sx={{mr: 1}}
                      fontSize="small"
                    />
                    {transaction.code}
                  </Typography>
                </Box>
              </VGAlert>
              <Box width={isMobile ? "100%" : "auto"} mt={isMobile ? 1 : 0}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontSize={12}
                  fontWeight={700}
                  color="common.shade.100"
                >
                  <CalendarIcon
                    sx={{mr: 1}}
                    fontSize="small"
                  />
                  {transaction.date}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              display={isMobile ? "block" : "flex"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                width="100%"
              >
                <Image
                  src={transaction.image}
                  width={74}
                  height={74}
                  alt="Product Picture"
                />
                <Box
                  width="100%"
                  ml={1}
                >
                  <Typography
                    fontSize={14}
                    fontWeight={700}
                    color="common.shade.700"
                  >
                    {transaction.productName}
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    color="common.shade.200"
                  >
                    {transaction.customerName}
                  </Typography>
                  {
                    transaction.feature === "kilat"
                    ? (
                      <Image
                        src="/assets/badge-kilat.svg"
                        width={66}
                        height={16}
                        alt="Badge Kilat"
                      />
                    )
                    : (
                      <Image
                        src="/assets/badge-instant.svg"
                        width={62}
                        height={14}
                        alt="Badge Instant"
                      />
                    )
                  }
                </Box>
              </Box>
              <Box
                width="100%"
                textAlign="right"
                display={isMobile ? "flex" : "block"}
                justifyContent="space-between"
              >
                <Typography
                  fontSize={14}
                  fontWeight={700}
                  color="common.shade.100"
                  width="100%"
                >
                  {t("label.price")}
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight={700}
                  color="primary.main"
                  width="100%"
                  textAlign={isMobile ? "left" : "right"}
                  ml={isMobile ? 2 : 0}
                >
                  {priceFormat(transaction.price)}
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight={700}
                  color="primary.main"
                  width="100%"
                >
                  {t("label.qty")}: {transaction.qty}
                </Typography>
              </Box>
            </Box>
          </VGCard>
        ))
      }
    </>
  )
}