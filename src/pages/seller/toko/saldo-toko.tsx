import StyledToastContainer from "~/components/atomic/StyledToastContainer";
import BalanceInformationCard from "~/components/molecule/BalanceInformationCard";
import BalanceTitle from "~/components/molecule/BalanceTitle";
import BalanceHistoryList from "~/components/organism/BalanceHistoryList";
import BalanceSearchBar from "~/components/organism/BalanceSearchBar";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function BalancePage() {
  return (
    <>
      <StyledToastContainer />

      <BalanceTitle />

      <BalanceInformationCard />

      <BalanceSearchBar />

      <BalanceHistoryList />
    </>
  );
}

export const getServerSideProps = getStaticPropsWithTransNamespace(["balance"]);
