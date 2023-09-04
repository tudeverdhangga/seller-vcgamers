import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "next-i18next";
import { queryTypes, useQueryState } from "next-usequerystate";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  useGetBalanceHistories,
  useGetBalanceHistoryStatus,
} from "~/services/balance/hooks";
import { type BalanceHistory } from "~/services/balance/types";
import VGTabChip from "../atomic/VGTabChip";
import VGTabPanel from "../atomic/VGTabPanel";
import VGTabsChip from "../atomic/VGTabsChip";
import BalanceHistoryCard from "../molecule/BalanceHistoryCard";
import BalanceRejectedDialog from "../molecule/BalanceRejectedDialog";
import BalanceHoldDialog from "../molecule/BalanceHoldDialog";

export default function BalanceHistoryList() {
  const { t } = useTranslation("balance");
  const [tabPosition, setTabPosition] = useQueryState(
    "status",
    queryTypes.string.withDefault("")
  );
  const { data: statusData, isLoading: statusIsLoading } =
    useGetBalanceHistoryStatus();
  const { data, hasNextPage, fetchNextPage } = useGetBalanceHistories();
  const histories = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data.data] as BalanceHistory[];
  }, [] as BalanceHistory[]);

  return (
    <>
      <Box>
        {!statusIsLoading ? (
          <VGTabsChip
            value={tabPosition}
            onChange={(_, value) =>
              setTabPosition(value as string, {
                scroll: false,
                shallow: true,
              })
            }
            variant="scrollable"
          >
            <VGTabChip label={t("tab.all")} value="" />
            {statusData?.data.map((status) => (
              <VGTabChip
                key={status.value}
                label={status.label}
                value={status.value}
              />
            ))}
          </VGTabsChip>
        ) : (
          <Skeleton variant="rounded" height={48} width="50%" />
        )}
      </Box>

      <VGTabPanel value={tabPosition} index={tabPosition} sx={{ mt: "20px" }}>
        <InfiniteScroll
          dataLength={histories ? histories.length : 0}
          hasMore={hasNextPage ?? false}
          next={fetchNextPage}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          loader={<Skeleton variant="rounded" height={100} width="75%" />}
        >
          {histories &&
            histories.map((history) => (
              <BalanceHistoryCard key={history.id} balance={history} />
            ))}
        </InfiniteScroll>
        <BalanceRejectedDialog />
        <BalanceHoldDialog />
      </VGTabPanel>
    </>
  );
}
