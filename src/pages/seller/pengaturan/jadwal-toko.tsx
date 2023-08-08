import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Tabs,
  Tab,
  Typography,
  Box
} from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useTranslation } from "next-i18next";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGCard from "~/components/atomic/VGCard";
import VGPageTitle from '~/components/atomic/VGPageTitle';
import OperationalSetting from '~/components/organism/OperationalSetting';
import VGAlert from '~/components/atomic/VGAlert';

export default function JadwalTokoPage() {
  const router = useRouter()
  const [value] = useState(1)
  const { t } = useTranslation("setting");

  const handleChangePage = () => {
    void router.push('/seller/pengaturan/profil-toko')
  }

  return (
    <>
      <VGPageTitle
        subTitle={t("subTitle")}
        title={t("title")}
      />
      <VGCard sx={{ p: 0, pl: 3 }}>
        <Tabs value={value}>
          <Tab
            label={t("tab.profile.label")}
            sx={{ fontWeight: 700 }}
            onClick={handleChangePage}
          />
          <Tab
            label={t("tab.operational.label")}
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
          <AccessTimeFilledIcon sx={{ color: "primary.main" }} />
          {' '}
          <Typography
            component="span"
            color="primary.main"
            sx={{ pl: 1 }}
          >
            {t("tab.operational.info")}
          </Typography>
        </Box>
      </VGAlert>

      <VGCard>
        <OperationalSetting />
      </VGCard>
    </>
  )
}

export const getStaticProps = getStaticPropsWithTransNamespace(["setting"]);
