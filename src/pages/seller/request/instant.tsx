import React from "react";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Grid,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PageviewIcon from "@mui/icons-material/Pageview";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import TableRequestFeatures from "~/components/organism/TableRequestFeatures";
import BannerRequestFeatures from "~/components/organism/BannerRequestFeatures";
import CardImageRequestFeatures from "~/components/organism/CardImageRequestFeatures";
import RequestFeatureCondition from "~/components/organism/RequestFeatureCondition";
import CustomizedMidContent from "~/components/organism/MidContentRequestFeatures";
import CustomizedPermissionAlert from "~/components/organism/PermissionAlertRequestFeature";
import { toastOption } from "~/utils/toast";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import ContentCard from "~/components/molecule/ContentCard";
import {
  DataInstant,
  ErrorResponse,
  SeverityType,
  useGetStatusInstant,
  useRequestInstant,
} from "~/services/api/request-fitur";
import {
  SellerStatusApproved,
  SellerStatusPending,
  SellerStatusRejected,
} from "~/utils/dummy/seller-status";
import VGHead from "~/components/atomic/VGHead";

export default function InstantPage() {
  const { t } = useTranslation("requestFitur");
  const [checkedSnK, setCheckedSnK] = React.useState(false);
  const [statusInstantData, setStatusInstantData] =
    React.useState<DataInstant>();
  const [totalTransaction, setTotalTransaction] = React.useState(0);
  const [successTransaction, setSuccessTransaction] = React.useState(0);
  const [minimumAllTransaction, setMinimumAllTransaction] = React.useState(50);
  const [
    minimumSuccessPercentageTransaction,
    setMinimumSuccessPercentageTransaction,
  ] = React.useState(90);
  const [successPercentageTransaction, setSuccessPercentageTransaction] =
    React.useState(50);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [severityAlert, setSeverityAlert] =
    React.useState<SeverityType>("error");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const getStatusInstant = useGetStatusInstant();
  const postRequestInstant = useRequestInstant();

  React.useEffect(() => {
    void getStatusInstant.refetch();
    assignGetStatusInstant();
  }, [
    getStatusInstant?.data?.data?.total_transaction,
    getStatusInstant?.data?.data?.total_success_transaction,
    getStatusInstant?.data?.data?.total_rate_transaction,
    getStatusInstant?.data?.data?.request_status,
  ]);

  const assignGetStatusInstant = () => {
    if (
      getStatusInstant?.data?.data?.total_transaction !== undefined &&
      getStatusInstant?.data?.data?.total_success_transaction !== undefined &&
      getStatusInstant?.data?.data?.total_rate_transaction !== undefined &&
      getStatusInstant?.data?.data?.request_status !== undefined
    ) {
      setTotalTransaction(getStatusInstant.data?.data.total_transaction);
      setSuccessTransaction(
        getStatusInstant.data?.data.total_success_transaction
      );
      setSuccessPercentageTransaction(
        getStatusInstant.data?.data.total_rate_transaction
      );
      setStatusInstantData(getStatusInstant.data?.data);
    }
  };

  const UseHandleChangeCheck = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (getStatusInstant.data) {
        void getStatusInstant.refetch();
        if (
          getStatusInstant.data?.data.total_transaction >=
            minimumAllTransaction &&
          getStatusInstant.data?.data.total_success_transaction >=
            minimumSuccessPercentageTransaction &&
          getStatusInstant.data?.data.seller_has_instant === false &&
          getStatusInstant.data?.data.request_status === ""
        ) {
          setCheckedSnK(event.target.checked);
        }
      }
    },
    [getStatusInstant.data?.data.total_transaction]
  );

  const UseClickRequest = () => {
    postRequestInstant.mutate(undefined, {
      onSuccess: (res) => {
        void getStatusInstant.refetch();
        setStatusInstantData(getStatusInstant?.data?.data);
        toast.success(res?.message, toastOption);
      },
      onError: (error) => {
        const err = error as ErrorResponse;
        setAlertMessage(err?.response?.data?.message);
        setSeverityAlert("error");
        setOpenSnackbar(true);
      },
    });
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
      profit: t("tableComparison.rowsInstant.0.profit"),
      regular: t("tableComparison.rowsInstant.0.regular"),
    },
    {
      profit: t("tableComparison.rowsInstant.1.profit"),
      regular: t("tableComparison.rowsInstant.1.regular"),
    },
    {
      profit: t("tableComparison.rowsInstant.2.profit"),
      regular: t("tableComparison.rowsInstant.2.regular"),
    },
    {
      profit: t("tableComparison.rowsInstant.3.profit"),
      regular: t("tableComparison.rowsInstant.3.regular"),
    },
    {
      profit: t("tableComparison.rowsInstant.4.profit"),
      regular: t("tableComparison.rowsInstant.4.regular"),
    },
    {
      profit: t("tableComparison.rowsInstant.5.profit"),
      regular: t("tableComparison.rowsInstant.5.regular"),
    },
    {
      profit: t("tableComparison.rowsInstant.6.profit"),
      regular: t("tableComparison.rowsInstant.6.regular"),
    },
  ];

  const featureRequests = [
    {
      imageSrc: t("featureRequestsInstant.0.imageSrc"),
      title: t("featureRequestsInstant.0.title"),
      subtitle: t("featureRequestsInstant.0.subtitle"),
    },
    {
      imageSrc: t("featureRequestsInstant.1.imageSrc"),
      title: t("featureRequestsInstant.1.title"),
      subtitle: t("featureRequestsInstant.1.subtitle"),
    },
    {
      imageSrc: t("featureRequestsInstant.2.imageSrc"),
      title: t("featureRequestsInstant.2.title"),
      subtitle: t("featureRequestsInstant.2.subtitle"),
    },
    {
      imageSrc: t("featureRequestsInstant.3.imageSrc"),
      title: t("featureRequestsInstant.3.title"),
      subtitle: t("featureRequestsInstant.3.subtitle"),
    },
  ];

  return (
    <>
      <VGHead>{t("head.instant")}</VGHead>
      {/* Page Title */}
      <VGPageTitle subTitle={t("title")} title={t("subtitleInstant")} />

      {/* Banner */}
      <BannerRequestFeatures
        imageSrc={`url("/assets/request_instant_banner.png")`}
        subtitleImageSrc="/assets/instant-logo.png"
        title={t("banner.title")}
        desc={t("banner.descInstant")}
      />

      {/* Feature Images */}
      <CardImageRequestFeatures featureRequests={featureRequests} />

      {/* Table Features */}
      <TableRequestFeatures
        rowsFeatures={rows}
        feature="Instant"
        badgeSrc="/assets/badge-instant.svg"
      />

      {/* SnK */}
      <CustomizedMidContent
        title={t("snk.title")}
        stringContents={subSnKValues}
      />

      {/* Request Fitur */}
      <RequestFeatureCondition
        featureName="Instant"
        totalAllTransaction={totalTransaction}
        totalSuccessTransaction={successTransaction}
        minimumAllTransaction={minimumAllTransaction}
        minimumSuccessPercentageTransaction={
          minimumSuccessPercentageTransaction
        }
        successPercentageTransaction={
          getStatusInstant.data?.data?.total_rate_transaction
            ? getStatusInstant.data?.data.total_rate_transaction
            : successPercentageTransaction
        }
      />

      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item xs={12}>
          {/* Permission Request */}
          <ContentCard
            sx={{
              boxShadow: "none",
              p: 1,
              px: 2,
              display:
                statusInstantData &&
                (statusInstantData.total_transaction >=
                  minimumAllTransaction &&
                statusInstantData.total_success_transaction >=
                  minimumSuccessPercentageTransaction &&
                statusInstantData.seller_has_instant === false &&
                statusInstantData.request_status === "")
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
              <Grid item xs={12} sm={9}>
                <Checkbox
                  checked={checkedSnK}
                  onChange={UseHandleChangeCheck}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography
                  gutterBottom
                  component="span"
                  sx={confirmationAlertMessageStyle}
                >
                  {t("alert.confirmation.msg")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="contained"
                  fullWidth
                  color={checkedSnK ? "success" : "secondary"}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    display: { sm: "block" },
                    color: "white",
                  }}
                  disabled={!checkedSnK}
                  onClick={UseClickRequest}
                >
                  {t("alert.confirmation.btn")}
                </Button>
              </Grid>
            </Grid>
          </ContentCard>

          {/* Permission Nonactive */}
          {statusInstantData &&
            statusInstantData.request_status === SellerStatusRejected && (
              <CustomizedPermissionAlert
                alertSeverity="error"
                alertIcon={<CancelIcon fontSize="inherit" />}
                alertMessage={
                  t("alert.inactive.subhead") + statusInstantData.reject_reason
                }
                alertTitle={t("alert.inactive.title", {
                  featurename: "Proses Instant",
                })}
              />
            )}

          {/* Permission Actived */}
          {statusInstantData &&
            (statusInstantData.request_status === SellerStatusApproved ||
              statusInstantData.seller_has_instant) && (
              <CustomizedPermissionAlert
                alertSeverity="success"
                alertIcon={<CheckCircleIcon fontSize="inherit" />}
                alertMessage={t("alert.already.msg", {
                  featurename: "Proses Instant",
                })}
              />
            )}

          {/* Permission Requested */}
          {statusInstantData &&
            statusInstantData.request_status === SellerStatusPending && (
              <CustomizedPermissionAlert
                alertSeverity="info"
                alertIcon={<PageviewIcon fontSize="inherit" />}
                alertMessage={t("alert.requested.msg", {
                  featurename: "Proses Instant",
                })}
              />
            )}
        </Grid>
      </Grid>

      {/* for Alerting */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severityAlert}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace([
  "requestFitur",
]);
