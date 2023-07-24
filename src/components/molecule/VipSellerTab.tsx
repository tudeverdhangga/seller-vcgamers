import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import VGCard from "~/components/atomic/VGCard";

export default function VipSellerTab() {
  const { t } = useTranslation("vipSeller");
  const router = useRouter();
  const pathSegments = router.pathname.split("/");
  const value = pathSegments[pathSegments.length - 1];

  return (
    <VGCard sx={{ p: 0, pl: 3 }}>
      <Tabs value={value}>
        <Tab
          label={t("tab.sellerProgram")}
          sx={{ fontWeight: 700 }}
          value="join-campaign"
          component={Link}
          href="/seller/request/vip-seller/join-campaign"
          passHref
        />
        <Tab
          label={t("tab.managePromo")}
          sx={{ fontWeight: 700 }}
          value="manage-promo"
          component={Link}
          href="/seller/request/vip-seller/manage-promo"
          passHref
        />
        <Tab
          label={t("tab.apiIntegration")}
          sx={{ fontWeight: 700 }}
          value="api-integration"
          component={Link}
          href="/seller/request/vip-seller/api-integration"
          passHref
        />
      </Tabs>
    </VGCard>
  );
}
