import { Grid } from "@mui/material";
import { useTranslation } from "next-i18next";
import CardImageFeature from "../molecule/CardImageFeature";


export default function CustomizedCardImage(props: {
  featureRequests: Array<{
    imageSrc: string;
    title: string;
    subtitle: string;
  }>
}) {
  const { t } = useTranslation("requestFitur");

  return (
    <Grid container spacing={2} justifyContent={'center'} alignItems={'stretch'} sx={{ mt: .5 }}>
        {
          props.featureRequests.length > 0 && props.featureRequests.map((item, idx) => {
            return (
              <Grid key={idx} item xs={6} md={4} lg={3} sx={{textAlign: 'center'}}>
                <CardImageFeature imageSrc={item.imageSrc} title={item.title} subtitle={item.subtitle} />
              </Grid>
            )
          })
        }
      </Grid>
  )
}