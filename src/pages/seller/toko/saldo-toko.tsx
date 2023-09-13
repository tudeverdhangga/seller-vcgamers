import { useTranslation } from "next-i18next";
import VGHead from "~/components/atomic/VGHead";
import BalanceInformationCard from "~/components/molecule/BalanceInformationCard";
import BalanceTitle from "~/components/molecule/BalanceTitle";
import BalanceHistoryList from "~/components/organism/BalanceHistoryList";
import BalanceSearchBar from "~/components/organism/BalanceSearchBar";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function BalancePage() {
  const { t } = useTranslation("balance");

  return (
    <>
      <VGHead>{t("head")}</VGHead>
      <BalanceTitle />

      <BalanceInformationCard />

      <BalanceSearchBar />

      <BalanceHistoryList />
    </>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace(["balance"]);
