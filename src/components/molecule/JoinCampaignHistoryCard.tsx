import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { cancelDialogAtom, rejectedDialogOpenAtom } from "~/atom/joinCampaign";
import VGButton from "../atomic/VGButton";
import VGCard from "../atomic/VGCard";
import VGChip from "../atomic/VGChip";
import MoreButtonPopover from "../atomic/MoreButtonPopover";
import JoinCampaignCancelDialog from "./JoinCampaignCancelDialog";
import JoinCampaignRejectedDialog from "./JoinCampaignRejectedDialog";
import type {
  CampaignHistory,
  CampaignHistoryType,
} from "~/services/joinCampaign/types";

export default function JoinCampaignHistoryCard(props: {
  campaign: CampaignHistory;
}) {
  const { t } = useTranslation("joinCampaign");
  const [, setRejectedDialog] = useAtom(rejectedDialogOpenAtom);

  return (
    <VGCard
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        width: "100%",
        my: 0,
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Typography
        color="common.shade.200"
        fontSize={16}
        fontWeight={700}
        sx={{ flexGrow: 2 }}
      >
        {props.campaign.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        <Typography color="common.shade.200" fontSize={14} fontWeight={700}>
          {t("card.history.period")}
        </Typography>
        <Typography color="common.shade.200" fontSize={14} fontWeight={500}>
          {props.campaign.period}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        <Typography
          color="common.shade.200"
          fontSize={14}
          fontWeight={700}
          visibility={props.campaign.status === 3 ? "hidden" : "visible"}
        >
          {t("card.history.status")}
        </Typography>
        <Box>
          <LabelChip type={props.campaign.status} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: 1, justifyContent: "end" }}>
        {props.campaign.status === 7 && (
          <>
            <VGButton
              variant="outlined"
              onClick={() =>
                setRejectedDialog({ isOpen: true, campaign: props.campaign })
              }
              sx={{ flex: 1 }}
            >
              {t("btn.seeDescription")}
            </VGButton>
            <JoinCampaignRejectedDialog />
          </>
        )}
        {props.campaign.status === 3 && (
          <CampaignMoreButtonPopover campaign={props.campaign} />
        )}
      </Box>
    </VGCard>
  );
}

function LabelChip(props: { type: CampaignHistoryType }) {
  const { t } = useTranslation("joinCampaign");

  if (props.type === 3) {
    return <VGChip label="" sx={{ visibility: "hidden" }} />;
  }

  const typeMapping = {
    1: {
      label: t("chip.waitingApproval"),
      backgroundColor: "#BFE9F6",
      color: "#024357",
    },
    2: {
      label: t("chip.accepted"),
      backgroundColor: "#BFE9F6",
      color: "#024357",
    },
    4: {
      label: t("chip.completed"),
      backgroundColor: "common.green.0",
      color: "common.green.900",
    },
    5: {
      label: t("chip.cancelRequest"),
      backgroundColor: "common.yellow.0",
      color: "#D17E00",
    },
    6: {
      label: t("chip.canceled"),
      backgroundColor: "common.red.0",
      color: "common.red.500",
    },
    7: {
      label: t("chip.rejected"),
      backgroundColor: "#F3C4EF",
      color: "#480442",
    },
  } as {
    [K in CampaignHistoryType]: {
      label: string;
      backgroundColor: string;
      color: string;
    };
  };

  try {
    const { label, backgroundColor, color } = typeMapping[props.type];

    return <VGChip label={label} sx={{ backgroundColor, color }} />;
  } catch (error) {
    return <VGChip label="" sx={{ visibility: "hidden" }} />;
  }
}

function CampaignMoreButtonPopover(props: { campaign: CampaignHistory }) {
  const { t } = useTranslation("joinCampaign");
  const [, setDialogOpen] = useAtom(cancelDialogAtom);

  return (
    <MoreButtonPopover
      menu={
        <VGButton
          variant="text"
          color="error"
          onClick={() =>
            setDialogOpen({ isOpen: true, campaign: props.campaign })
          }
        >
          {t("btn.requestAbort")}
        </VGButton>
      }
      dialog={<JoinCampaignCancelDialog />}
    />
  );
}
