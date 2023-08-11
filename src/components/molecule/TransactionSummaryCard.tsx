import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import { useGetDashboardTransactionSummary } from "~/services/dashboard/hooks";
import DashboardCard from "../atomic/DashboardCard";

export default function TransactionSummaryCard() {
  const { t } = useTranslation("dashboard");
  const { data } = useGetDashboardTransactionSummary();

  return (
    <DashboardCard
      title={t("card.transactionSummary.title")}
      sx={{ height: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <TransactionSummaryItem
          title={data?.data.total_pending}
          color="#FBC122"
          subtitle={t("card.transactionSummary.body.pending")}
        />
        <TransactionSummaryItem
          title={data?.data.total_sent}
          color="#54A6E8"
          subtitle={t("card.transactionSummary.body.sent")}
        />
        <TransactionSummaryItem
          title={data?.data.total_success}
          color="#399A4A"
          subtitle={t("card.transactionSummary.body.success")}
        />
        <TransactionSummaryItem
          title={data?.data.total_moderation}
          color="#FB3336"
          subtitle={t("card.transactionSummary.body.moderation")}
        />
      </Box>
    </DashboardCard>
  );
}

function TransactionSummaryItem(props: {
  title?: string | number;
  color: string;
  subtitle: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1 0 0",
        alignSelf: "stretch",
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: props.color }}>
        {props.title}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: "common.shade.700",
          textAlign: "center",
        }}
      >
        {props.subtitle}
      </Typography>
    </Box>
  );
}
