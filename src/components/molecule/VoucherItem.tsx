import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import MessageIcon from '@mui/icons-material/SmsOutlined';
import Grid from "@mui/material/Grid";
import { useState } from "react";

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import WithdrawDialog from "~/components/molecule/WithdrawDialog";

export default function VoucherItem(props: {
  status: number,
  label: string,
  code: string,
  id: string,
  reason?: string,
  handleWithdraw: () => void
}) {
  const { t } = useTranslation("voucher");
  const { status, code, reason, label, id, handleWithdraw } = props
  const [isOpenWithdrawDialog, setIsOpenWithdrawDialog] = useState(false)

  const statusStyle = {
    fontSize: 14,
    fontWeight: 700,
    color: status === 2
      ? "common.shade.100"
      : status === 1
        ? "common.green.900"
        : "common.red.500",
    width: 76,
    minWidth: 76,
    maxWidth: 76,
    mr: 2
  }
  const codeStyle = {
    fontSize: 14,
    color: status === 2
      ? "common.shade.75"
      : "common.shade.700",
    mr: 2,
    width: "100%"
  }

  return (
    <>
      <VGCard>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item
            xs={2}
            md={1}
          >
            <Typography sx={statusStyle}>
              {label}
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={7}
          >
            <Typography sx={codeStyle}>
              {code}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            md={3}
            display="flex"
            justifyContent="flex-end"
          >
            {
              status === 1
                ? (
                  <>
                    <VGButton
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => setIsOpenWithdrawDialog(true)}
                    >
                      {t("list.withdrawButton")}
                    </VGButton>
                  </>
                )
                : status === 3
                  ? (
                    <>
                      <MessageIcon
                        sx={{
                          color: "common.shade.700",
                          height: "1rem",
                          width: "auto",
                          mr: "5px"
                        }}
                      />
                      <Typography
                        fontSize={12}
                        color="common.shade.700"
                      >
                        {t("list.reason.label")} {reason}
                      </Typography>
                    </>
                  )
                  : ''
            }
          </Grid>
        </Grid>
      </VGCard>
      {
        isOpenWithdrawDialog && (
          <WithdrawDialog
            id={id}
            code={code}
            isOpen={isOpenWithdrawDialog}
            handleClose={() => setIsOpenWithdrawDialog(false)}
            handleWithdraw={handleWithdraw}
          />
        )
      }
    </>
  )
}