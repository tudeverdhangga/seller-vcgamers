import Box from "@mui/material/Box";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useAtom } from "jotai";

import VGCard from "../atomic/VGCard";
import VGChip from "../atomic/VGChip";
import MoneyIcon from "../icons/MoneyIcon";
import MoneyPlusIcon from "../icons/MoneyPlusIcon";
import MoneyMinusIcon from "../icons/MoneyMinusIcon";
import BalanceRejectedDialog from "./BalanceRejectedDialog";
import VGButton from "../atomic/VGButton";
import { holdDialogOpenAtom, rejectedDialogOpenAtom } from "~/atom/balance";
import BalanceHoldDialog from "./BalanceHoldDialog";

type BalanceType = "debit" | "credit" | "progress" | "cancel" | "hold";

export default function BalanceHistoryCard(props: {
  balance: {
    date: string;
    message: string;
    amount?: string;
  };
  type: BalanceType;
}) {
  return (
    <VGCard sx={{ display: "flex", flexDirection: "column", gap: 2, m: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LabelChip type={props.type} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <CalendarTodayOutlinedIcon
            fontSize="small"
            sx={{ color: "common.shade.100" }}
          />
          <Typography color="common.shade.100" fontSize={14} fontWeight={600}>
            {props.balance.date}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateAreas: {
            sm: `"a b c"`,
            xs: `"a b" "c c"`,
          },
          gridTemplateColumns: {
            sm: "auto 10fr 1fr",
          },
          gap: { xs: 1, sm: 2 },
          alignItems: { sm: "center" },
        }}
      >
        <Icon type={props.type} />
        <Typography
          color="common.shade.200"
          textAlign="left"
          fontSize={14}
          fontWeight={600}
        >
          {props.balance.message}
        </Typography>
        <Box sx={{ gridColumn: { xs: "span 2", sm: "auto" } }}>
          {AdditionalComponent(props)}
        </Box>
      </Box>
    </VGCard>
  );
}

function AdditionalComponent(props: {
  balance: {
    date: string;
    message: string;
    amount?: string;
  };
  type: BalanceType;
}) {
  const { t } = useTranslation("balance");
  const [, setRejectedModal] = useAtom(rejectedDialogOpenAtom);
  const [, setHoldModal] = useAtom(holdDialogOpenAtom);

  switch (props.type) {
    case "debit":
      return (
        <Typography color="common.green.900" fontSize={16} fontWeight={700}>
          {props.balance.amount}
        </Typography>
      );
    case "credit":
      return (
        <Typography color="common.red.500" fontSize={16} fontWeight={700}>
          {props.balance.amount}
        </Typography>
      );
    case "cancel":
      return (
        <>
          <VGButton
            variant="outlined"
            fullWidth
            onClick={() => setRejectedModal(true)}
          >
            {t("btn.seeDescription")}
          </VGButton>
          <BalanceRejectedDialog />
        </>
      );
    case "hold":
      return (
        <>
          <VGButton
            variant="outlined"
            fullWidth
            onClick={() => setHoldModal(true)}
          >
            {t("btn.seeDescription")}
          </VGButton>
          <BalanceHoldDialog />
        </>
      );
    default:
      return <></>;
  }
}

function Icon(props: { type: BalanceType }) {
  switch (props.type) {
    case "debit":
      return <MoneyPlusIcon sx={{ fontSize: 48 }} />;
    case "credit":
      return <MoneyMinusIcon sx={{ fontSize: 48 }} />;
    default:
      return <MoneyIcon sx={{ fontSize: 48 }} />;
  }
}

function LabelChip(props: { type: BalanceType }) {
  const { t } = useTranslation("balance");

  const typeMapping = {
    debit: {
      label: t("chip.debit"),
      backgroundColor: "#CEECD1",
      color: "#288532",
    },
    credit: {
      label: t("chip.credit"),
      backgroundColor: "#BFE9F6",
      color: "#024357",
    },
    progress: {
      label: t("chip.progress"),
      backgroundColor: "#FFEAAA",
      color: "#D17E00",
    },
    cancel: {
      label: t("chip.cancel"),
      backgroundColor: "#F3C4EF",
      color: "#480442",
    },
    hold: {
      label: t("chip.hold"),
      backgroundColor: "#FFDBBC",
      color: "#DA6500",
    },
  } as {
    [K in BalanceType]: {
      label: string;
      backgroundColor: string;
      color: string;
    };
  };

  const { label, backgroundColor, color } = typeMapping[props.type];

  return <VGChip label={label} sx={{ backgroundColor, color }} />;
}
