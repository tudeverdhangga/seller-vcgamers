import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGCard from "~/components/atomic/VGCard";
import { priceFormat } from "~/utils/format";

interface Summary {
  sub_total: number
  service_fee: number
  promo: number
  grand_total: number
}

export default function TransactionDetailSummary({ summary }: { summary: Summary }) {
  const { t } = useTranslation("transaction");

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "common.shade.200",
    backgroundColor: "common.shade.0",
    display: "inline-block",
    pr: 1
  }
  const labelTotalStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "common.shade.200",
    backgroundColor: "common.shade.0",
    display: "inline-block",
    pr: 1
  }
  const valueStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "common.shade.700",
    pl: 1
  }
  const valueTotalStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "primary.main",
    pl: 1
  }
  const dotsStyle = {
    background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAAAXNSR0IArs4c6QAAACZJREFUGFdjPHP+xv/3Hz4xuDiYMoAA45nz1/+///CRwcXBHCwAACKIDfu0l/eKAAAAAElFTkSuQmCC) right center repeat-x",
    color: "common.shade.200",
    width: "100%"
  }

  return (
    <VGCard>
      <Typography
        fontSize={16}
        fontWeight={700}
        color="primary"
        mb={2}
      >
        {t("detail.sale.title")}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        my={1}
      >
        <Box
          component="div"
          sx={dotsStyle}
        >
          <Typography sx={labelStyle}>
            {t("detail.sale.subTotal")}
          </Typography>
        </Box>
        <Typography sx={valueStyle}>
          {priceFormat(summary?.sub_total ?? 0)}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        my={1}
      >
        <Box
          component="div"
          sx={dotsStyle}
        >
          <Typography sx={labelStyle}>
            {t("detail.sale.appFee")}
          </Typography>
        </Box>
        <Typography sx={valueStyle}>
          -&nbsp;{priceFormat(summary?.service_fee ?? 0)}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        my={1}
      >
        <Box
          component="div"
          sx={dotsStyle}
        >
          <Typography sx={labelStyle}>
            {t("detail.sale.promo")}
          </Typography>
        </Box>
        <Typography sx={valueStyle}>
          {priceFormat(summary?.promo ?? 0)}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        my={1}
      >
        <Box
          component="div"
          sx={dotsStyle}
        >
          <Typography sx={labelTotalStyle}>
            {t("detail.sale.total")}
          </Typography>
        </Box>
        <Typography sx={valueTotalStyle}>
          {priceFormat(summary?.grand_total ?? 0)}
        </Typography>
      </Box>
    </VGCard>
  )
}