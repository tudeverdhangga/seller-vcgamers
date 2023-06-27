import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Tabs,
  Tab,
  Typography,
  Box
} from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import { getStaticPropsWithTrans } from "~/utils/translation";
import VGCard from "~/components/atomic/VGCard";
import PageTitle from '~/components/atomic/PageTitle';
import OperationalSetting from '~/components/organism/OperationalSetting';
import VGAlert from '~/components/atomic/VGAlert';

export default function JadwalTokoPage() {
  const router = useRouter()
  const [value] = useState(1)

  const handleChangePage = () => {
    void router.push('/seller/pengaturan/profil-toko')
  }

  return (
    <>
      {/* Page Title */}
      <PageTitle
        subTitle="Personalisasi"
        title="Pengaturan Toko"
      />
      <VGCard sx={{ pl: 3 }}>
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
      <VGAlert color="info">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <AccessTimeFilledIcon sx={{ color: "primary.main" }}/>
          {' '}
          <Typography
            component="span"
            color="primary.main"
            sx={{ pl: 1 }}
          >
            Zona waktu yang digunakan adalah WIB
          </Typography>
        </Box>
      </VGAlert>
      <VGCard sx={{ p: 3 }}>
        <OperationalSetting />
      </VGCard>
    </>
  )
}

export { getStaticPropsWithTrans as getStaticProps };
