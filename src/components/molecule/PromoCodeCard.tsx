import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
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
import MoreButtonPopover from "../atomic/MoreButtonPopover";
import VGButton from "../atomic/VGButton";
import VGCard from "../atomic/VGCard";
import VGChip from "../atomic/VGChip";
import CopyIcon from "../icons/svg/copyIcon.svg";
import PromoDeleteDialog from "./PromoDeleteDialog";
import PromoDisableDialog from "./PromoDisableDialog";
import PromoPerformanceDialog from "./PromoPerformanceDialog";
import PromoRejectedDialog from "./PromoRejectedDialog";
import type { Promo, PromoType } from "~/services/managePromo/types";
import { useDeletePromo } from "~/services/managePromo/hooks";

export default function PromoCodeCard(props: { promo: Promo }) {
  const { t } = useTranslation("managePromo");
  const [, setManagePromoForm] = useAtom(managePromoFormAtom);

  const clickCopyCode = async (code: string) =>
    await navigator.clipboard.writeText(code);

  const handleCardClick = (type: PromoType) => {
    let formType: "create" | "edit" | "disabled" = "create";

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
          onClick={() => handleCardClick(props.promo.status_name)}
        >
          {props.promo.name}
        </Typography>
        <LabelChip type={props.promo.status_name} />
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.code")}</Title>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SubTitle maxWidth={200} noWrap>
              {props.promo.promo_code}
            </SubTitle>
            <IconButton
              edge="end"
              aria-label="copy"
              onClick={() => void clickCopyCode(props.promo.promo_code)}
            >
              <CopyIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Title>{t("card.qty")}</Title>
          <SubTitle>{props.promo.stock}</SubTitle>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.period")}</Title>
          <SubTitle>{props.promo.periode}</SubTitle>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.transaction")}</Title>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <SubTitle>{props.promo.transaction_rule}</SubTitle>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Title>{t("card.discount")}</Title>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <SubTitle>{props.promo.discount_rule}</SubTitle>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", flex: 1 }}>
          <ActionButton promo={props.promo} />
        </Box>
      </Box>
    </VGCard>
  );
}

function LabelChip(props: { type: PromoType }) {
  const { t } = useTranslation("managePromo");

  if (props.type === "in-progress" || props.type === "") return <></>;

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
    [K in PromoType]: {
      label: string;
      backgroundColor: string;
      color: string;
    };
  };

  const { label, backgroundColor, color } = typeMapping[props.type];

  return <VGChip label={label} sx={{ backgroundColor, color }} />;
}

function ActionButton(props: { promo: Promo }) {
  const { t } = useTranslation("managePromo");
  const [, setDeleteOpen] = useAtom(deleteDialogOpenAtom);
  const [, setRejectedOpen] = useAtom(rejectedDialogOpenAtom);
  const [, setPerformanceOpen] = useAtom(performanceDialogOpenAtom);
  const [, setManagePromoForm] = useAtom(managePromoFormAtom);
  const deleteMutation = useDeletePromo();

  switch (props.promo.status_name) {
    case "waiting-approval":
      return (
        <VGButton
          variant="contained"
          color="error"
          fullWidth
          onClick={() => {
            deleteMutation.mutate(props.promo.id, {
              onSuccess: () =>
                toast.success(t("toast.cancelSuccess"), toastOption),
            });
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
          <PromoDeleteDialog promo={props.promo} />
          <PromoRejectedDialog promo={props.promo} />
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
          <PromoMoreButtonPopover promoId={props.promo.id} />
          <PromoPerformanceDialog promoId={props.promo.id} />
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
            onClick={() =>
              setManagePromoForm({
                isOpen: true,
                type: "reuse",
                promoId: props.promo.id,
              })
            }
          >
            {t("btn.reuse")}
          </VGButton>
          <PromoPerformanceDialog promoId={props.promo.id} />
        </>
      );
  }
}

function PromoMoreButtonPopover(props: { promoId: string }) {
  const { t } = useTranslation("managePromo");
  const [, setDisableOpen] = useAtom(disableDialogOpenAtom);

  return (
    <MoreButtonPopover
      menu={
        <VGButton
          variant="text"
          color="error"
          onClick={() => setDisableOpen(true)}
        >
          {t("btn.disablePromo")}
        </VGButton>
      }
      dialog={<PromoDisableDialog promoId={props.promoId} />}
    />
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
