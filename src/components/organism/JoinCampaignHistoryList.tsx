import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";

import VGCard from "../atomic/VGCard";
import SearchIcon from "../icons/SearchIcon";
import VGTabsChip from "../atomic/VGTabsChip";
import VGTabChip from "../atomic/VGTabChip";
import BadgeIcon from "../icons/BadgeIcon";
import JoinCampaignHistoryCard from "../molecule/JoinCampaignHistoryCard";
import VGTabPanel from "../atomic/VGTabPanel";
import {
  useGetHistoryCampaign,
  useGetHistoryCampaignTabStatus,
} from "~/services/joinCampaign/hooks";
import { queryTypes, useQueryState } from "next-usequerystate";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import type { CampaignHistory } from "~/services/joinCampaign/types";
import { useForm } from "react-hook-form";
import VGInputText from "../atomic/VGInputText";
import EmptyState from "../molecule/EmptyState/campaignHistory";

export default function JoinCampaignHistoryList() {
  const { t } = useTranslation(["vipSeller", "joinCampaign"]);
  const [tabPosition, setTabPosition] = useQueryState(
    "status",
    queryTypes.integer.withDefault(1)
  );
  const [, setSearch] = useQueryState("search");
  const { data, hasNextPage, fetchNextPage } = useGetHistoryCampaign();
  const { data: tabData } = useGetHistoryCampaignTabStatus();
  const { control, handleSubmit } = useForm<{ search: string }>();

  const campaigns = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data.data] as CampaignHistory[];
  }, [] as CampaignHistory[]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <VGCard sx={{ my: 0 }}>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 16,
            fontWeight: 700,
            mb: "20px",
          }}
        >
          {t("joinCampaign:card.searchBar.title")}
        </Typography>
        <form onSubmit={handleSubmit((data) => setSearch(data.search))}>
          <VGInputText
            ControllerProps={{ name: "search", control }}
            TextFieldProps={{
              label: t("joinCampaign:card.searchBar.textInput"),
              variant: "outlined",
              fullWidth: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="search" type="submit" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </form>
      </VGCard>
      <VGTabsChip
        value={tabPosition}
        onChange={(_, value) => setTabPosition(value as number)}
      >
        {tabData?.data.map((tab) => (
          <VGTabChip
            key={tab.name}
            label={tab.name}
            icon={<BadgeIcon content={tab.counter} />}
            iconPosition="end"
            value={tab.value}
          />
        ))}
      </VGTabsChip>

      <Box>
        <VGTabPanel value={tabPosition} index={tabPosition}>
          {campaigns && campaigns.length === 0 && <EmptyState />}
          <InfiniteScroll
            dataLength={campaigns ? campaigns.length : 0}
            hasMore={hasNextPage ?? false}
            next={fetchNextPage}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            loader={<Skeleton variant="rounded" height={100} width="75%" />}
          >
            {campaigns &&
              campaigns.map((campaign) => (
                <JoinCampaignHistoryCard
                  key={campaign.id}
                  campaign={campaign}
                />
              ))}
          </InfiniteScroll>
        </VGTabPanel>
      </Box>
    </Box>
  );
}
