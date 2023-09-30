import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGCard from "../atomic/VGCard";
import JoinCampaignCard from "../molecule/JoinCampaignCard";
import JoinCampaignConfirmationDialog from "../molecule/JoinCampaignConfirmationDialog";
import JoinCampaignDetailDialog from "../molecule/JoinCampaignDetailDialog";
import InfiniteScroll from "react-infinite-scroll-component";
import { type Campaign } from "~/services/joinCampaign/types";
import Skeleton from "@mui/material/Skeleton";
import { useGetAllCampaign } from "~/services/joinCampaign/hooks";
import { queryTypes, useQueryState } from "next-usequerystate";
import EmptyState from "../molecule/EmptyState/campaign";

export default function JoinCampaignList() {
  const { t } = useTranslation("joinCampaign");
  const { data, hasNextPage, fetchNextPage } = useGetAllCampaign();
  const [active, setActive] = useQueryState(
    "active",
    queryTypes.boolean.withDefault(false)
  );
  const campaigns = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data.data] as Campaign[];
  }, [] as Campaign[]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void setActive(event.target.checked);
  };

  return (
    <VGCard
      sx={{ my: 0, display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          component="span"
          color="primary.main"
          fontSize={16}
          fontWeight={700}
        >
          {t("list.title")}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox size="small" checked={active} onChange={handleChange} />
          }
          label={t("list.activeOnly")}
          labelPlacement="start"
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 600,
            },
          }}
        />
      </Box>
      {campaigns && campaigns.length === 0 && <EmptyState />}

      <JoinCampaignDetailDialog />
      <JoinCampaignConfirmationDialog />

      <InfiniteScroll
        dataLength={campaigns ? campaigns.length : 0}
        hasMore={hasNextPage ?? false}
        next={fetchNextPage}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "-16px",
          padding: "16px",
        }}
        loader={<Skeleton variant="rounded" height={100} width="75%" />}
      >
        {campaigns &&
          campaigns.map((campaign) => (
            <JoinCampaignCard key={campaign.id} campaign={campaign} />
          ))}
      </InfiniteScroll>
    </VGCard>
  );
}
