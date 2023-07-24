import { useTranslation } from "next-i18next";

import VGPageTitle from "~/components/atomic/VGPageTitle";
import VipSellerTab from "~/components/molecule/VipSellerTab";
import APIFeaturePage from "~/components/organism/APIFeatures";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function ActiveVIPSeller() {
  const { t } = useTranslation("vip");

  return (
    <>
      {/* Page Title */}
      <VGPageTitle subTitle={t("subtitle")} title={t("title")} />

      {/* Tabs */}
      <VipSellerTab />

      {/* API Feature */}
      <APIFeaturePage />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace([
  "vip",
  "vipSeller",
]);
