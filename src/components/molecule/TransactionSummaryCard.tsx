import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DashboardCard from "../atomic/DashboardCard";

export default function TransactionSummaryCard() {
  return (
    <DashboardCard title="Ringkasan Transaksi">
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <TransactionSummaryItem
          title="20"
          color="#FBC122"
          subtitle="Perlu Diproses"
        />
        <TransactionSummaryItem
          title="20"
          color="common.hub.1"
          subtitle="Diproses"
        />
        <TransactionSummaryItem title="20" color="#54A6E8" subtitle="Dikirim" />
        <TransactionSummaryItem title="20" color="#399A4A" subtitle="Selesai" />
        <TransactionSummaryItem
          title="20"
          color="#FB3336"
          subtitle="Komplain"
        />
      </Box>
    </DashboardCard>
  );
}

function TransactionSummaryItem(props: {
  title: string;
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
        sx={{ fontSize: 14, fontWeight: 600, color: "common.shade.700" }}
      >
        {props.subtitle}
      </Typography>
    </Box>
  );
}
