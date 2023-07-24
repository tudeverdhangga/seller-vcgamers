import { useTranslation } from "next-i18next";

import StyledToastContainer from "~/components/atomic/StyledToastContainer";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import VipSellerTab from "~/components/molecule/VipSellerTab";
import ManagePromoList from "~/components/organism/ManagePromoList";
import ManagePromoSearchBar from "~/components/organism/ManagePromoSearchBar";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function ManagePromoCodePage() {
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

      <VipSellerTab />

      <ManagePromoSearchBar />

      <ManagePromoList />
    </>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace([
  "managePromo",
  "vipSeller",
]);
