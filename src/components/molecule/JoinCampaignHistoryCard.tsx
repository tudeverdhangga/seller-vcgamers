import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import {
  cancelDialogOpenAtom,
  rejectedDialogOpenAtom,
} from "~/atom/joinCampaign";
import VGButton from "../atomic/VGButton";
import VGCard from "../atomic/VGCard";
import VGChip from "../atomic/VGChip";
import MoreButtonPopover from "../atomic/MoreButtonPopover";
import JoinCampaignCancelDialog from "./JoinCampaignCancelDialog";
import JoinCampaignRejectedDialog from "./JoinCampaignRejectedDialog";

type CampaignType =
  | "waiting-approval"
  | "rejected"
  | "in-progress"
  | "completed"
  | "canceled";

export default function JoinCampaignHistoryCard(props: {
  campaign: {
    imageUrl: string;
    name: string;
    period: string;
    deadline: string;
    isJoined: boolean;
    isExpired: boolean;
  };
  type: CampaignType;
}) {
  const { t } = useTranslation("joinCampaign");
  const [, setRejectedDialog] = useAtom(rejectedDialogOpenAtom);

  return (
    <VGCard
      sx={{
        display: "flex",
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
          Penayangan:
        </Typography>
        <Typography color="common.shade.200" fontSize={14} fontWeight={500}>
          20 Okt 2023 - 1 Nov 2023
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
          visibility={props.type === "in-progress" ? "hidden" : "visible"}
        >
          Status:
        </Typography>
        <Box>
          <LabelChip type={props.type} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: 1, justifyContent: "end" }}>
        {props.type === "rejected" && (
          <>
            <VGButton
              variant="outlined"
              onClick={() => setRejectedDialog(true)}
              sx={{ flex: 1 }}
            >
              {t("btn.seeDescription")}
            </VGButton>
            <JoinCampaignRejectedDialog />
          </>
        )}
        {props.type === "in-progress" && <CampaignMoreButtonPopover />}
      </Box>
    </VGCard>
  );
}

function LabelChip(props: { type: CampaignType }) {
  const { t } = useTranslation("joinCampaign");

  if (props.type === "in-progress") {
    return <VGChip label="" sx={{ visibility: "hidden" }} />;
  }

  const typeMapping = {
    "waiting-approval": {
      label: t("chip.waitingApproval"),
      backgroundColor: "#BFE9F6",
      color: "#024357",
    },
    rejected: {
      label: t("chip.rejected"),
      backgroundColor: "#F3C4EF",
      color: "#480442",
    },
    completed: {
      label: t("chip.completed"),
      backgroundColor: "common.green.0",
      color: "common.green.900",
    },
    canceled: {
      label: t("chip.canceled"),
      backgroundColor: "common.red.0",
      color: "common.red.500",
    },
  } as {
    [K in CampaignType]: {
      label: string;
      backgroundColor: string;
      color: string;
    };
  };

  const { label, backgroundColor, color } = typeMapping[props.type];

  return <VGChip label={label} sx={{ backgroundColor, color }} />;
}

function CampaignMoreButtonPopover() {
  const { t } = useTranslation("joinCampaign");
  const [, setDialogOpen] = useAtom(cancelDialogOpenAtom);

  return (
    <MoreButtonPopover
      menu={
        <VGButton
          variant="text"
          color="error"
          onClick={() => setDialogOpen(true)}
        >
          {t("btn.requestAbort")}
        </VGButton>
      }
      dialog={<JoinCampaignCancelDialog />}
    />
  );
}
