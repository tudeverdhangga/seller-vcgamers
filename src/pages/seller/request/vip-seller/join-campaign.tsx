import { useState } from "react";

import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";

import VGPageTitle from "~/components/atomic/VGPageTitle";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import JoinCampaignSidebarMenu from "~/components/molecule/JoinCampaignSidebarMenu";
import VGTabPanel from "~/components/atomic/VGTabPanel";
import JoinCampaignList from "~/components/organism/JoinCampaignList";
import JoinCampaignHistoryList from "~/components/organism/JoinCampaignHistoryList";
import VipSellerTab from "~/components/molecule/VipSellerTab";

export default function JoinCampaignPage() {
  const [menuPosition, setMenuPosition] = useState(0);
  const { t } = useTranslation(["vipSeller", "joinCampaign"]);

  const changeMenuPosition = (value: number) => {
    setMenuPosition(value);
  };

  return (
    <>
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

      <VipSellerTab />

      <Box sx={{ display: "flex", gap: "20px" }}>
        <VGTabPanel value={menuPosition} index={0} sx={{ width: "80%" }}>
          <JoinCampaignList />
        </VGTabPanel>

        <VGTabPanel value={menuPosition} index={1} sx={{ width: "80%" }}>
          <JoinCampaignHistoryList />
        </VGTabPanel>

        <JoinCampaignSidebarMenu
          position={menuPosition}
          setPosition={changeMenuPosition}
        />
      </Box>
    </>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace([
  "vipSeller",
  "joinCampaign",
]);
