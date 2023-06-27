import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useTranslation } from "next-i18next";

import DashboardCard from "../atomic/DashboardCard";
import DeliveryTimeIcon from "../icons/svg/deliveryTime.svg";
import ShopRatingIcon from "../icons/svg/shopRating.svg";
import TransactionSuccessIcon from "../icons/svg/transactionSuccess.svg";
import VisitorCountIcon from "../icons/svg/visitorCount.svg";

export default function ShopPerformanceCard() {
  const { t } = useTranslation("dashboard");

  return (
    <DashboardCard title={t("card.performance.title")} sx={{ flex: "1 0 0" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
          alignSelf: "stretch",
        }}
      >
        <PerformanceCard
          icon={<ShopRatingIcon />}
          title={t("card.performance.body.shopRating")}
          subtitle="5.00"
        />
        <PerformanceCard
          icon={<TransactionSuccessIcon />}
          title={t("card.performance.body.transactionSuccess")}
          subtitle={"100%"}
        />
        <PerformanceCard
          icon={<DeliveryTimeIcon />}
          title={t("card.performance.body.deliveryTime")}
          subtitle="± 32 menit"
        />
        <PerformanceCard
          icon={<VisitorCountIcon />}
          title={t("card.performance.body.visitorCount")}
          subtitle="234"
        />
      </Box>
    </DashboardCard>
  );
}

function PerformanceCard(props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        px: "20px",
        py: { sm: "20px", xs: "10px" },
        gap: "5px",
        border: "1px solid",
        borderColor: "primary.light",
        borderRadius: "10px",
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
          <Typography
            sx={{
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {props.title}
          </Typography>
          <Typography
            sx={{ color: "primary.main", fontSize: 16, fontWeight: 600 }}
          >
            {props.subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
