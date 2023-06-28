import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { products } from "~/utils/dummy/product"
import ListProductItem from "~/components/molecule/ListProcutItem";

export default function ListProduct() {
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
          SKU PRODUK
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
          HARGA
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
          FITUR
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
          STOK
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
      >
        <Typography
          color="secondary"
          fontSize="14px"
          fontWeight="700"
          textAlign="center"
        >
          ACTION
        </Typography>
      </Grid>
    </Grid> 
  )
  const tableRowContainer = (
    <>
      {products.map((product, index) => (
        <ListProductItem
          key={index}
          image={product.image}
          name={product.name}
          status={product.status}
          price={product.price}
          stock={product.stock}        
          feature={product.feature}        
        />
      ))}
    </>
  )
  
  return (
    <>
      {tableHeadContainer}
      {tableRowContainer}
    </>
  )
}