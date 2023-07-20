import { useState } from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTranslation } from "next-i18next";

import StyledToastContainer from "~/components/atomic/StyledToastContainer";
import VGCard from "~/components/atomic/VGCard";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import ManagePromoList from "~/components/organism/ManagePromoList";
import ManagePromoSearchBar from "~/components/organism/ManagePromoSearchBar";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function ManagePromoCodePage() {
  const [value] = useState(1);
  const { t } = useTranslation("managePromo");

  return (
    <>
      <StyledToastContainer />

      <VGPageTitle
        title={t("title")}
        subTitle={t("subtitle")}
        sx={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
          flex: "1 0 0",
        }}
      />

      <VGCard sx={{ p: 0, pl: 3 }}>
        <Tabs value={value}>
          <Tab label={t("tab.sellerProgram")} sx={{ fontWeight: 700 }} />
          <Tab label={t("tab.managePromo")} sx={{ fontWeight: 700 }} />
          <Tab label={t("tab.apiIntegration")} sx={{ fontWeight: 700 }} />
        </Tabs>
      </VGCard>

      <ManagePromoSearchBar />

      <ManagePromoList />
    </>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace([
  "managePromo",
]);
