import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useResponsive } from "~/utils/mediaQuery";


export default function CustomizedBanner(props: {
  imageSrc: string;
  subtitleImageSrc?: string;
  title?: string;
  desc?: string;
}) {
  const { t } = useTranslation("requestFitur");
  const { isMobile } = useResponsive();
    
  const bannerVIPTypograhpyStyle = {
    textAlign: {xs: 'center', md: 'left'},
    color: "common.shade.300",
    fontSize: {xs: "18px", lg: "22px", xl: "28px"},
    fontWeight: 800
  }
  const bannerSubVIPTypograhpyStyle = {
    textAlign: {xs: 'center', md: 'left'},
    color: "common.shade.300",
    fontSize: {xs: "12px", lg: "16px", xl: "20px"}, 
    fontWeight: 400
  }
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
      <Grid item xs={12}>
        <Box
            component="div"
            sx={{
              display: 'flex',
              position: 'relative',
              width: {xs: 1, md: 1},
              height: props.imageSrc == `url("/assets/vip_hero_bg.png")` ? {xs: "300px", md: "120px", lg: "180px", xl: "240px"} : {xs: "300px", sm: "320px", md: "360px"},
              borderRadius: '12px',
              backgroundImage: props.imageSrc,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
        >
          {
            props.imageSrc == `url("/assets/vip_hero_bg.png")` ?
            <Grid container spacing={1} justifyContent={'space-evenly'} alignContent={'center'} alignItems={'center'}>
              <Grid item xs={12} md={3} lg={2}>
                <Stack
                  direction={{ xs: 'row', sm: 'column' }}
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  useFlexGap flexWrap="wrap"
                >
                <Card sx={{ width: {xs: '36%', sm: '60%', md: '70%', lg: '90%'}, borderRadius: '12px', boxShadow: 0 }}>
                  <CardMedia
                    sx={{border: 0}}
                    component="img"
                    image={"/assets/vip-icon.png"}
                    title={`VIP Icon`}
                  />
                </Card>
                </Stack>
              </Grid>
              <Grid item xs={12} md={9} lg={9}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{px: {xs: 2, md: 0}, mt: {xs: 2, md: 0}}}
                  // useFlexGap flexWrap="wrap"
                >
                  <Typography
                      component="div"
                      sx={bannerVIPTypograhpyStyle}
                  >
                      {props.title}
                  </Typography>
                  <Typography
                    component="div"
                    sx={bannerSubVIPTypograhpyStyle}
                  >
                    {props.desc}
                  </Typography>
                </Stack>
                </Grid>
            </Grid>
            :
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
                        src={props.subtitleImageSrc ? props.subtitleImageSrc : ''}
                        width={80}
                        height={22}
                        alt="Logo Fitur"
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
          }
        </Box>
      </Grid>
    </Grid>
  )
}
