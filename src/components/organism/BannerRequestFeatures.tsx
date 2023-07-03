import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "next-i18next";


export default function CustomizedBanner(props: {
  imageSrc: string;
  subtitleImageSrc: string;
  title: string;
  desc: string;
}) {
  const { t } = useTranslation("requestFitur");
    
  const bannerImageTypograhpyStyle = {
    color: "white",
    fontSize: {xs: "22px", lg: "24px"},
    fontWeight: 600
  }
  const bannerImageSubTypograhpyStyle = {
    px: {xs: 4, sm: 2, md: 1, lg: 0},
    mt: 2,
    color: "white",
    fontSize: {xs: "14px", md: "16px"}, 
    fontWeight: 400
  }

  return (
    <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} sx={{mt: .5}}>
      <Grid item xs={12} >
        <Box
            component="div"
            sx={{
            display: 'flex',
            position: 'relative',
            width: {xs: 1, md: 1},
            height: {xs: "300px", sm: "320px", md: "360px"},
            borderRadius: '12px',
            backgroundImage: props.imageSrc,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
            }}
        >
          <Grid container spacing={2} justifyContent={'space-around'} alignContent={'center'} >
            <Grid item xs={12} sm={5} lg={4} sx={{textAlign: 'center', px: 2}}>
                <Stack direction="row" justifyContent={'center'} alignItems={'flex-end'} spacing={1}>
                  <Typography
                      component="div"
                      sx={bannerImageTypograhpyStyle}
                  >
                      {props.title}
                  </Typography>
                  <div>
                      <Image
                          src={props.subtitleImageSrc}
                          width={80}
                          height={22}
                          alt="Logo Instant"
                      />
                  </div>
                </Stack>
                <Typography
                    component="div"
                    sx={bannerImageSubTypograhpyStyle}
                >
                    {props.desc}
                </Typography>
              </Grid>
            <Grid item xs={12} sm={5} lg={6}></Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}