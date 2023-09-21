import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Collapse from "@mui/material/Collapse";

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import VGRichEditor from "~/components/atomic/VGRichEditor/index";
import { checkVoucher, isOpenAlert, voucherCode } from "~/atom/voucher";
import VGAlert from "~/components/atomic/VGAlert";

export default function VoucherInput({
  name,
  available,
  isLoading,
  isOpenMessage,
  handleCheckTotalCode,
  handleSubmitCode
}: {
  name: string
  available: number,
  isLoading: boolean,
  isOpenMessage: boolean,
  handleCheckTotalCode: () => void
  handleSubmitCode: () => void
}) {
  const { t } = useTranslation("voucher");
  const [, setVoucher] = useAtom(voucherCode)
  const [checkVoucherData, setCheckVoucherData] = useAtom(checkVoucher);
  const [open, setOpen] = useAtom(isOpenAlert);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])
  useEffect(() => {
    setOpen(isOpenMessage)
  }, [isOpenMessage])
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false)
      }, 2000);
    }
  }, [open])

  const onEdit = () => {
    setLoading(true)
    setCheckVoucherData({ ...checkVoucherData, isValidate: false })
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  const titleStyle = {
    fontSize: 16,
    fontWeight: 700,
    color: "primary.main"
  }

  return (
    <VGCard>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid
          item
          xs={12}
          md={9}
        >
          <Box>
            <Typography sx={titleStyle}>
              {t("input.productName")}
            </Typography>
            <Typography sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "#9AA4BF"
            }}>
              {name}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          justifyContent="flex-end"
        >
          <Box
            width="100%"
            border="2px solid #40D04F"
            borderRadius={10}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box
              color="common.green.500"
              px={2}
              height={24}
              width={24}
            >
              <CheckCircleIcon />
            </Box>
            <Typography
              textTransform="uppercase"
              fontSize={12}
              fontWeight={700}
              color="#9AA4B6"
              px={2}
            >
              {t("input.total")}
            </Typography>
            <Typography
              fontSize={24}
              fontWeight={700}
              color="primary.main"
              px={2}
            >
              {available}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography sx={titleStyle}>
          {t("input.note.label")}
        </Typography>
        <ul style={{ marginTop: 0, paddingLeft: 25 }}>
          <li
            style={{
              fontSize: 14,
              color: "#616A82"
            }}
          >
            {t("input.note.1")}
          </li>
          <li
            style={{
              fontSize: 14,
              color: "#616A82"
            }}
          >
            {t("input.note.2")}
          </li>
          <li
            style={{
              fontSize: 14,
              color: "#616A82"
            }}
          >
            {t("input.note.3")}
          </li>
        </ul>
        <Collapse in={open}>
          <VGAlert
            color={!checkVoucherData.isDuplicate ? "success" : "error"}
            sx={{ mb: 2 }}
            onClose={() => setOpen(false)}
          >
            {!checkVoucherData.isDuplicate ? t("input.onSuccess", { total: checkVoucherData.total }) : t("input.alert")}
          </VGAlert>
        </Collapse>
        <Box position="relative">
          {
            loading
              ? (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={142}
                />
              ) : (
                <VGRichEditor
                  isToolbar={false}
                  enable={!checkVoucherData.isValidate}
                  content={checkVoucherData.vouchers}
                  onChange={(e) => setVoucher(e)}
                />
              )
          }
          {
            checkVoucherData.isValidate
              ? (
                <Box
                  display="flex"
                  position="absolute"
                  bottom={15}
                  right={15}
                >
                  <VGButton
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={onEdit}
                  >
                    {t("input.edit")}
                  </VGButton>
                  <VGButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSubmitCode}
                  >
                    {t("input.save", { total: checkVoucherData.total })}
                  </VGButton>
                </Box>
              ) : (
                <VGButton
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    right: 15
                  }}
                  disabled={loading}
                  onClick={handleCheckTotalCode}
                >
                  {t("input.check")}
                </VGButton>
              )
          }
        </Box>
      </Box>
    </VGCard>
  )
} 