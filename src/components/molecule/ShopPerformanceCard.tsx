import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useTranslation } from "next-i18next";

import DashboardCard from "../atomic/DashboardCard";
import HelpToolTip from "../atomic/HelpToolTip";
import DeliveryTimeIcon from "../icons/svg/deliveryTime.svg";
import ShopRatingIcon from "../icons/svg/shopRating.svg";
import TransactionSuccessIcon from "../icons/svg/transactionSuccess.svg";
import VisitorCountIcon from "../icons/svg/visitorCount.svg";
import DashboardStatDescription from "../atomic/DashboardStatDescription";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import LightTooltip from "../atomic/LightToolTip";
import DashboardPerformanceHelpToolTip from "./DashboardPerformanceHelpToolTip";

export default function ShopPerformanceCard() {
  const { t } = useTranslation("dashboard");

  return (
    <DashboardCard
      title={t("card.performance.title")}
      titleTrailing={<DashboardPerformanceHelpToolTip />}
      sx={{ height: "100%", gap: 0 }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
        disablePadding
      >
        <ListItem disablePadding>
          <PerformanceCard
            icon={<ShopRatingIcon />}
            title={t("card.performance.body.shopRating")}
            subtitle="5.00"
            tooltip={t("tooltip.shopRating")}
            stat={{ type: "decrease", value: "-0.5" }}
          />
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <PerformanceCard
            icon={<TransactionSuccessIcon />}
            title={t("card.performance.body.transactionSuccess")}
            subtitle={"100%"}
            tooltip={t("tooltip.transactionSuccess")}
            stat={{ type: "increase", value: "+2%" }}
          />
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <PerformanceCard
            icon={<DeliveryTimeIcon />}
            title={t("card.performance.body.deliveryTime")}
            subtitle="± 32 menit"
            tooltip={t("tooltip.deliveryTime")}
            stat={{ type: "decrease", value: "+12 Menit" }}
          />
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <PerformanceCard
            icon={<VisitorCountIcon />}
            title={t("card.performance.body.visitorCount")}
            subtitle="234"
            tooltip={t("tooltip.visitorCount")}
            stat={{ type: "equal" }}
          />
        </ListItem>
      </List>
    </DashboardCard>
  );
}

function PerformanceCard(props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
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
