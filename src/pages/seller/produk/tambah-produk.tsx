import { useTranslation } from "next-i18next";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import AddProductDetail from "~/components/organism/AddProductDetail";
import AddProductVariant from "~/components/organism/AddProductVariant";
import VGButton from "~/components/atomic/VGButton";
import { useRouter } from "next/router";

export default function TambahProdukPage() {
  const { t } = useTranslation("addProduct");
  const router = useRouter()
  
  return (
    <>
      <VGPageTitle
        subTitle={(
          <>
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                color:"common.shade.200",
                cursor: "pointer"
              }}
              onClick={() => void router.push('/seller/produk/kelola-produk')}
            >
              <ArrowBackIcon
                fontSize="small"
                sx={{ mr: 1 }}
              />
              {t("subTitle")}
            </Link>
          </>
        )}
        title={t("title")}
        sx={{ width: "100%" }}
      />
      <AddProductDetail />
      <AddProductVariant />
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <VGButton
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
          size="large"
        >
          {t("cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
        >
          {t("save")}
        </VGButton>
      </Box>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["addProduct"]);
