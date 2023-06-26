import { useState } from "react"
import { useRouter } from "next/router"

import { getStaticPropsWithTrans } from "~/utils/translation"
import VGCard from "~/components/atomic/VGCard"
import PageTitle from "~/components/atomic/PageTitle"
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
      <PageTitle
        subTitle="Personalisasi"
        title="Pengaturan Toko"
      />

      {/* Tabs */}
      <VGCard sx={{ pl: 3 }}>
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
      <VGCard sx={{ p: 5 }}>
        <ProfileSettingForm />
      </VGCard>
    </>
  )
}

export { getStaticPropsWithTrans as getStaticProps }
