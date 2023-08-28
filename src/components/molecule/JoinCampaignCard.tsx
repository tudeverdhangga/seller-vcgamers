/* eslint-disable @next/next/no-img-element */
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { detailDialogAtom } from "~/atom/joinCampaign";
import VGButton from "../atomic/VGButton";
import VGCard from "../atomic/VGCard";
import VGChip from "../atomic/VGChip";
import { type Campaign } from "~/services/joinCampaign/types";

export default function JoinCampaignCard(props: { campaign: Campaign }) {
  const { t } = useTranslation("joinCampaign");
  const [, setDetailDialog] = useAtom(detailDialogAtom);

  return (
    <VGCard
      sx={{
        display: "flex",
        width: "100%",
        p: 0,
        my: 0,
        boxShadow: "1px 1px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={props.campaign.image_url}
        alt={props.campaign.name}
        height={143}
        style={{
          filter: props.campaign.is_expired ? "grayscale(100%)" : "none",
        }}
      />
      <Box sx={{ display: "flex", gap: "10px", p: "20px", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flexGrow: 1,
          }}
        >
          <Typography color="primary.main" fontSize={14} fontWeight={700}>
            {props.campaign.name}
          </Typography>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
            <CalendarTodayOutlinedIcon
              sx={{ fontSize: 14, color: "common.shade.100" }}
            />
            <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <Typography
                color="common.shade.200"
                fontSize={14}
                fontWeight={700}
              >
                {props.campaign.period}
              </Typography>
              {props.campaign.is_expired ? (
                <Typography
                  color="common.red.500"
                  fontSize={12}
                  fontWeight={500}
                >
                  {t("card.campaignEnded")}
                </Typography>
              ) : (
                <Typography
                  color="common.shade.100"
                  fontSize={12}
                  fontWeight={500}
                >
                  {props.campaign.deadline}
                </Typography>
              )}

              {props.campaign.has_joined && (
                <VGChip color="success" label={t("card.joinCampaign")} />
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignSelf: "end" }}>
          <VGButton
            variant="outlined"
            onClick={() =>
              setDetailDialog({ isOpen: true, campaign: props.campaign })
            }
          >
            {t("btn.seeDetail")}
          </VGButton>
          {props.campaign.is_expired && (
            <VGButton variant="outlined">
              {t("btn.performanceSummary")}
            </VGButton>
          )}
        </Box>
      </Box>
    </VGCard>
  );
}
