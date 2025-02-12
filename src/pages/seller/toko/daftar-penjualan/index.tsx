import { Trans, useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/SimCardDownloadOutlined";
import { useState } from "react";
import queryString from "query-string";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import { useResponsive } from "~/utils/mediaQuery";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import VGButton from "~/components/atomic/VGButton";
import ListTransactionFilter from "~/components/organism/ListTransactionFilter";
import ListTransaction from "~/components/organism/ListTransaction";
import {
  useDownloadReport,
  useGetTransaction,
} from "~/services/api/transaction";
import { getCurrentTimestamp } from "~/utils/format";
import VGHead from "~/components/atomic/VGHead";
import { env } from "~/env.mjs";

interface Params {
  feature?: number;
  limit: number;
  search: string;
  date_start: string;
  date_end: string;
}

export default function DaftarPenjualanPage() {
  const { t } = useTranslation("transaction");
  const whatsappLink = env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LINK;
  const { isMobile } = useResponsive();
  const [params, setParams] = useState<Params>({
    limit: 10,
    search: "",
    date_start: "",
    date_end: ""
  });
  const transactions = useGetTransaction(queryString.stringify(params));
  const download = useDownloadReport();

  const handleFilter = (key: string, param: string | number) => {
    setParams({
      ...params,
      [key]: param,
    });
  };
  const onDownloadReport = () => {
    download.mutate(queryString.stringify(params), {
      onSuccess: (data) => {
        // Convert response to csv
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `export_transaction_${getCurrentTimestamp()}.csv`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
    });
  };
  const refetchTransaction = () => {
    void transactions.refetch()
  }

  return (
    <>
      <VGHead>{t("head")}</VGHead>
      <VGPageTitle
        subTitle={t("subTitle")}
        title={t("title")}
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {!isMobile && (
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
                  strong: (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      style={{ color: "#7750F8", textDecoration: "none" }}
                    >
                      <Typography
                        component="span"
                        fontSize={12}
                        fontWeight={600}
                        color="common.shade.700"
                      />
                    </a>
                  ),
                }}
              >
                Data yang di download mengikuti filter rentang waktu dibawah.
                <br />
                Laporan lebih dari 3 bulan silahkan <strong>kontak Tim Support</strong>
              </Trans>
            </Typography>
          )}
          <VGButton
            variant="outlined"
            color="primary"
            fullWidth={isMobile}
            onClick={onDownloadReport}
          >
            <DownloadIcon />
            {t("report.button")}
          </VGButton>
        </Box>
      </VGPageTitle>
      <ListTransactionFilter handleFilter={handleFilter} refetchTransaction={refetchTransaction} />
      <ListTransaction transactions={transactions} />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["transaction"]);
