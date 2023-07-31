
import { useTranslation } from "next-i18next";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import { Button, Checkbox, Grid, Snackbar, Typography, Alert } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageviewIcon from '@mui/icons-material/Pageview';
import VGPageTitle from "~/components/atomic/VGPageTitle";
import TableRequestFeatures from "~/components/organism/TableRequestFeatures";
import BannerRequestFeatures from "~/components/organism/BannerRequestFeatures";
import CardImageRequestFeatures from "~/components/organism/CardImageRequestFeatures";
import RequestFeatureCondition from "~/components/organism/RequestFeatureCondition";
import CustomizedMidContent from "~/components/organism/MidContentRequestFeatures";
import CustomizedPermissionAlert from "~/components/organism/PermissionAlertRequestFeature";
import React from "react";
import ContentCard from "~/components/molecule/ContentCard";
import { DataInstant, SeverityType, useGetStatusInstant, useRequestInstant } from "~/services/api/request-fitur";
import { SellerStatusApproved, SellerStatusPending, SellerStatusRejected } from "~/utils/dummy/seller-status";


export default function InstantPage() {
  const { t } = useTranslation("requestFitur");
  const [checkedSnK, setCheckedSnK] = React.useState(false);
  const [statusInstantData, setStatusInstantData] = React.useState<DataInstant>();
  const [totalTransaction, setTotalTransaction] = React.useState(0);
  const [successTransaction, setSuccessTransaction] = React.useState(0);
  const [minimumAllTransaction, setMinimumAllTransaction] = React.useState(50);
  const [minimumSuccessPercentageTransaction, setMinimumSuccessPercentageTransaction] = React.useState(90);
  const [successPercentageTransaction, setSuccessPercentageTransaction] = React.useState(50);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [severityAlert, setSeverityAlert] = React.useState<SeverityType>("error");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const getStatusInstant = useGetStatusInstant();

  React.useEffect(() => {
    if(getStatusInstant?.data?.data?.total_transaction !== undefined && getStatusInstant?.data?.data?.total_success_transaction !== undefined && getStatusInstant?.data?.data?.total_rate_transaction !== undefined) {
      setTotalTransaction(getStatusInstant.data?.data.total_transaction)
      setSuccessTransaction(getStatusInstant.data?.data.total_success_transaction)
      setSuccessPercentageTransaction(getStatusInstant.data?.data.total_rate_transaction)
      setStatusInstantData(getStatusInstant.data?.data);
    }
  }, [
    // getStatusInstant?.data?.data,
  ])

  const handleChangeSnK = (event: React.ChangeEvent<HTMLInputElement>) => {
    const getStatusInstant = useGetStatusInstant();
    if (getStatusInstant.data) {
      if (getStatusInstant.data?.data.total_transaction >= minimumAllTransaction && 
        successPercentageTransaction >= minimumSuccessPercentageTransaction &&
        (getStatusInstant.data?.data.seller_has_instant === false && getStatusInstant.data?.data.request_status === "")
        ) {
          setCheckedSnK(event.target.checked);
      }
    }
  };

  const onClickRequest = () => {
    const postRequestInstant = useRequestInstant();
    postRequestInstant.mutate(undefined, {
      onSuccess: (res) => {
        const response = res?.data
        let responseStatusInstant = useGetStatusInstant()
        console.log(responseStatusInstant?.data?.data)
      },
      onError(error: any, variables, context) {
        setAlertMessage(error?.response?.data?.message)
        setSeverityAlert("error");
        setOpenSnackbar(true);
        // console.log(error, variables, context)
      },
    })
  };

  const confirmationAlertMessageStyle = {
    color: "common.shade.200",
    fontSize: {xs: "12px", md: "14px"}, 
    fontWeight: 800
  }

  const subSnKValues = [
    t("snk.bodyInstant.0"),
    t("snk.bodyInstant.1"),
    t("snk.bodyInstant.2"),
    t("snk.bodyInstant.3"),
    t("snk.bodyInstant.4"),
  ]

  const rows = [
    {
      profit: t("tableComparison.rowsInstant.0.profit"),
      regular: t("tableComparison.rowsInstant.0.regular")
    },
    {
      profit: t("tableComparison.rowsInstant.1.profit"),
      regular: t("tableComparison.rowsInstant.1.regular")
    },
    {
      profit: t("tableComparison.rowsInstant.2.profit"),
      regular: t("tableComparison.rowsInstant.2.regular")
    },
    {
      profit: t("tableComparison.rowsInstant.3.profit"),
      regular: t("tableComparison.rowsInstant.3.regular")
    },
    {
      profit: t("tableComparison.rowsInstant.4.profit"),
      regular: t("tableComparison.rowsInstant.4.regular")
    },
    {
      profit: t("tableComparison.rowsInstant.5.profit"),
      regular: t("tableComparison.rowsInstant.5.regular")
    },
    {
      profit: t("tableComparison.rowsInstant.6.profit"),
      regular: t("tableComparison.rowsInstant.6.regular")
    },
  ];
  
  const featureRequests = [
    {
      imageSrc: t("featureRequests.0.imageSrc"),
      title: t("featureRequests.0.title"),
      subtitle: t("featureRequests.0.subtitle")
    },
    {
      imageSrc: t("featureRequests.1.imageSrc"),
      title: t("featureRequests.1.title"),
      subtitle: t("featureRequests.1.subtitle")
    },
    {
      imageSrc: t("featureRequests.2.imageSrc"),
      title: t("featureRequests.2.title"),
      subtitle: t("featureRequests.2.subtitle")
    },
    {
      imageSrc: t("featureRequests.3.imageSrc"),
      title: t("featureRequests.3.title"),
      subtitle: t("featureRequests.3.subtitle")
    },
  ]

  return (
    <>
      {/* Page Title */}
      <VGPageTitle
        subTitle={t("title")}
        title={t("subtitleInstant")}
      />
      
      {/* Banner */}
      <BannerRequestFeatures 
        imageSrc={`url("/assets/request_instant_banner.png")`}
        subtitleImageSrc="/assets/instant-logo.png"
        title={t("banner.title")}
        desc={t("banner.descInstant")}
      />

      {/* Feature Images */}
      <CardImageRequestFeatures 
        featureRequests={featureRequests}
      />
      
      {/* Table Features */}
      <TableRequestFeatures 
        rowsFeatures={rows} 
        feature="Instant" 
        badgeSrc="/assets/badge-instant.svg" 
      />
      
      {/* SnK */}
      <CustomizedMidContent title={t("snk.title")} stringContents={subSnKValues} />
      
      {/* Request Fitur */}
      <RequestFeatureCondition 
        totalAllTransaction={totalTransaction} 
        totalSuccessTransaction={successTransaction} 
        minimumAllTransaction={minimumAllTransaction}
        minimumSuccessPercentageTransaction={minimumSuccessPercentageTransaction}
        successPercentageTransaction={successPercentageTransaction} 
      />

      <Grid container spacing={4} justifyContent={'center'} >
        <Grid item xs={12}>
          {/* Permission Request */}
          <ContentCard sx={{p: 1}}>
            <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'}>
              <Grid item xs={8} sm={10}>
                <Checkbox
                  checked={checkedSnK}
                  onChange={handleChangeSnK}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography
                  gutterBottom
                  component="span"
                  sx={confirmationAlertMessageStyle}
                >
                  {t("alert.confirmation.msg")}
                </Typography> 
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  fullWidth
                  color={checkedSnK ? "success" : "secondary"}
                  sx={{ textTransform: 'none', display: { sm: 'block' }, color: 'white' }}
                  disabled={!checkedSnK}
                  onClick={onClickRequest} >
                  {t("alert.confirmation.btn")}
                </Button>
              </Grid>
            </Grid>
          </ContentCard>
          
          {/* Permission Nonactive */}
          {
            statusInstantData && statusInstantData.request_status === SellerStatusRejected && 
            <CustomizedPermissionAlert
              alertSeverity="error" 
              alertIcon={<CancelIcon fontSize="inherit" />} 
              alertMessage={t("alert.inactive.subtitle")} alertTitle={t("alert.inactive.title", { featurename: "Proses Instantt" })} 
            />
          }
          
          {/* Permission Actived */}
          {
            (statusInstantData && (statusInstantData.request_status === SellerStatusApproved || statusInstantData.seller_has_instant)) && 
            <CustomizedPermissionAlert
              alertSeverity="success" 
              alertIcon={<CheckCircleIcon fontSize="inherit" />} 
              alertMessage={t("alert.already.msg", { featurename: "Proses Instantt" })} 
            />
          }
          
          {/* Permission Requested */}
          {
            statusInstantData && statusInstantData.request_status === SellerStatusPending && 
            <CustomizedPermissionAlert
              alertSeverity="info" 
              alertIcon={<PageviewIcon fontSize="inherit" />} 
              alertMessage={t("alert.requested.msg", { featurename: "Proses Instantt" })} 
            />
          }
        </Grid>
      </Grid>
        
      {/* for Alerting */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={severityAlert} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["requestFitur"]);
