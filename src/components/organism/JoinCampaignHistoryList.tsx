import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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

export default function JoinCampaignHistoryList() {
  const { t } = useTranslation(["vipSeller", "joinCampaign"]);
  const [tabPosition, setTabPosition] = useState(0);

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
        <TextField
          label={t("joinCampaign:card.searchBar.textInput")}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  // onClick={() => {}}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </VGCard>
      <VGTabsChip
        value={tabPosition}
        onChange={(_, value) => setTabPosition(value as number)}
      >
        <VGTabChip
          label={t("tab.request")}
          icon={<BadgeIcon content={2} />}
          iconPosition="end"
        />
        <VGTabChip
          label={t("tab.inProgress")}
          icon={<BadgeIcon content={2} />}
          iconPosition="end"
        />
        <VGTabChip
          label={t("tab.completed")}
          icon={<BadgeIcon content={2} />}
          iconPosition="end"
        />
      </VGTabsChip>

      <Box>
        <VGTabPanel
          value={tabPosition}
          index={0}
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <JoinCampaignHistoryCard
            campaign={{
              imageUrl: "/assets/join-campaign.png",
              name: "Narsis di Banner Ads",
              period: "17 Jun 2023 - 17 Jul 2023",
              deadline: "Gabung sebelum 5 Jun 2023",
              isJoined: true,
              isExpired: false,
            }}
            type="waiting-approval"
          />
          <JoinCampaignHistoryCard
            campaign={{
              imageUrl: "/assets/join-campaign.png",
              name: "Narsis di Banner Ads",
              period: "17 Jun 2023 - 17 Jul 2023",
              deadline: "Gabung sebelum 5 Jun 2023",
              isJoined: true,
              isExpired: false,
            }}
            type="rejected"
          />
        </VGTabPanel>

        <VGTabPanel
          value={tabPosition}
          index={1}
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <JoinCampaignHistoryCard
            campaign={{
              imageUrl: "/assets/join-campaign.png",
              name: "Narsis di Banner Ads",
              period: "17 Jun 2023 - 17 Jul 2023",
              deadline: "Gabung sebelum 5 Jun 2023",
              isJoined: true,
              isExpired: false,
            }}
            type="in-progress"
          />
          <JoinCampaignHistoryCard
            campaign={{
              imageUrl: "/assets/join-campaign.png",
              name: "Narsis di Banner Ads",
              period: "17 Jun 2023 - 17 Jul 2023",
              deadline: "Gabung sebelum 5 Jun 2023",
              isJoined: true,
              isExpired: false,
            }}
            type="in-progress"
          />
        </VGTabPanel>

        <VGTabPanel
          value={tabPosition}
          index={2}
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <JoinCampaignHistoryCard
            campaign={{
              imageUrl: "/assets/join-campaign.png",
              name: "Narsis di Banner Ads",
              period: "17 Jun 2023 - 17 Jul 2023",
              deadline: "Gabung sebelum 5 Jun 2023",
              isJoined: true,
              isExpired: false,
            }}
            type="completed"
          />
          <JoinCampaignHistoryCard
            campaign={{
              imageUrl: "/assets/join-campaign.png",
              name: "Narsis di Banner Ads",
              period: "17 Jun 2023 - 17 Jul 2023",
              deadline: "Gabung sebelum 5 Jun 2023",
              isJoined: true,
              isExpired: false,
            }}
            type="canceled"
          />
        </VGTabPanel>
      </Box>
    </Box>
  );
}
