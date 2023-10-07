import { useTranslation } from "next-i18next";
import VGHead from "~/components/atomic/VGHead";

import VGPageTitle from "~/components/atomic/VGPageTitle";
import VipSellerTab from "~/components/molecule/VipSellerTab";
import APIFeaturePage from "~/components/organism/APIFeatures";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function ActiveVIPSeller() {
  const { t } = useTranslation("vip");

  return (
    <>
      <VGHead>{t("head")}</VGHead>
      {/* Page Title */}
      <VGPageTitle subTitle={t("title")} title={t("subtitle")} />

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
