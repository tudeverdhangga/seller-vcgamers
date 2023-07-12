import { useEffect } from "react";
import { useAtom } from "jotai";

import Box from "@mui/material/Box";
import { Trans, useTranslation } from "next-i18next";

import { priceFormat } from "~/utils/format";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

import DashboardStatCard from "~/components/atomic/DashboardStatCard";
import EarningIcon from "~/components/icons/svg/earningIcon.svg";
import MarketIcon from "~/components/icons/svg/marketPlaceIcon.svg";
import DashboardTitle from "~/components/molecule/DashboardTitle";
import HelpContactCard from "~/components/molecule/HelpContactCard";
import ProductSummaryCard from "~/components/molecule/ProductSummaryCard";
import ShopPerformanceCard from "~/components/molecule/ShopPerformanceCard";
import TransactionSummaryCard from "~/components/molecule/TransactionSummaryCard";
import DashboardChart from "~/components/molecule/DashboardChart";
import DashboardCarousel from "~/components/molecule/DashboardCarousel";
import { mobileAppBarAtom } from "~/atom/layout";
import Divider from "@mui/material/Divider";

export default function DashboardSellerPage() {
  const { t } = useTranslation("dashboard");
  const [, setMobileAppBarAtom] = useAtom(mobileAppBarAtom);

  useEffect(() => {
    setMobileAppBarAtom({
      showPrev: false,
      content: t("mobileTitle"),
      showMenu: true,
    });
  }, [setMobileAppBarAtom, t]);

  return (
    <>
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
            }}
          >
            <DashboardStatCard
              icon={<MarketIcon />}
              title={t("card.sales.title")}
              subtitle={t("card.sales.subtitle", { count: 0 })}
              sx={{
                borderColor: "primary.main",
              }}
            />
            <DashboardStatCard
              icon={<EarningIcon />}
              title={t("card.earning.title")}
              subtitle={priceFormat(123456.789)}
            />
          </Box>
          <DashboardChart />
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
