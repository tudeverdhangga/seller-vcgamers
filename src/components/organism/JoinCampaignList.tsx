import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGCard from "../atomic/VGCard";
import JoinCampaignCard from "../molecule/JoinCampaignCard";
import JoinCampaignConfirmationDialog from "../molecule/JoinCampaignConfirmationDialog";
import JoinCampaignDetailDialog from "../molecule/JoinCampaignDetailDialog";

export default function JoinCampaignList() {
  const { t } = useTranslation("joinCampaign");

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
          control={<Checkbox size="small" />}
          label={t("list.activeOnly")}
          labelPlacement="start"
          sx={{
            color: "common.shade.200",
            fontSize: 14,
            fontWeight: 600,
          }}
        />
      </Box>

      <JoinCampaignDetailDialog />
      <JoinCampaignConfirmationDialog />

      <JoinCampaignCard
        campaign={{
          imageUrl: "/assets/join-campaign.png",
          name: "Narsis di Banner Ads",
          period: "17 Jun 2023 - 17 Jul 2023",
          deadline: "Gabung sebelum 5 Jun 2023",
          isJoined: true,
          isExpired: false,
        }}
      />
      <JoinCampaignCard
        campaign={{
          imageUrl: "/assets/join-campaign.png",
          name: "Narsis di Banner Ads",
          period: "17 Jun 2023 - 17 Jul 2023",
          deadline: "Gabung sebelum 5 Jun 2023",
          isJoined: false,
          isExpired: false,
        }}
      />
      <JoinCampaignCard
        campaign={{
          imageUrl: "/assets/join-campaign.png",
          name: "Narsis di Banner Ads",
          period: "17 Jun 2023 - 17 Jul 2023",
          deadline: "Gabung sebelum 5 Jun 2023",
          isJoined: true,
          isExpired: true,
        }}
      />
      <JoinCampaignCard
        campaign={{
          imageUrl: "/assets/join-campaign.png",
          name: "Narsis di Banner Ads",
          period: "17 Jun 2023 - 17 Jul 2023",
          deadline: "Gabung sebelum 5 Jun 2023",
          isJoined: false,
          isExpired: true,
        }}
      />
    </VGCard>
  );
}
