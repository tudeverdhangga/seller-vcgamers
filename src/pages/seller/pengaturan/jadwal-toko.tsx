import { useState } from 'react';
import { useRouter } from 'next/router';

import { getStaticPropsWithTrans } from "~/utils/translation";
import VGCard from "~/components/atomic/VGCard";

import {
  Box,
  Tabs,
  Tab
} from '@mui/material';

export default function JadwalTokoPage() {
  const router = useRouter()
  const [value] = useState(1)

  const handleChangePage = () => {
    void router.push('/seller/pengaturan/profil-toko')
  }

  return (
    <>
      <VGCard>
        <Tabs value={value}>
          <Tab
            label="Profil Toko"
            sx={{ fontWeight: 700 }}
            onClick={handleChangePage}
          />
          <Tab
            label="Jam Operational"
            sx={{ fontWeight: 700 }}
          />
        </Tabs>
      </VGCard>
      <VGCard>
        <Box sx={{ p: 3 }}>
          Jam Operational
        </Box>
      </VGCard>
    </>
  )
}

export { getStaticPropsWithTrans as getStaticProps };
