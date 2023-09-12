import { useGetTransactionStatus } from "~/services/api/transaction";
import CountBadge from "../atomic/CountBadge";

export default function SalesBadge() {
  const { data } = useGetTransactionStatus();

  const count = +(
    data?.data.find((tab) => tab.label === "Diproses")?.counter ?? "0"
  );

  return <CountBadge badgeContent={count} />;
}
