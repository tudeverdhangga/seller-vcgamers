
import { useTranslation } from "next-i18next";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
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


export default function InstantPage() {
  const { t } = useTranslation("requestFitur");
  const [checkedSnK, setCheckedSnK] = React.useState(false);

  const handleChangeSnK = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSnK(event.target.checked);
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
      <RequestFeatureCondition />

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
                  onClick={() => {
                  console.log('clicked');
                }} >
                  {t("alert.confirmation.btn")}
                </Button>
              </Grid>
            </Grid>
          </ContentCard>
          
          {/* Permission Nonactive */}
          <CustomizedPermissionAlert
            alertSeverity="error" 
            alertIcon={<CancelIcon fontSize="inherit" />} 
            alertMessage={t("alert.inactive.subtitle")} alertTitle={t("alert.inactive.title", { featurename: "Instant" })} 
          />
          
          {/* Permission Actived */}
          <CustomizedPermissionAlert
            alertSeverity="success" 
            alertIcon={<CheckCircleIcon fontSize="inherit" />} 
            alertMessage={t("alert.already.msg", { featurename: "Instant" })} 
          />
          
          {/* Permission Requested */}
          <CustomizedPermissionAlert
            alertSeverity="info" 
            alertIcon={<PageviewIcon fontSize="inherit" />} 
            alertMessage={t("alert.requested.msg", { featurename: "Instant" })} 
          />
        </Grid>
      </Grid>
        
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["requestFitur"]);
