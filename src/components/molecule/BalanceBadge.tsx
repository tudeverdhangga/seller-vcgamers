import Typography from "@mui/material/Typography";
import { useGetBalanceInfo } from "~/services/balance/hooks";
import { priceFormat } from "~/utils/format";

export default function BalanceBadge() {
  const { data } = useGetBalanceInfo();

  const balance = data?.data.balance ?? 0;

  return (
    <div style={{ display: "flex" }}>
      <Typography color="common.purple.700" fontSize={14} fontWeight={600}>
        Rp
      </Typography>
      <Typography color="common.shade.700" fontSize={14} fontWeight={600}>
        {priceFormat(balance).replace("Rp", "")}
      </Typography>
    </div>
  );
}
