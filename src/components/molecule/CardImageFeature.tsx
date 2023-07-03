import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "next-i18next";


export default function CustomizedCardImage(props: {
  imageSrc: string;
  title: string;
  subtitle: string;
}) {
    
  const featureCardStyle = {
    color: "primary.main",
    fontSize: {xs: "16px", md: "18px"}, 
    fontWeight: "bold"
  }
  const subFeatureCardStyle = {
    color: "primary.main",
    fontSize: {xs: "12px", md: "14px"}, 
    fontWeight: 400
  }

  return (
    <Box>
      <Image src={`/assets/${props.imageSrc}.png`} width={200} height={200} alt="Profile Picture" />
      <Card sx={{backgroundColor: "#EFEBFF", boxShadow: 0, textAlign: 'center', marginTop: "-100px"}}>
        <CardContent sx={{pt: 12}}>
            <Typography
              component="div"
              sx={featureCardStyle}
            >
              {props.title}
            </Typography>
            <Typography
            component="div"
            sx={subFeatureCardStyle}
            >
              {props.subtitle}
            </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}