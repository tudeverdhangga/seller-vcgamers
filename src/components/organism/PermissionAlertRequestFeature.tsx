import { Alert, AlertColor, Grid, SvgIconTypeMap, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import ContentCard from "../molecule/ContentCard";


export default function CustomizedPermissionAlert(props: {
  alertIcon: React.ReactNode,
  alertSeverity: AlertColor | undefined,
  alertMessage: string,
  alertTitle?: string,
  children?: React.ReactNode;
}) {
  const { t } = useTranslation("requestFitur");

  const nonactiveAlertMessageStyle = {
    color: "common.shade.400",
    fontSize: {xs: "12px", md: "14px"}, 
    fontWeight: 600
  }
  const errorRequestMessageStyle = {
    color: "common.shade.100",
    fontSize: {xs: "12px", md: "14px"}, 
    fontWeight: 800
  }

  return (
    <ContentCard sx={{p: 1, boxShadow: "none"}}>
      <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'}>
          <Grid item xs={12}>
            <Alert sx={{backgroundColor: "#fff"}} iconMapping={{
              error: props.alertIcon
            }} severity={props.alertSeverity}>
              {
                props.alertTitle && 
                <Typography
                  component="span"
                  sx={nonactiveAlertMessageStyle}
                >
                  {props.alertTitle}
                </Typography>
              }
              <Typography
                component="div"
                sx={errorRequestMessageStyle}
              >
                {props.alertMessage}
              </Typography> 
            </Alert>
          </Grid>
        </Grid>
    </ContentCard>
  )
}