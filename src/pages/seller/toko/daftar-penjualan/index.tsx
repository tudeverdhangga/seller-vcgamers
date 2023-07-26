import { Trans, useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DownloadIcon from '@mui/icons-material/SimCardDownloadOutlined';

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import { useResponsive } from "~/utils/mediaQuery";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import VGButton from "~/components/atomic/VGButton";
import ListTransactionFilter from "~/components/organism/ListTransactionFilter";
import ListTransaction from "~/components/organism/ListTransaction";

export default function DaftarPenjualanPage() {
  const { t } = useTranslation("transaction");
  const { isMobile } = useResponsive();

  return (
    <>
      <VGPageTitle
        subTitle={t("subTitle")}
        title={t("title")}
        sx={{ width: "100%" }}
      >
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: isMobile ? "100%" : "auto"
        }}>
          <Typography
            component="span"
            fontSize={12}
            fontWeight={600}
            color={"common.shade.100"}
            align="right"
            mr={2}
          >
            <Trans
              ns="transaction"
              i18nKey={"report.label"}
              components={{
                br: <br />,
                strong: <Typography
                  component="span"
                  fontSize={12}
                  fontWeight={600}
                  color="common.shade.700"
                />
              }}
            >
              Data yang di download mengikuti filter rentang waktu dibawah.<br />Laporan lebih dari 3 bulan silahkan <strong>kontak CS</strong>
            </Trans>
          </Typography>
          <VGButton
            variant="outlined"
            color="primary"
          >
            <DownloadIcon />
            {t("report.button")}
          </VGButton>
        </Box>
      </VGPageTitle>
      <ListTransactionFilter />
      <ListTransaction />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["transaction"]);
