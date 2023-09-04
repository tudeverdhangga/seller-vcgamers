import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

import { managePromoFormAtom } from "~/atom/managePromo";
import VGButton from "../atomic/VGButton";
import VGTabChip from "../atomic/VGTabChip";
import VGTabPanel from "../atomic/VGTabPanel";
import VGTabsChip from "../atomic/VGTabsChip";
import BadgeIcon from "../icons/BadgeIcon";
import ManagePromoForm from "./ManagePromoForm";
import { useGetTabStatus, useGetPromoList } from "~/services/managePromo/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import { queryTypes, useQueryState } from "next-usequerystate";
import PromoPerformanceDialog from "../molecule/PromoPerformanceDialog";
import PromoRejectedDialog from "../molecule/PromoRejectedDialog";
import PromoDeleteDialog from "../molecule/PromoDeleteDialog";
import PromoCancelDialog from "../molecule/PromoCancelDialog";

const PromoCodeCard = dynamic(() => import("../molecule/PromoCodeCard"), {
  ssr: false,
});

export default function ManagePromoList() {
  const { t } = useTranslation("managePromo");
  const [tabPosition, setTabPosition] = useQueryState(
    "status",
    queryTypes.integer.withDefault(3)
  );
  const [, setManagePromoForm] = useAtom(managePromoFormAtom);
  const { data: tabData } = useGetTabStatus();
  const { data: promoData, hasNextPage, fetchNextPage } = useGetPromoList();

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <VGTabsChip
          value={tabPosition}
          onChange={(_, value) => setTabPosition(value as number)}
        >
          {tabData?.data.map((tab) => (
            <VGTabChip
              key={tab.value}
              label={tab.name}
              value={tab.value}
              icon={<BadgeIcon content={tab.counter} />}
              iconPosition="end"
            />
          ))}
        </VGTabsChip>

        <VGButton
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() =>
            setManagePromoForm({
              isOpen: true,
              type: "create",
              promoId: undefined,
            })
          }
        >
          {t("btn.addPromo")}
        </VGButton>
      </Box>
      <ManagePromoForm />

      <VGTabPanel value={tabPosition} index={tabPosition}>
        <InfiniteScroll
          dataLength={promoData?.pages ? promoData.pages.length : 0}
          hasMore={hasNextPage ?? false}
          next={fetchNextPage}
          style={{ display: "flex", flexDirection: "column" }}
          loader={<Skeleton variant="rounded" height={100} width="75%" />}
        >
          {promoData?.pages
            .flatMap((page) => page.data.data)
            .map((promo) => (
              <PromoCodeCard key={promo.id} promo={promo} />
            ))}
        </InfiniteScroll>
      </VGTabPanel>
      <PromoCancelDialog />
      <PromoDeleteDialog />
      <PromoRejectedDialog />
      <PromoPerformanceDialog />
    </Box>
  );
}
