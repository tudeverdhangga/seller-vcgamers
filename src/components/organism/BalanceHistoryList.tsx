import { useState } from "react";

import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";

import VGTabsChip from "../atomic/VGTabsChip";
import VGTabChip from "../atomic/VGTabChip";
import BadgeIcon from "../icons/BadgeIcon";
import VGTabPanel from "../atomic/VGTabPanel";
import BalanceHistoryCard from "../molecule/BalanceHistoryCard";

export default function BalanceHistoryList() {
  const { t } = useTranslation("balance");
  const [tabPosition, setTabPosition] = useState(0);

  return (
    <>
      <Box width="90vw">
        <VGTabsChip
          value={tabPosition}
          onChange={(_, value) => setTabPosition(value as number)}
          variant="scrollable"
        >
          <VGTabChip
            label={t("tab.all")}
            icon={<BadgeIcon content={5} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.debit")}
            icon={<BadgeIcon content={1} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.credit")}
            icon={<BadgeIcon content={1} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.progress")}
            icon={<BadgeIcon content={1} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.cancel")}
            icon={<BadgeIcon content={1} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.hold")}
            icon={<BadgeIcon content={1} />}
            iconPosition="end"
          />
        </VGTabsChip>
      </Box>

      <VGTabPanel
        value={tabPosition}
        index={0}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Penarikan saldo dengan kode TRX-1665686853-33817 sebesar Rp100.000 disetujui oleh admin dan sudah dikirimkan ke rekening pencairan.",
            amount: "- Rp100.000",
          }}
          type="credit"
        />
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Saldo sebesar Rp100.000 diterima dari penjualan TRX-1665686853-33817",
            amount: "+ Rp100.000",
          }}
          type="debit"
        />
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Penarikan Saldo VC Coin sebesar Rp100.000 dengan kode TRXWDB-12312 ditolak. Silahkan hubungi admin untuk pertanyaan lebih lanjut.",
          }}
          type="cancel"
        />
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Penarikan saldo dengan kode TRX-1665686853-33817 sebesar Rp20.000 sedang diproses menunggu persetujuan admin.",
          }}
          type="progress"
        />
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Saldo VC Coin sebesar Rp100.000 dengan kode TRXWDB-12312 sedang ditahan. Silahkan hubungi admin untuk pertanyaan lebih lanjut.",
          }}
          type="hold"
        />
      </VGTabPanel>

      <VGTabPanel
        value={tabPosition}
        index={1}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Saldo sebesar Rp100.000 diterima dari penjualan TRX-1665686853-33817",
            amount: "+ Rp100.000",
          }}
          type="debit"
        />
      </VGTabPanel>

      <VGTabPanel
        value={tabPosition}
        index={2}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Penarikan saldo dengan kode TRX-1665686853-33817 sebesar Rp100.000 disetujui oleh admin dan sudah dikirimkan ke rekening pencairan.",
            amount: "- Rp100.000",
          }}
          type="credit"
        />
      </VGTabPanel>

      <VGTabPanel
        value={tabPosition}
        index={3}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Penarikan saldo dengan kode TRX-1665686853-33817 sebesar Rp20.000 sedang diproses menunggu persetujuan admin.",
          }}
          type="progress"
        />
      </VGTabPanel>

      <VGTabPanel
        value={tabPosition}
        index={4}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Penarikan Saldo VC Coin sebesar Rp100.000 dengan kode TRXWDB-12312 ditolak. Silahkan hubungi admin untuk pertanyaan lebih lanjut.",
          }}
          type="cancel"
        />
      </VGTabPanel>

      <VGTabPanel
        value={tabPosition}
        index={5}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <BalanceHistoryCard
          balance={{
            date: "20 Oktober 2022",
            message:
              "Saldo VC Coin sebesar Rp100.000 dengan kode TRXWDB-12312 sedang ditahan. Silahkan hubungi admin untuk pertanyaan lebih lanjut.",
          }}
          type="hold"
        />
      </VGTabPanel>
    </>
  );
}
