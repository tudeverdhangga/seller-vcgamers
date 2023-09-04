import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import { useGetDashboardSellerPerformance } from "~/services/dashboard/hooks";
import DashboardCard from "../atomic/DashboardCard";
import DashboardStatDescription from "../atomic/DashboardStatDescription";
import LightTooltip from "../atomic/LightToolTip";
import DeliveryTimeIcon from "../icons/svg/deliveryTime.svg";
import ShopRatingIcon from "../icons/svg/shopRating.svg";
import TransactionSuccessIcon from "../icons/svg/transactionSuccess.svg";
import VisitorCountIcon from "../icons/svg/visitorCount.svg";
import DashboardPerformanceHelpToolTip from "./DashboardPerformanceHelpToolTip";

export default function ShopPerformanceCard() {
  const { t } = useTranslation("dashboard");
  const { data } = useGetDashboardSellerPerformance();

  return (
    <DashboardCard
      title={t("card.performance.title")}
      titleTrailing={<DashboardPerformanceHelpToolTip />}
      sx={{ height: "100%", gap: 0 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: "10px",
          width: "100%",
          height: "100%",
        }}
      >
        {data ? (
          <PerformanceCard
            icon={<ShopRatingIcon />}
            title={t("card.performance.body.shopRating")}
            subtitle={data.data.rating}
            tooltip={t("tooltip.shopRating")}
            stat={data.data.rating_diff}
          />
        ) : (
          <Skeleton variant="rounded" height={24} />
        )}
        <Divider />
        {data ? (
          <PerformanceCard
            icon={<TransactionSuccessIcon />}
            title={t("card.performance.body.transactionSuccess")}
            subtitle={data.data.transaction_success_rate}
            tooltip={t("tooltip.transactionSuccess")}
            stat={data.data.transaction_success_rate_diff}
          />
        ) : (
          <Skeleton variant="rounded" height={24} />
        )}
        <Divider />
        {data ? (
          <PerformanceCard
            icon={<DeliveryTimeIcon />}
            title={t("card.performance.body.deliveryTime")}
            subtitle={data.data.average_sla}
            tooltip={t("tooltip.deliveryTime")}
            stat={data.data.average_sla_diff}
          />
        ) : (
          <Skeleton variant="rounded" height={24} />
        )}
        <Divider />
        {data ? (
          <PerformanceCard
            icon={<VisitorCountIcon />}
            title={t("card.performance.body.visitorCount")}
            subtitle={data.data.total_visitor}
            tooltip={t("tooltip.visitorCount")}
            stat={data.data.total_visitor_diff}
          />
        ) : (
          <Skeleton variant="rounded" height={24} />
        )}
      </Box>
    </DashboardCard>
  );
}

function PerformanceCard(props: {
  icon: JSX.Element;
  title: string;
  subtitle?: string | number;
  tooltip: string;
  stat: Parameters<typeof DashboardStatDescription>[0];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignSelf: "stretch",
        flexDirection: "column",
        py: { sm: "20px", xs: "10px" },
        gap: "5px",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          gap: "10px",
          alignItems: "baseline",
        }}
      >
        {props.icon}
        <Box sx={{ display: "flex", gap: "5px", alignItems: "baseline" }}>
          <LightTooltip title={props.tooltip}>
            <Typography
              sx={{
                color: "common.shade.200",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {props.title}
            </Typography>
          </LightTooltip>
          <Typography
            sx={{ color: "primary.main", fontSize: 16, fontWeight: 600 }}
          >
            {props.subtitle}
          </Typography>
        </Box>
      </Box>
      <DashboardStatDescription {...props.stat} sx={{ ml: 3 }} />
    </Box>
  );
}
