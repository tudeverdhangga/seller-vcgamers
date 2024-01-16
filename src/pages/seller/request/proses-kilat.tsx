import React from "react";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Grid,
  Typography,
  Snackbar,
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
  DataKilat,
  ErrorResponse,
  SeverityType,
  useGetStatusKilat,
  useRequestKilat,
} from "~/services/api/request-fitur";
import {
  SellerStatusApproved,
  SellerStatusPending,
  SellerStatusRejected,
} from "~/utils/dummy/seller-status";
import VGHead from "~/components/atomic/VGHead";

export default function ProsesKilatPage() {
  const { t } = useTranslation("requestFitur");
  const [checkedSnK, setCheckedSnK] = React.useState(false);
  const [statusKilatData, setStatusKilatData] = React.useState<DataKilat>();
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
  const getStatusKilat = useGetStatusKilat();
  const postRequestKilat = useRequestKilat();

  React.useEffect(() => {
    if (
      getStatusKilat?.data?.data?.total_transaction !== undefined &&
      getStatusKilat?.data?.data?.total_success_transaction !== undefined &&
      getStatusKilat?.data?.data?.total_rate_transaction !== undefined
    ) {
      assignGetStatusKilat();
      // let numberSuccessTransactionPercentage = getStatusKilat.data?.data.total_transaction > 0 ? Math.ceil(getStatusKilat.data?.data.total_success_transaction/getStatusKilat.data?.data.total_transaction*100) : 0
      // setSuccessPercentageTransaction(numberSuccessTransactionPercentage)
    }
  }, [
    getStatusKilat?.data?.data?.total_transaction,
    getStatusKilat?.data?.data?.total_success_transaction,
    getStatusKilat?.data?.data?.total_rate_transaction,
    getStatusKilat?.data?.data?.request_status,
  ]);

  const assignGetStatusKilat = () => {
    if (
      getStatusKilat?.data?.data?.total_transaction !== undefined &&
      getStatusKilat?.data?.data?.total_success_transaction !== undefined &&
      getStatusKilat?.data?.data?.total_rate_transaction !== undefined &&
      getStatusKilat?.data?.data?.request_status !== undefined
    ) {
      setTotalTransaction(getStatusKilat.data?.data.total_transaction);
      setSuccessTransaction(
        getStatusKilat.data?.data.total_success_transaction
      );
      setSuccessPercentageTransaction(
        getStatusKilat.data?.data.total_rate_transaction
      );
      setStatusKilatData(getStatusKilat.data?.data);
    }
  };

  const UseHandleChangeCheck = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (getStatusKilat.data) {
        void getStatusKilat.refetch();
        if (
          getStatusKilat.data?.data.total_transaction >=
            minimumAllTransaction &&
          getStatusKilat.data?.data.total_success_transaction >=
            minimumSuccessPercentageTransaction &&
          getStatusKilat.data?.data.seller_has_kilat === false &&
          getStatusKilat.data?.data.request_status === ""
        ) {
          setCheckedSnK(event.target.checked);
        }
      }
    },
    [getStatusKilat.data?.data.total_transaction]
  );

  const UseClickRequest = () => {
    postRequestKilat.mutate(undefined, {
      onSuccess: (res) => {
        void getStatusKilat.refetch();
        setStatusKilatData(getStatusKilat?.data?.data);
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
    t("snk.bodyProskil.0"),
    t("snk.bodyProskil.1"),
    t("snk.bodyProskil.2"),
    t("snk.bodyProskil.3"),
  ];

  const rows = [
    {
      profit: t("tableComparison.rowsProskil.0.profit"),
      regular: t("tableComparison.rowsProskil.0.regular"),
    },
    {
      profit: t("tableComparison.rowsProskil.1.profit"),
      regular: t("tableComparison.rowsProskil.1.regular"),
    },
    {
      profit: t("tableComparison.rowsProskil.2.profit"),
      regular: t("tableComparison.rowsProskil.2.regular"),
    },
    {
      profit: t("tableComparison.rowsProskil.3.profit"),
      regular: t("tableComparison.rowsProskil.3.regular"),
    },
    {
      profit: t("tableComparison.rowsProskil.4.profit"),
      regular: t("tableComparison.rowsProskil.4.regular"),
    },
  ];

  const featureRequests = [
    {
      imageSrc: t("featureRequestsKilat.0.imageSrc"),
      title: t("featureRequestsKilat.0.title"),
      subtitle: t("featureRequestsKilat.0.subtitle"),
    },
    {
      imageSrc: t("featureRequestsKilat.1.imageSrc"),
      title: t("featureRequestsKilat.1.title"),
      subtitle: t("featureRequestsKilat.1.subtitle"),
    },
    {
      imageSrc: t("featureRequestsKilat.2.imageSrc"),
      title: t("featureRequestsKilat.2.title"),
      subtitle: t("featureRequestsKilat.2.subtitle"),
    },
    {
      imageSrc: t("featureRequestsKilat.3.imageSrc"),
      title: t("featureRequestsKilat.3.title"),
      subtitle: t("featureRequestsKilat.3.subtitle"),
    },
  ];

  return (
    <>
      <VGHead>{t("head.kilat")}</VGHead>
      {/* Page Title */}
      <VGPageTitle subTitle={t("title")} title={t("subtitleProskil")} />

      {/* Banner */}
      <BannerRequestFeatures
        imageSrc={`url("/assets/request_proskil_banner.png")`}
        subtitleImageSrc="/assets/logo-proskil.png"
        title={t("banner.title")}
        desc={t("banner.descProskil")}
      />

      {/* Feature Images */}
      <CardImageRequestFeatures featureRequests={featureRequests} />

      {/* Table Features */}
      <TableRequestFeatures
        rowsFeatures={rows}
        feature="Proses Kilat"
        badgeSrc="/assets/proskil-logo.png"
      />

      {/* SnK */}
      <CustomizedMidContent
        title={t("snk.title")}
        stringContents={subSnKValues}
      />

      {/* Request Fitur */}
      <RequestFeatureCondition
        featureName="Proses Kilat"
        totalAllTransaction={totalTransaction}
        totalSuccessTransaction={successTransaction}
        minimumAllTransaction={minimumAllTransaction}
        minimumSuccessPercentageTransaction={
          minimumSuccessPercentageTransaction
        }
        successPercentageTransaction={
          getStatusKilat.data?.data?.total_rate_transaction
            ? getStatusKilat.data?.data.total_rate_transaction
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
                statusKilatData &&
                (statusKilatData.total_transaction >=
                  minimumAllTransaction &&
                statusKilatData.total_success_transaction >=
                  minimumSuccessPercentageTransaction &&
                statusKilatData.seller_has_kilat === false &&
                statusKilatData.request_status === "")
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
          {statusKilatData &&
            statusKilatData.request_status === SellerStatusRejected && (
              <CustomizedPermissionAlert
                alertSeverity="error"
                alertIcon={<CancelIcon fontSize="inherit" />}
                alertMessage={
                  t("alert.inactive.subhead") + statusKilatData.reject_reason
                }
                alertTitle={t("alert.inactive.title", {
                  featurename: "Proses Kilat",
                })}
              />
            )}

          {/* Permission Actived */}
          {statusKilatData &&
            (statusKilatData.request_status === SellerStatusApproved ||
              statusKilatData.seller_has_kilat) && (
              <CustomizedPermissionAlert
                alertSeverity="success"
                alertIcon={<CheckCircleIcon fontSize="inherit" />}
                alertMessage={t("alert.already.msg", {
                  featurename: "Proses Kilat",
                })}
              />
            )}

          {/* Permission Requested */}
          {statusKilatData &&
            statusKilatData.request_status === SellerStatusPending && (
              <CustomizedPermissionAlert
                alertSeverity="info"
                alertIcon={<PageviewIcon fontSize="inherit" />}
                alertMessage={t("alert.requested.msg", {
                  featurename: "Proses Kilat",
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
