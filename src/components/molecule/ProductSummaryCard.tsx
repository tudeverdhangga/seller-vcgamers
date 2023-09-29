import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { useTranslation } from "next-i18next";
import Image from "next/image";

import { useGetDashboardProductStat } from "~/services/dashboard/hooks";
import DashboardCard from "../atomic/DashboardCard";
import CubeIcon from "../icons/svg/cube.svg";
import Link from "next/link";

export default function ProductSummaryCard() {
  const { t } = useTranslation("dashboard");
  const { data } = useGetDashboardProductStat();

  return (
    <DashboardCard title={t("card.myProduct.title")}>
      <Grid container spacing="10px" sx={{ alignSelf: "stretch" }}>
        <Grid xs={12} sm={6}>
          <ActiveProductSummaryCard
            active={{
              title: t("card.myProduct.body.active"),
              value: data?.data.total_active,
            }}
            nonactive={{
              title: t("card.myProduct.body.nonactive"),
              value: data?.data.total_inactive,
            }}
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <SummaryCard
            title={t("card.myProduct.body.nearEmpty")}
            titleTrailing={
              <Image
                src="/assets/redAlert.gif"
                alt={"Alert"}
                width={8}
                height={15}
              />
            }
            subtitle={data?.data.total_stock_run_out}
            color="common.red.500"
            status="3"
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <SummaryCard
            title={t("card.myProduct.body.review")}
            subtitle={data?.data.total_review}
            color="primary.main"
            status=""
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

function ActiveProductSummaryCard(props: {
  active: {
    title?: string | number;
    value?: string | number;
  };
  nonactive: {
    title?: string | number;
    value?: string | number;
  };
}) {
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "10px",
        border: "1px solid",
        borderColor: "primary.light",
        p: "10px",
        gap: "10px",
        flexDirection: "row",
        flex: "1 0 0",
      }}
    >
      <Link
        href={{
          pathname: "/seller/produk/kelola-produk",
          query: { status: "1" },
        }}
        style={{ textDecoration: "none" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                color: "common.shade.700",
                fontSize: { sm: 14, xs: 12 },
                fontWeight: 600,
              }}
            >
              {props.active.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <CubeIcon />
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: { sm: 18, xs: 16 },
              }}
            >
              {props.active.value}
            </Typography>
          </Box>
        </Box>
      </Link>

      <Link
        href={{
          pathname: "/seller/produk/kelola-produk",
          query: { status: "2" },
        }}
        style={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid",
            borderColor: "common.shade.50",
            pl: "10px",
            flex: "1 0 0",
          }}
        >
          <Typography
            sx={{
              color: "common.shade.700",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {props.nonactive.title}
          </Typography>
          <Typography
            sx={{ color: "common.red.500", fontWeight: 700, fontSize: 18 }}
          >
            {props.nonactive.value}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}

function SummaryCard(props: {
  title: string;
  titleTrailing?: JSX.Element;
  subtitle?: string | number;
  color: string;
  status: string;
}) {
  return (
    <Link
      href={{
        pathname: "/seller/produk/kelola-produk",
        query: { status: props.status },
      }}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid",
          borderColor: "primary.light",
          flex: "1 0 0",
          p: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              color: "common.shade.700",
              fontSize: { sm: 14, xs: 12 },
              fontWeight: 600,
            }}
          >
            {props.title}
          </Typography>
          {props.titleTrailing}
        </Box>
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <CubeIcon />
          <Typography
            sx={{
              color: props.color,
              fontWeight: 700,
              fontSize: { sm: 18, xs: 16 },
            }}
          >
            {props.subtitle}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
