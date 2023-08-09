import { Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import ContentCard from "../molecule/ContentCard";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';


export default function CustomizedMidContent(props: {
  title: string,
  stringContents?: Array<string>,
  featureChecks?: Array<{
    text: string;
    active: boolean;
  }>
}) {
  const { t } = useTranslation("requestFitur");

  const subTitleStyle = {
    color: "common.shade.500",
    fontSize: {xs: "14px", md: "16px"}, 
    fontWeight: 600
  }
  const subContentStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.200",
  }

  return (
    <ContentCard title={props.title}>
      <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{pt: 1}}>
        {
          props.featureChecks && props.featureChecks.map((list, idx) => (
            <Grid key={idx} item xs={6}>
              <Stack direction="row" justifyContent={'start'} alignItems={'center'} spacing={1}>
                <div>
                {
                  list.active === true ?
                  <CheckOutlinedIcon sx={{color: "green", p: 0, m: 0}} />
                  :
                  <CloseIcon sx={{color: "red", p: 0, m: 0}} />
                }
                </div>
                <Typography
                  component="div"
                  sx={subTitleStyle}
                >
                  {list.text}
                </Typography>
              </Stack>
            </Grid>
          ))
        }
      </Grid>
        {
          props.stringContents && props.stringContents.map((list, idx) => (
            <Typography
              key={idx}
              component="div"
              sx={subContentStyle}
            >
              {`${idx+1}. ${list}`}
            </Typography>
          ))
        }
      </ContentCard>
  )
}
