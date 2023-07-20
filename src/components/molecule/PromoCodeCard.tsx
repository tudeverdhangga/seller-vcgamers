import { useState } from "react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import {
  deleteDialogOpenAtom,
  disableDialogOpenAtom,
  managePromoFormAtom,
  performanceDialogOpenAtom,
  rejectedDialogOpenAtom,
} from "~/atom/managePromo";
import { toastOption } from "~/utils/toast";
import VGButton from "../atomic/VGButton";
import VGCard from "../atomic/VGCard";
import VGChip from "../atomic/VGChip";
import MoreHorizontalIcon from "../icons/MoreHorizontalIcon";
import CopyIcon from "../icons/svg/copyIcon.svg";
import PromoDeleteDialog from "./PromoDeleteDialog";
import PromoDisableDialog from "./PromoDisableDialog";
import PromoPerformanceDialog from "./PromoPerformanceDialog";
import PromoRejectedDialog from "./PromoRejectedDialog";

type PromoTypes =
  | "waiting-approval"
  | "rejected"
  | "in-progress"
  | "completed"
  | "disabled";

export default function PromoCodeCard(props: {
  promo: {
    name: string;
    code: string;
    qty: string;
    period: string;
    transaction: { min: string; max: string };
    discount: { min: string; max: string };
  };
  type: PromoTypes;
}) {
  const { t } = useTranslation("managePromo");
  const [, setManagePromoForm] = useAtom(managePromoFormAtom);

  const clickCopyCode = async (code: string) =>
    await navigator.clipboard.writeText(code);

  const handleCardClick = (type: PromoTypes) => {
    let formType: "create" | "edit" | "reuse" | "disabled" = "create";

    switch (type) {
      case "in-progress":
        formType = "disabled";
        break;
      case "rejected":
      case "waiting-approval":
        formType = "edit";
        break;
    }

    setManagePromoForm({ isOpen: true, type: formType });
  };

  return (
    <VGCard sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex" }}>
        <Typography
          component="span"
          color="common.purple.500"
          fontSize={16}
          fontWeight={700}
          sx={{ flexGrow: 1 }}
          onClick={() => handleCardClick(props.type)}
        >
          {props.promo.name}
        </Typography>
        <LabelChip type={props.type} />
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.code")}</Title>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SubTitle maxWidth={200} noWrap>
              {props.promo.code}
            </SubTitle>
            <IconButton
              edge="end"
              aria-label="copy"
              onClick={() => void clickCopyCode(props.promo.code)}
            >
              <CopyIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Title>{t("card.qty")}</Title>
          <SubTitle>{props.promo.qty}</SubTitle>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.period")}</Title>
          <SubTitle>{props.promo.period}</SubTitle>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.transaction")}</Title>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <SubTitle>
              {t("card.min", { value: props.promo.transaction.min })}
            </SubTitle>
            <SubTitle>
              {t("card.max", { value: props.promo.transaction.max })}
            </SubTitle>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.discount")}</Title>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <SubTitle>
              {t("card.min", { value: props.promo.discount.min })}
            </SubTitle>
            <SubTitle>
              {t("card.max", { value: props.promo.discount.max })}
            </SubTitle>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", flex: 1 }}>
          <ActionButton type={props.type} />
        </Box>
      </Box>
    </VGCard>
  );
}

function LabelChip(props: { type: PromoTypes }) {
  const { t } = useTranslation("managePromo");

  if (props.type === "in-progress") return <></>;

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
    disabled: {
      label: t("chip.disabled"),
      backgroundColor: "common.yellow.0",
      color: "#D17E00",
    },
  } as {
    [K in PromoTypes]: {
      label: string;
      backgroundColor: string;
      color: string;
    };
  };

  const { label, backgroundColor, color } = typeMapping[props.type];

  return <VGChip label={label} sx={{ backgroundColor, color }} />;
}

function ActionButton(props: { type: PromoTypes }) {
  const { t } = useTranslation("managePromo");
  const [, setDeleteOpen] = useAtom(deleteDialogOpenAtom);
  const [, setRejectedOpen] = useAtom(rejectedDialogOpenAtom);
  const [, setPerformanceOpen] = useAtom(performanceDialogOpenAtom);
  const [, setManagePromoForm] = useAtom(managePromoFormAtom);

  switch (props.type) {
    case "waiting-approval":
      return (
        <VGButton
          variant="contained"
          color="error"
          fullWidth
          onClick={() => {
            toast.success(t("toast.cancelSuccess"), toastOption);
          }}
        >
          {t("btn.cancel")}
        </VGButton>
      );
    case "rejected":
      return (
        <>
          <VGButton
            variant="outlined"
            sx={{ fontWeight: 600, flex: 1 }}
            onClick={() => setRejectedOpen(true)}
          >
            {t("btn.seeDetail")}
          </VGButton>
          <VGButton
            variant="outlined"
            color="error"
            onClick={() => setDeleteOpen(true)}
          >
            <DeleteOutlineOutlinedIcon />
          </VGButton>
          <PromoDeleteDialog />
          <PromoRejectedDialog />
        </>
      );
    case "in-progress":
      return (
        <>
          <VGButton
            variant="outlined"
            sx={{ fontWeight: 600, flex: 1 }}
            onClick={() => setPerformanceOpen(true)}
          >
            {t("btn.promoPerformance")}
          </VGButton>
          <MoreButtonPopover />
          <PromoPerformanceDialog />
        </>
      );
    case "completed":
    case "disabled":
      return (
        <>
          <VGButton
            variant="outlined"
            sx={{ fontWeight: 600, flex: 1 }}
            onClick={() => setPerformanceOpen(true)}
          >
            {t("btn.promoPerformance")}
          </VGButton>
          <VGButton
            variant="outlined"
            sx={{
              flex: 1,
              borderColor: "common.shade.100",
              color: "common.shade.100",
            }}
            onClick={() => setManagePromoForm({ isOpen: true, type: "reuse" })}
          >
            {t("btn.reuse")}
          </VGButton>
          <PromoPerformanceDialog />
        </>
      );
  }
}

function MoreButtonPopover() {
  const { t } = useTranslation("managePromo");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [, setDisableOpen] = useAtom(disableDialogOpenAtom);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  return (
    <>
      <VGButton
        variant="outlined"
        sx={{ borderColor: "common.shade.100" }}
        onClick={handleClick}
      >
        <MoreHorizontalIcon />
      </VGButton>
      <Popover
        id={id}
        open={open}
        elevation={1}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <VGButton
          variant="text"
          color="error"
          onClick={() => setDisableOpen(true)}
        >
          {t("btn.disablePromo")}
        </VGButton>
      </Popover>
      <PromoDisableDialog />
    </>
  );
}

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.shade[200],
  fontSize: 14,
  fontWeight: 700,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.shade[200],
  fontSize: 14,
  fontWeight: 500,
}));
