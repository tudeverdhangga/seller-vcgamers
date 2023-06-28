import { useState } from "react"
import { useRouter } from "next/router"

import { getStaticPropsWithTrans } from "~/utils/translation"
import VGCard from "~/components/atomic/VGCard"
import VGPageTitle from "~/components/atomic/VGPageTitle"
import ProfileSettingForm from "~/components/organism/ProfileSettingForm"

import { Tabs, Tab } from "@mui/material"

export default function ProfilTokoPage() {
  const router = useRouter()
  const [value] = useState(0)

  const handleChangePage = () => {
    void router.push("/seller/pengaturan/jadwal-toko")
  }

  return (
    <>
      {/* Page Title */}
      <VGPageTitle
        subTitle="Personalisasi"
        title="Pengaturan Toko"
      />

      {/* Tabs */}
      <VGCard sx={{ p: 0, pl: 3 }}>
        <Tabs value={value}>
          <Tab
            label="Profil Toko"
            sx={{ fontWeight: 700 }}
          />
          <Tab
            label="Jam Operational"
            sx={{ fontWeight: 700 }}
            onClick={handleChangePage}
          />
        </Tabs>
      </VGCard>

      {/* Form */}
      <VGCard>
        <ProfileSettingForm />
      </VGCard>
    </>
  )
}

export { getStaticPropsWithTrans as getStaticProps }
