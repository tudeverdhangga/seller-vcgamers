import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import VGCard from "~/components/atomic/VGCard";
import { priceFormat } from "~/utils/format";

export default function TransactionDetailSummary(props: {price: number}) {
  const { t } = useTranslation("transaction");
  const [appFee, setAppFee] = useState(0);
  const [promo] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setAppFee(2 * props.price / 100)
    setTotal(props.price - appFee - promo)
  }, [props.price, appFee, promo])

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
    background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAMAAABIdo1RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NEY0N0FGMzBBRjMxMUUyODY3NUY4RTM1QUI3QkFDNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2NEY0N0FGNDBBRjMxMUUyODY3NUY4RTM1QUI3QkFDNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY0RjQ3QUYxMEFGMzExRTI4Njc1RjhFMzVBQjdCQUM1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY0RjQ3QUYyMEFGMzExRTI4Njc1RjhFMzVBQjdCQUM1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+vh2oXAAAAAZQTFRF////ERERcU8Z2wAAABJJREFUeNpiYGRkYGAAEQABBgAAIgAFjnN1FgAAAABJRU5ErkJggg==) right center repeat-x",
    width: "100%"
  }

  return (
    <VGCard>
      <Typography
        fontSize={14}
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
          {priceFormat(props.price)}
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
          {priceFormat(appFee)}
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
          {priceFormat(promo)}
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
          {priceFormat(total)}
        </Typography>
      </Box>
    </VGCard>
  )
}