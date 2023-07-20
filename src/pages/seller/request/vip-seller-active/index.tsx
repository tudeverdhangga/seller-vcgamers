import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Tabs, Tab } from "@mui/material";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGCard from "~/components/atomic/VGCard";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import APIFeaturePage from "~/components/organism/APIFeatures";

export default function ActiveVIPSeller() {
  const [value] = useState(0)
  const { t } = useTranslation("vip");
  
  const handleChangePage = () => () => {
    console.log("handle change Tab")
  }

  return (
    <>
      {/* Page Title */}
      <VGPageTitle
        subTitle={t("subtitle")}
        title={t("title")}
      />

      {/* Tabs */}
      <VGCard sx={{ p: 0, pl: 3 }}>
        <Tabs 
          value={value}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label={t("tab.program")}
            sx={{ fontWeight: 700 }}
            onClick={handleChangePage}
          />
          <Tab
            label={t("tab.promo")}
            sx={{ fontWeight: 700 }}
            onClick={handleChangePage}
          />
          <Tab
            label={t("tab.api")}
            sx={{ fontWeight: 700 }}
          />
        </Tabs>
      </VGCard>

      {/* API Feature */}
      <APIFeaturePage />
    </>
  )
}

export const getStaticProps = getStaticPropsWithTransNamespace(["vip"]);
