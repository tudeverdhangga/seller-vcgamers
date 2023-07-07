import Image from "next/image";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "next-i18next";

import { products } from "~/utils/dummy/product"
import { useResponsive } from "~/utils/mediaQuery";
import ListProductItem from "~/components/molecule/ListProductItem";
import VGButton from "~/components/atomic/VGButton";

export default function ListProduct() {
  const { t } = useTranslation("listProduct");
  const { isDesktop } = useResponsive();

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
      {
        products.length !== 0
          ? (
            products.map((product, index) => (
              <ListProductItem
                key={index}
                id={index}
                image={product.image}
                name={product.name}
                status={product.status}
                price={product.price}
                stock={product.stock}        
                feature={product.feature}        
              />
            ))
          )
          : (
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
      { isDesktop && tableHeadContainer}
      {tableRowContainer}
    </>
  )
}