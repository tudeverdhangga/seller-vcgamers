import { useState } from "react";
import { useTranslation } from "next-i18next";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import queryString from "query-string";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import ListProductFilter from "~/components/organism/ListProductFilter";
import ListProduct from "~/components/organism/ListProduct";
import VGButton from "~/components/atomic/VGButton";
import { useResponsive } from "~/utils/mediaQuery";
import { useGetProduct } from "~/services/api/product";
import Skeleton from "@mui/material/Skeleton";
import StyledToastContainer from "~/components/atomic/StyledToastContainer";

interface ListProductParams {
  brand_id?: string,
  category_id?: string,
  feature?: string,
  limit?: number | 10,
  product_status?: string,
  search?: string
}

export default function KelolaProdukPage() {
  const { t } = useTranslation("listProduct");
  const { isMobile } = useResponsive();
  const router = useRouter()
  const [params, setParams] = useState<ListProductParams>({
    brand_id: "",
    category_id: "",
    feature: "",
    limit: 10,
    product_status: "",
    search: ""
  })
  const products = useGetProduct(queryString.stringify(params))

  const handleFilter = (key: string, param: string | number) => {
    setParams({
      ...params,
      [key]: param
    })
  }
  const refetchProduct = () => {
    void products.refetch()
  }

  return (
    <>
      <StyledToastContainer />

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
      <ListProductFilter handleChangeFilter={handleFilter} />
      {
        products.isLoading
          ? (
            [0, 1, 2, 3].map((index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="100%"
                height={110}
                sx={{mt:4}}
              />
            ))
          )
          : (
            <ListProduct
              products={products}
              refetchProduct={refetchProduct}
            />
          )
      }
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["listProduct"]);
