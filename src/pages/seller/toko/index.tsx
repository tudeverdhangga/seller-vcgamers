import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "next-i18next";

import { priceFormat } from "~/utils/format";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

import DashboardStatCard from "~/components/atomic/DashboardStatCard";
import EarningIcon from "~/components/icons/svg/earningIcon.svg";
import MarketIcon from "~/components/icons/svg/marketPlaceIcon.svg";
import RevenueIcon from "~/components/icons/svg/revenueIcon.svg";
import DashboardTitle from "~/components/molecule/DashboardTitle";
import HelpContactCard from "~/components/molecule/HelpContactCard";
import ProductSummaryCard from "~/components/molecule/ProductSummaryCard";
import ShopPerformanceCard from "~/components/molecule/ShopPerformanceCard";
import TransactionSummaryCard from "~/components/molecule/TransactionSummaryCard";
import DashboardChart from "~/components/molecule/DashboardChart";
import DashboardCarousel from "~/components/molecule/DashboardCarousel";

export default function DashboardSellerPage() {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <DashboardTitle />
      <Grid container spacing="20px" sx={{ mb: "20px" }}>
        <Grid xs={12} sm={8}>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: "20px",
            }}
          >
            <DashboardStatCard
              icon={<MarketIcon />}
              title={t("card.sales.title")}
              subtitle={t("card.sales.subtitle", { count: 0 })}
            />
            <DashboardStatCard
              icon={<EarningIcon />}
              title={t("card.earning.title")}
              subtitle={priceFormat(123456.789)}
            />
            <DashboardStatCard
              icon={<RevenueIcon />}
              title={t("card.revenue.title")}
              subtitle={priceFormat(123456.789)}
            />
          </Box>
          <DashboardChart />
        </Grid>
        <Grid xs={12} sm={4}>
          <ShopPerformanceCard />
        </Grid>
      </Grid>

      <Grid container spacing="20px">
        <Grid xs={12} sm={6}>
          <TransactionSummaryCard />
        </Grid>
        <Grid xs={12} sm={6} order={{ xs: 3, sm: 2 }}>
          <DashboardCarousel />
        </Grid>
        <Grid xs={12} sm={6} order={{ xs: 2, sm: 3 }}>
          <ProductSummaryCard />
        </Grid>
        <Grid xs={12} sm={6} order={{ xs: 4, sm: 4 }}>
          <HelpContactCard />
        </Grid>
      </Grid>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["dashboard"]);
