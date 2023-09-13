import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { useAtom } from "jotai";
import { Trans, useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import { mobileAppBarAtom } from "~/atom/layout";
import DashboardStatCard from "~/components/atomic/DashboardStatCard";
import VGHead from "~/components/atomic/VGHead";
import EarningIcon from "~/components/icons/svg/earningIcon.svg";
import MarketIcon from "~/components/icons/svg/marketPlaceIcon.svg";
import DashboardCarousel from "~/components/molecule/DashboardCarousel";
import DashboardChart from "~/components/molecule/DashboardChart";
import DashboardTitle from "~/components/molecule/DashboardTitle";
import HelpContactCard from "~/components/molecule/HelpContactCard";
import ProductSummaryCard from "~/components/molecule/ProductSummaryCard";
import ShopPerformanceCard from "~/components/molecule/ShopPerformanceCard";
import TransactionSummaryCard from "~/components/molecule/TransactionSummaryCard";
import {
  useGetDashboardGraphSuccess,
  useGetDashboardTotalSuccessAmount,
  useGetDashboardTotalSuccessQty,
} from "~/services/dashboard/hooks";
import type { GraphSuccessUrl } from "~/services/dashboard/types";
import { priceFormat } from "~/utils/format";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function DashboardSellerPage() {
  const { t } = useTranslation("dashboard");
  const [, setMobileAppBarAtom] = useAtom(mobileAppBarAtom);
  const [selectedChart, setSelectedChart] = useState<GraphSuccessUrl>("qty");
  const { data: totalQtyData, isLoading } = useGetDashboardTotalSuccessQty();
  const { data: totalAmountData } = useGetDashboardTotalSuccessAmount();
  const { data: graphData } = useGetDashboardGraphSuccess(selectedChart);

  useEffect(() => {
    setMobileAppBarAtom({
      showPrev: false,
      content: t("mobileTitle"),
      showMenu: true,
    });
  }, [setMobileAppBarAtom, t]);

  return (
    <>
      <VGHead>{t("head")}</VGHead>
      <DashboardTitle />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(3, 1fr)", xs: "repeat(2, 1fr)" },
          gap: "20px",
          mb: "20px",
          gridTemplateRows: "auto",
          gridTemplateAreas: {
            sm: `"graph graph performance"
                 "graph graph performance"`,
            xs: `"graph graph"
                 "graph graph"
                 "performance performance"
                 "performance performance"`,
          },
        }}
      >
        <Box
          sx={{
            gridArea: "graph",
            backgroundColor: "background.paper",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              p: "20px",
              overflowX: "auto",
              display: "flex",
              gap: "20px",
              "&::-webkit-scrollbar": {
                display: "none",
                width: "0 !important",
              },
            }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="rounded" height={100} width={230} />
                <Skeleton variant="rounded" height={100} width={230} />
              </>
            ) : (
              <>
                {totalQtyData ? (
                  <DashboardStatCard
                    icon={<MarketIcon />}
                    title={t("card.sales.title")}
                    subtitle={t("card.sales.subtitle", {
                      count: totalQtyData.data.current_value,
                    })}
                    sx={{
                      borderColor:
                        selectedChart === "qty"
                          ? "primary.main"
                          : "common.shade.75",
                    }}
                    stat={totalQtyData.data.last_value_diff}
                    onClick={() => setSelectedChart("qty")}
                  />
                ) : null}
                {totalAmountData ? (
                  <DashboardStatCard
                    icon={<EarningIcon />}
                    title={t("card.earning.title")}
                    subtitle={priceFormat(totalAmountData.data.current_value)}
                    sx={{
                      borderColor:
                        selectedChart === "price"
                          ? "primary.main"
                          : "common.shade.75",
                    }}
                    stat={totalAmountData.data.last_value_diff}
                    onClick={() => setSelectedChart("price")}
                  />
                ) : null}
              </>
            )}
          </Box>
          {graphData ? <DashboardChart graphData={graphData.data} /> : null}
        </Box>
        <Box sx={{ gridArea: "performance" }}>
          <ShopPerformanceCard />
        </Box>
      </Box>

      <Divider
        sx={{
          borderStyle: "dashed",
          my: "20px",
          backgroundColor: "common.shade.75",
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr 1fr", xs: "1fr" },
          gap: "20px",
          mb: "20px",
          gridTemplateRows: "auto",
          gridTemplateAreas: {
            sm: `"transaction carousel"
                 "product helpContact"`,
            xs: `"transaction"
                 "product"
                 "carousel"
                 "helpContact"`,
          },
        }}
      >
        <Box sx={{ gridArea: "transaction" }}>
          <TransactionSummaryCard />
        </Box>
        <Box sx={{ gridArea: "carousel" }}>
          <DashboardCarousel />
        </Box>
        <Box sx={{ gridArea: "product" }}>
          <ProductSummaryCard />
        </Box>
        <Box sx={{ gridArea: "helpContact" }}>
          <HelpContactCard />
        </Box>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Trans i18nKey="support" ns="dashboard">
          <strong>VCGamers tidak memiliki channel chat lain</strong> seperti
          line, telegram, atau whatsapp selain dari 2 kontak di atas. Official
          Whatsapp VCGamers:
        </Trans>
      </Box>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["dashboard"]);
