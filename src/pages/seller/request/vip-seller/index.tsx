import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Box, Button, Checkbox, Grid, Typography } from "@mui/material";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import ContentCard from "~/components/molecule/ContentCard";
import BannerRequestFeatures from "~/components/organism/BannerRequestFeatures";
import CustomizedPermissionAlert from "~/components/organism/PermissionAlertRequestFeature";
import TableRequestFeatures from "~/components/organism/TableRequestFeatures";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PageviewIcon from "@mui/icons-material/Pageview";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import CustomizedMidContent from "~/components/organism/MidContentRequestFeatures";
import ModalRegistrationVIP from "~/components/molecule/ModalRegistrationVIP";
import {
  DataVIP,
  FeatureChecksType,
  useGetStatusVIP,
} from "~/services/api/request-fitur";
import {
  SellerStatusApproved,
  SellerStatusDeactivated,
  SellerStatusPending,
  SellerStatusRejected,
} from "~/utils/dummy/seller-status";
import SendVIPRequestDialog from "~/components/molecule/SendVIPRequestDialog";
import VGHead from "~/components/atomic/VGHead";

export default function VIPSellerPage() {
  const { t } = useTranslation("requestFitur");
  const [checkedSnK, setCheckedSnK] = React.useState(false);
  const [isOpenRegisterVip, setIsOpenRegisterVip] = React.useState(false);
  const [statusVIPData, setStatusVIPData] = React.useState<DataVIP>();
  const [featureChecksVIPData, setFeatureChecksVIPData] = React.useState<
    FeatureChecksType[]
  >([]);
  const [allFeatureCheck, setAllFeatureCheck] = React.useState(false);
  const [minimumTrueCounter, setMinimumTrueCounter] = React.useState(7);
  const getStatusVIP = useGetStatusVIP();
  const router = useRouter();

  React.useEffect(() => {
    if (
      getStatusVIP?.data?.data &&
      getStatusVIP?.data?.data?.seller_has_vip !== undefined &&
      getStatusVIP?.data?.data?.status !== undefined
    ) {
      const tempFeatureChecksVIPData = getStatusVIP.data.data.requirement_text;
      setFeatureChecksVIPData(tempFeatureChecksVIPData);

      setStatusVIPData(getStatusVIP.data.data);
      // setFeatureChecksVIPData(getStatusVIP?.data?.data?.requirement_text)

      if (
        handleEligibleToRegisterVip(tempFeatureChecksVIPData) ==
          minimumTrueCounter &&
        getStatusVIP.data.data?.seller_has_vip === true
      ) {
        void router.push(`/seller/request/vip-seller/join-campaign`);
      }
    }
  }, [
    getStatusVIP?.data?.data?.seller_has_vip,
    getStatusVIP?.data?.data?.status,
    getStatusVIP?.data?.data?.requirement_text,
  ]);

  const refetchStatusVIP = () => {
    void getStatusVIP.refetch();
  };

  const handleModalRegisterVip = () => {
    setIsOpenRegisterVip(!isOpenRegisterVip);
  };

  const handleChangeSnK = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      handleEligibleToRegisterVip(featureChecksVIPData) >= minimumTrueCounter
    ) {
      setCheckedSnK(event.target.checked);
    }
  };

  const confirmationAlertMessageStyle = {
    color: "common.shade.200",
    fontSize: { xs: "12px", md: "14px" },
    fontWeight: 800,
  };

  const subSnKValues = [
    t("snk.bodyInstant.0"),
    t("snk.bodyInstant.1"),
    t("snk.bodyInstant.2"),
    t("snk.bodyInstant.3"),
    t("snk.bodyInstant.4"),
  ];

  const rows = [
    {
      profit: t("tableComparison.rowsVip.0.profit"),
      regular: t("tableComparison.rowsVip.0.regular"),
    },
    {
      profit: t("tableComparison.rowsVip.1.profit"),
      regular: t("tableComparison.rowsVip.1.regular"),
    },
    {
      profit: t("tableComparison.rowsVip.2.profit"),
      regular: t("tableComparison.rowsVip.2.regular"),
    },
    {
      profit: t("tableComparison.rowsVip.3.profit"),
      regular: t("tableComparison.rowsVip.3.regular"),
    },
  ];

  const handleEligibleToRegisterVip = (
    featureChecksVIPDataCheck: FeatureChecksType[]
  ) => {
    let trueCounterCount = 0;
    featureChecksVIPDataCheck.map((val) => {
      if (val.active === true) {
        trueCounterCount += 1;
      }
    });

    return trueCounterCount;
  };

  return (
    <>
      <VGHead>{t("head.vip")}</VGHead>
      {/* Page Title */}
      <VGPageTitle subTitle={t("title")} title={t("subtitleVIP")} />

      {/* Banner */}
      <BannerRequestFeatures
        imageSrc={`url("/assets/vip_hero_bg.png")`}
        title="Upgrade Tokomu ke VIP Seller dan Nikmati Berbagai Keuntungan berjualan"
        desc="Persembahan VCGamers untuk kamu para seller supaya makin semangat berjualan. Dengan status VIP Seller dapatkan banyak manfaat berjualan di VCGamers"
      />

      {/* Table Features */}
      <TableRequestFeatures
        rowsFeatures={rows}
        feature="Instant"
        badgeSrc="/assets/vip-head-logo.png"
      />

      {/* Persyaratan kelengkapan */}
      <CustomizedMidContent
        title={t("syaratVip.title")}
        featureChecks={featureChecksVIPData}
      />

      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item xs={12}>
          {/* Permission Request */}
          <ContentCard
            sx={{
              p: 1,
              display:
                handleEligibleToRegisterVip(featureChecksVIPData) >=
                  minimumTrueCounter &&
                statusVIPData?.seller_has_vip === false &&
                (statusVIPData?.status === "" ||
                  statusVIPData?.status === SellerStatusRejected)
                  ? "flex"
                  : "none",
            }}
          >
            <Grid
              container
              spacing={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item xs={8} sm={10}>
                <Checkbox
                  checked={checkedSnK}
                  onChange={handleChangeSnK}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography
                  gutterBottom
                  component="span"
                  sx={confirmationAlertMessageStyle}
                >
                  {t("alert.upgradeVip.msg")}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  fullWidth
                  color={checkedSnK ? "success" : "secondary"}
                  sx={{
                    textTransform: "none",
                    display: { sm: "block" },
                    color: "white",
                  }}
                  disabled={!checkedSnK}
                  onClick={() => handleModalRegisterVip()}
                >
                  {t("alert.upgradeVip.btn")}
                </Button>
              </Grid>
            </Grid>
          </ContentCard>

          {/* Permission Deactivated */}
          {statusVIPData &&
            statusVIPData.status === SellerStatusDeactivated &&
            statusVIPData.deactivate_reason && (
              <CustomizedPermissionAlert
                alertSeverity="error"
                alertIcon={<CancelIcon fontSize="inherit" />}
                alertMessage={statusVIPData.deactivate_reason}
                alertTitle={t("alert.inactive.title", { featurename: "VIP" })}
              />
            )}

          {/* Permission Rejected */}
          {statusVIPData &&
            statusVIPData.status === SellerStatusRejected &&
            statusVIPData.reject_reason && (
              <CustomizedPermissionAlert
                alertSeverity="error"
                alertIcon={<CancelIcon fontSize="inherit" />}
                alertMessage={statusVIPData.reject_reason}
                alertTitle={t("alert.rejected.danger")}
              />
            )}

          {/* Permission Actived */}
          {statusVIPData &&
            (statusVIPData.status === SellerStatusApproved ||
              statusVIPData.seller_has_vip) && (
              <CustomizedPermissionAlert
                alertSeverity="success"
                alertIcon={<CheckCircleIcon fontSize="inherit" />}
                alertMessage={t("alert.already.msg", { featurename: "VIP" })}
              />
            )}

          {/* Permission Requested */}
          {statusVIPData && statusVIPData.status === SellerStatusPending && (
            <CustomizedPermissionAlert
              alertSeverity="info"
              alertIcon={<PageviewIcon fontSize="inherit" />}
              alertMessage={t("alert.requested.msg", { featurename: "VIP" })}
            />
          )}

          {/* Modal Ragister VIP */}
          <ModalRegistrationVIP
            name={t("modalRegisterVIP.title")}
            isOpen={isOpenRegisterVip}
            handleClose={handleModalRegisterVip}
            refetchStatusVIP={refetchStatusVIP}
          />
          {/* Modal confirmation of registration VIP */}
          <SendVIPRequestDialog />
        </Grid>
      </Grid>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace([
  "requestFitur",
]);
