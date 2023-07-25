import { useTranslation } from "next-i18next";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import ListProductFilter from "~/components/organism/ListProductFilter";
import ListProduct from "~/components/organism/ListProduct";
import VGButton from "~/components/atomic/VGButton";
import { useResponsive } from "~/utils/mediaQuery";

export default function KelolaProdukPage() {
  const { t } = useTranslation("listProduct");
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
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2, width: isMobile ? "100%" : "auto" }}
            onClick={() => void router.push('/seller/produk/edit-produk-massal')}
          >
            {t("bulkUpdate")}
          </VGButton>
          <VGButton
            variant="contained"
            color="success"
            size="large"
            sx={{ width: isMobile ? "100%" : "auto" }}
            onClick={() => void router.push('/seller/produk/tambah-produk')}
          >
            <AddOutlinedIcon/> {t("addProduct")}
          </VGButton>
        </Box>
      </VGPageTitle>
      <ListProductFilter />
      <ListProduct />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["listProduct"]);
