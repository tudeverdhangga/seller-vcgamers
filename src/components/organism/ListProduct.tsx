import Image from "next/image";
import { Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "next-i18next";
import { type UseInfiniteQueryResult } from "@tanstack/react-query";

import { useResponsive } from "~/utils/mediaQuery";
import ListProductItem from "~/components/molecule/ListProductItem";
import VGButton from "~/components/atomic/VGButton";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

interface ResponseProduct {
  code: number
  status: string
  data: Data
  message: string
}
interface Data {
  data: Item[]
  pagination_data: PaginationData
}
interface Item {
  final_price: number
  variation_id: string
  product_id: string
  image_url: string
  is_active: boolean
  is_instant: boolean
  is_kilat: boolean
  is_kilat_switchable: boolean
  next_update_price: string
  next_activate_kilat: string
  name: string
  stock: number
}
interface PaginationData {
  prev_cursor: string
  next_cursor: string
  current_records: number
}

export default function ListProduct({ products, refetchProduct }: {
  products: UseInfiniteQueryResult<ResponseProduct, string>;
  refetchProduct: () => void;
}) {
  const { t } = useTranslation("listProduct");
  const { isDesktop } = useResponsive();
  const router = useRouter();
  const productList = products?.data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data.data] as Item[];
  }, [] as Item[]);

  const getFeature = (product: Item) => {
    let status = ""

    if (product.is_instant) {
      status = "instant"
    } else if (product.is_kilat_switchable) {
      status = "kilat"
    }

    return status
  }

  const tableHeadContainer = (
    <Grid
      container
      spacing={2}
      sx={{ p: 3, pb: 0 }}
    >
      <Grid
        item
        xs={12}
        md={3}
      >
        <Typography
          color="secondary"
          fontSize="14px"
          fontWeight="700"
        >
          {t("table.th.sku")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
      >
        <Typography
          color="secondary"
          fontSize="14px"
          fontWeight="700"
          textAlign="center"
        >
          {t("table.th.price")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
      >
        <Typography
          color="secondary"
          fontSize="14px"
          fontWeight="700"
          textAlign="center"
        >
          {t("table.th.feature")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={1}
      >
        <Typography
          color="secondary"
          fontSize="14px"
          fontWeight="700"
          textAlign="center"
        >
          {t("table.th.stock")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
      >
        <Typography
          color="secondary"
          fontSize="14px"
          fontWeight="700"
          textAlign="center"
        >
          {t("table.th.actions")}
        </Typography>
      </Grid>
    </Grid>
  )
  const tableRowContainer = (
    <>
      <InfiniteScroll
        dataLength={productList ? productList.length : 0}
        hasMore={products.hasNextPage ?? false}
        next={products.fetchNextPage}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        loader={
          <Skeleton
            variant="rounded"
            width="100%"
            height={110}
            sx={{ mt: 4 }}
          />
        }
      >
        {productList &&
          productList.map((product, index) => (
            <ListProductItem
              key={index}
              id={product.variation_id}
              productId={product.product_id}
              image={product.image_url}
              name={product.name}
              active={product.is_active}
              price={product.final_price}
              stock={product.stock}
              feature={getFeature(product)}
              isKilatActive={product.is_kilat}
              nextUpdatePrice={product.next_update_price}
              nextActiveKilat={product.next_activate_kilat}
              refetchProduct={refetchProduct}
            />
          ))}
      </InfiniteScroll>
      {
        products.isSuccess && productList?.length == 0 && (
          <Grid
            item
            xs={12}
            alignItems="center"
            justifyContent="space-between"
            display="flex"
            flexDirection="column"
            my={5}
            height={197}
          >
            <Image
              src="/assets/empty-img.png"
              width={300}
              height={197}
              alt="Empty Product"
            />
            <Typography sx={{ pt: 1, pb: 3 }}>
              {t("table.empty.label")}
            </Typography>
            <VGButton
              variant="contained"
              color="success"
              sx={{ width: "fit-content" }}
              onClick={() => void router.push('/seller/produk/tambah-produk')}
            >
              <AddIcon /> {t("table.empty.button")}
            </VGButton>
          </Grid>
        )
      }
    </>
  )

  return (
    <>
      {isDesktop && tableHeadContainer}
      {tableRowContainer}
    </>
  )
}