import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Grid from "@mui/material/Grid";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import { useResponsive } from "~/utils/mediaQuery";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import VGButton from "~/components/atomic/VGButton";
import BulkUpdateDownload from "~/components/organism/BulkUpdateDownload";
import BulkUpdateUpload from "~/components/organism/BulkUpdateUpload";
import { useRouter } from "next/router";

export default function EditProdukMassalPage() {
  const { t } = useTranslation("bulkUpdate");
  const { isMobile } = useResponsive();
  const router = useRouter()

  return (
    <>
      <VGPageTitle
        subTitle={t("subTitle")}
        title={t("title")}
        sx={{ width: "100%" }}
      >
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: isMobile ? "100%" : "auto"
        }}>
          <VGButton
            variant="contained"
            color="success"
            size="large"
            sx={{ width: isMobile ? "100%" : "auto" }}
            onClick={() => void router.push('/seller/produk/tambah-produk')}
          >
            <AddOutlinedIcon /> {t("addProduct")}
          </VGButton>
        </Box>
      </VGPageTitle>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <BulkUpdateDownload />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <BulkUpdateUpload />
        </Grid>
      </Grid>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["bulkUpdate"]);
