import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

import { managePromoFormAtom } from "~/atom/managePromo";
import VGButton from "../atomic/VGButton";
import VGTabChip from "../atomic/VGTabChip";
import VGTabPanel from "../atomic/VGTabPanel";
import VGTabsChip from "../atomic/VGTabsChip";
import BadgeIcon from "../icons/BadgeIcon";
import ManagePromoForm from "./ManagePromoForm";

const PromoCodeCard = dynamic(() => import("../molecule/PromoCodeCard"), {
  ssr: false,
});

export default function ManagePromoList() {
  const { t } = useTranslation("managePromo");
  const [tabPosition, setTabPosition] = useState(1);
  const [, setManagePromoForm] = useAtom(managePromoFormAtom);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <VGTabsChip
          value={tabPosition}
          onChange={(_, value) => setTabPosition(value as number)}
        >
          <VGTabChip
            label={t("tab.request")}
            icon={<BadgeIcon content={0} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.inProgress")}
            icon={<BadgeIcon content={0} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.completed")}
            icon={<BadgeIcon content={0} />}
            iconPosition="end"
          />
        </VGTabsChip>

        <VGButton
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => setManagePromoForm({ isOpen: true, type: "create" })}
        >
          {t("btn.addPromo")}
        </VGButton>
      </Box>
      <ManagePromoForm />

      <VGTabPanel value={tabPosition} index={0}>
        <PromoCodeCard
          promo={{
            name: "Nama Promo disini",
            code: "CHECKOUTOKOKUJUNI1214125CONTOHPANJANG",
            qty: "20",
            period: "20 - 30 Okt 2023",
            transaction: { min: "Rp10.000", max: "Rp40.000" },
            discount: { min: "Rp1.000", max: "Rp30.000" },
          }}
          type="waiting-approval"
        />
        <PromoCodeCard
          promo={{
            name: "Nama Promo disini",
            code: "CHECKOUTOKOKUJUNI1214125CONTOHPANJANG",
            qty: "20",
            period: "20 - 30 Okt 2023",
            transaction: { min: "Rp10.000", max: "Rp40.000" },
            discount: { min: "Rp1.000", max: "Rp30.000" },
          }}
          type="rejected"
        />
      </VGTabPanel>

      <VGTabPanel value={tabPosition} index={1}>
        <PromoCodeCard
          promo={{
            name: "Nama Promo disini",
            code: "CHECKOUTOKOKUJUNI1214125CONTOHPANJANG",
            qty: "20",
            period: "20 - 30 Okt 2023",
            transaction: { min: "Rp10.000", max: "Rp40.000" },
            discount: { min: "Rp1.000", max: "Rp30.000" },
          }}
          type="in-progress"
        />
        <PromoCodeCard
          promo={{
            name: "Nama Promo disini",
            code: "CHECKOUTOKOKUJUNI1214125CONTOHPANJANG",
            qty: "20",
            period: "20 - 30 Okt 2023",
            transaction: { min: "Rp10.000", max: "Rp40.000" },
            discount: { min: "Rp1.000", max: "Rp30.000" },
          }}
          type="in-progress"
        />
      </VGTabPanel>

      <VGTabPanel value={tabPosition} index={2}>
        <PromoCodeCard
          promo={{
            name: "Nama Promo disini",
            code: "CHECKOUTOKOKUJUNI1214125CONTOHPANJANG",
            qty: "20",
            period: "20 - 30 Okt 2023",
            transaction: { min: "Rp10.000", max: "Rp40.000" },
            discount: { min: "Rp1.000", max: "Rp30.000" },
          }}
          type="completed"
        />
        <PromoCodeCard
          promo={{
            name: "Nama Promo disini",
            code: "CHECKOUTOKOKUJUNI1214125CONTOHPANJANG",
            qty: "20",
            period: "20 - 30 Okt 2023",
            transaction: { min: "Rp10.000", max: "Rp40.000" },
            discount: { min: "Rp1.000", max: "Rp30.000" },
          }}
          type="disabled"
        />
      </VGTabPanel>
    </Box>
  );
}
