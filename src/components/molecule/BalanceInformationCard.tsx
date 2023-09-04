import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

import { confirmationDialogOpenAtom } from "~/atom/balance";
import VGCard from "~/components/atomic/VGCard";
import { useResponsive } from "~/utils/mediaQuery";
import { useGetBalanceInfo } from "~/services/balance/hooks";
import VGButton from "../atomic/VGButton";
import WalletIcon from "../icons/WalletIcon";
import WalletOnHoldIcon from "../icons/WalletOnHoldIcon";
import BalancePinDialog from "../organism/BalancePinDialog";
import BalanceConfirmationDialog from "./BalanceConfirmationDialog";
import { priceFormat } from "~/utils/format";

export default function BalanceInformationCard() {
  const { t } = useTranslation("balance");
  const [, setConfirmationDialog] = useAtom(confirmationDialogOpenAtom);
  const { data } = useGetBalanceInfo();

  const { isMobile } = useResponsive();
  const deviceType = isMobile ? "mobile" : "desktop";

  return (
    <VGCard sx={{ p: 0 }}>
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "common.shade.50",
          p: 3,
        }}
      >
        <Typography color="primary.main" fontSize={16} fontWeight={700}>
          {t(`card.information.title.${deviceType}`)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "row", xs: "column" },
          p: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: { sm: 2, xs: 1 } }}>
          <Box
            sx={{
              borderRadius: "50%",
              p: { sm: "18px", xs: "12px" },
              backgroundColor: "common.shade.50",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WalletIcon fontSize={isMobile ? "medium" : "large"} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography color="common.shade.700" fontSize={14} fontWeight={600}>
              {t("card.information.currentBalance")}
            </Typography>
            {data ? (
              <Typography
                color="primary.main"
                fontSize={isMobile ? 14 : 18}
                fontWeight={700}
              >
                {priceFormat(data.data.balance)}
              </Typography>
            ) : (
              <Skeleton variant="rectangular" />
            )}
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", gap: { sm: 2, xs: 1 }, ml: { sm: "72px" } }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              p: { sm: "18px", xs: "12px" },
              backgroundColor: "common.shade.50",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WalletOnHoldIcon fontSize={isMobile ? "medium" : "large"} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography color="common.shade.700" fontSize={14} fontWeight={600}>
              {t("card.information.onHoldBalance")}
            </Typography>
            {data ? (
              <Typography
                color="primary.main"
                fontSize={isMobile ? 14 : 18}
                fontWeight={700}
              >
                {priceFormat(data.data.pending_withdrawal)}
              </Typography>
            ) : (
              <Skeleton variant="rectangular" />
            )}
          </Box>
        </Box>
        {!isMobile && <Box sx={{ flexGrow: 1 }}></Box>}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            py: 1,
            alignItems: "center",
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          {data?.data.withdrawal_status ? (
            <Typography
              color="common.red.500"
              fontSize={12}
              fontWeight={600}
              textAlign={isMobile ? "center" : "right"}
              whiteSpace="pre-line"
            >
              {t(`card.information.error.${data.data.withdrawal_status_text}`)}
            </Typography>
          ) : null}
          <VGButton
            variant="contained"
            fullWidth={isMobile}
            // Hardcode
            disabled={
              data?.data.withdrawal_status_error ||
              (data?.data.balance ?? 0) < 20_000
            }
            sx={{ borderColor: "primary.main" }}
            onClick={() => setConfirmationDialog(true)}
          >
            {t("btn.withdrawBalance")}
          </VGButton>
          <BalanceConfirmationDialog />
          <BalancePinDialog />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "common.purple.0",
          px: 3,
          py: 1,
          display: "flex",
          gap: 1,
        }}
      >
        <InfoOutlinedIcon fontSize="small" sx={{ color: "common.shade.200" }} />
        {data ? (
          <Typography color="common.shade.200" fontSize={14} fontWeight={500}>
            Limit tarik saldo: Rp20.000 - Rp10.000.000. Penarikan akan dikenakan
            biaya sesuai dengan{" "}
            <Link
              href="https://www.vcgamers.com/news/help/faq-sell-digital-goods/"
              component={NextLink}
              underline="hover"
              color="primary.main"
              fontWeight={700}
              target="_blank"
              rel="noopener noreferrer"
            >
              Syarat dan Ketentuan
            </Link>
            . Saldo akan ditransfer ke{" "}
            <Typography
              component="span"
              color="common.shade.700"
              fontSize={14}
              fontWeight={500}
            >
              {data.data.bank_info}
            </Typography>
            . Untuk mengubah rekening silakan hubungi{" "}
            <Link
              href="mailto:support@vcgamers.com"
              component={NextLink}
              underline="hover"
              color="primary.main"
              fontWeight={700}
            >
              support@vcgamers.com
            </Link>
          </Typography>
        ) : (
          <Skeleton variant="rectangular" />
        )}
      </Box>
    </VGCard>
  );
}
