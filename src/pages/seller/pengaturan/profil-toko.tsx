import { useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGCard from "~/components/atomic/VGCard"
import VGPageTitle from "~/components/atomic/VGPageTitle"
import ProfileSettingForm from "~/components/organism/ProfileSettingForm"

import { Tabs, Tab } from "@mui/material"

export default function ProfilTokoPage() {
  const router = useRouter()
  const [value] = useState(0)
  const { t } = useTranslation("setting");

  const handleChangePage = () => {
    void router.push("/seller/pengaturan/jadwal-toko")
  }

  return (
    <>
      <VGPageTitle
        subTitle={t("subTitle")}
        title={t("title")}
      />

      {/* Tabs */}
      <VGCard sx={{ p: 0, pl: 3 }}>
        <Tabs value={value}>
          <Tab
            label={t("tab.profile.label")}
            sx={{
              fontWeight: 700,
              textTransform: 'capitalize'
            }}
          />
          <Tab
            label={t("tab.operational.label")}
            sx={{
              fontWeight: 700,
              textTransform: 'capitalize'
            }}
            onClick={handleChangePage}
          />
        </Tabs>
      </VGCard>

      <VGCard>
        <ProfileSettingForm />
      </VGCard>
    </>
  )
}

export const getStaticProps = getStaticPropsWithTransNamespace(["setting"]);
