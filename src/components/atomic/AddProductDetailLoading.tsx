import { Grid, Skeleton, Box } from "@mui/material";

import VGCard from "./VGCard";

export default function AddProductDetailLoading() {
  return (
    <>
      <VGCard>
        <Grid
          container
          spacing={2}
          sx={{ mb: 3, mt: 1 }}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <Skeleton
              variant="rounded"
              width="100%"
              height={40}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Skeleton
              variant="rounded"
              width="100%"
              height={40}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Skeleton
              variant="rounded"
              width="100%"
              height={40}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ my: 3 }}
        >
          <Grid
            item
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={167}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ my: 1 }}
        >
          <Grid
            item
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <Box sx={{ display: "flex" }}>
                <Box m={1}>
                  <Skeleton
                    variant="rounded"
                    width={124}
                    height={124}
                    sx={{ m: 1 }}
                  />
                </Box>
                <Box m={1}>
                  <Skeleton
                    variant="rounded"
                    width={124}
                    height={124}
                    sx={{ m: 1 }}
                  />
                </Box>
                <Box m={1}>
                  <Skeleton
                    variant="rounded"
                    width={124}
                    height={124}
                    sx={{ m: 1 }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </VGCard>
      <VGCard>
        <Skeleton
          variant="rounded"
          width="100%"
          height={60}
        />
      </VGCard>
    </>
  )
}