import React from "react";
import { useTranslation } from "next-i18next";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import ContentCard from "~/components/molecule/ContentCard";
import BannerRequestFeatures from "~/components/organism/BannerRequestFeatures";
import CustomizedPermissionAlert from "~/components/organism/PermissionAlertRequestFeature";
import TableRequestFeatures from "~/components/organism/TableRequestFeatures";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageviewIcon from '@mui/icons-material/Pageview';
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import CustomizedMidContent from "~/components/organism/MidContentRequestFeatures";

export default function VIPSellerPage() {
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
      profit: t("tableComparison.rowsVip.0.profit"),
      regular: t("tableComparison.rowsVip.0.regular")
    },
    {
      profit: t("tableComparison.rowsVip.1.profit"),
      regular: t("tableComparison.rowsVip.1.regular")
    },
    {
      profit: t("tableComparison.rowsVip.2.profit"),
      regular: t("tableComparison.rowsVip.2.regular")
    },
    {
      profit: t("tableComparison.rowsVip.3.profit"),
      regular: t("tableComparison.rowsVip.3.regular")
    },
  ];
  
  const featureChecks = [
    {
      caption: t("syaratVip.body.0.caption"),
      check: t("syaratVip.body.0.check"),
    },
    {
      caption: t("syaratVip.body.1.caption"),
      check: t("syaratVip.body.1.check"),
    },
    {
      caption: t("syaratVip.body.2.caption"),
      check: t("syaratVip.body.2.check"),
    },
    {
      caption: t("syaratVip.body.3.caption"),
      check: t("syaratVip.body.3.check"),
    },
    {
      caption: t("syaratVip.body.4.caption"),
      check: t("syaratVip.body.4.check"),
    },
    {
      caption: t("syaratVip.body.5.caption"),
      check: t("syaratVip.body.5.check"),
    },
    {
      caption: t("syaratVip.body.6.caption"),
      check: t("syaratVip.body.6.check"),
    }
  ]

  return (
    <>
      {/* Page Title */}
      <VGPageTitle
        subTitle={t("title")}
        title={t("subtitleVIP")}
      />
      
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
      <CustomizedMidContent title={t("syaratVip.title")} featureChecks={featureChecks} />
      
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
                  sx={{ display: { sm: 'block' }, color: 'white' }}
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

