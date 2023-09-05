import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Grid, Paper, Stack, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses, LinearProgressProps } from '@mui/material/LinearProgress';
import { useTranslation } from "next-i18next";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const BorderLinearProgress = styled(({ style, ...props }: LinearProgressProps) => (
  <LinearProgress
    {...props}
  />
))(({ theme, style }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[900],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: style?.backgroundColor,
  },
}));

export default function CustomizedFeatureContentCondition(props: {
  totalAllTransaction: number;
  totalSuccessTransaction: number;
  minimumAllTransaction: number;
  minimumSuccessPercentageTransaction: number;
  successPercentageTransaction: number;
}) {
  const { t } = useTranslation("requestFitur");

  const snkStyle = {
    color: "primary.main",
    fontSize: {xs: "14px", md: "16px"}, 
    fontWeight: "bold"
  }
  const captionTrackTransactionStyle = {
    fontSize: "18px",
    fontWeight: 600,
    color: "common.shade.400",
  }
  const subCaptionTrackTransactionStyle = {
    color: "common.shade.500",
    fontSize: "14px", 
    fontWeight: 400
  }
  const subCaptionStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.200",
  }
  const errorRequestStyle = {
    color: "common.red.400",
    fontSize: {xs: "12px", md: "14px"}, 
    fontWeight: "bold"
  }
  const successRequestStyle = {
    color: "common.green.500",
    fontSize: {xs: "12px", md: "14px"}, 
    fontWeight: "bold"
  }
  const errorRequestMessageStyle = {
    color: "common.shade.100",
    fontSize: {xs: "12px", md: "14px"}, 
    fontWeight: 800
  }

  return (
    <Paper sx={{  mt:2, p: 2, backgroundColor: "#fff", borderRadius: '8px', boxShadow: "none"}}>
      <Typography
        component="div"
        sx={snkStyle}
      >
        {t("request.title")}
      </Typography>
      
      {/* Transaction Info */}
      <Grid container spacing={2} justifyContent={'center'} sx={{ mt: .5 }}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ px: 2, py: 1, backgroundColor: "#FBFAFF", boxShadow: "none" }}>
            {/* Progress Bar */}
            <BorderLinearProgress 
              style={{backgroundColor: props.totalAllTransaction >= props.minimumAllTransaction ? '#17e339' : '#ed3e3e'}} 
              variant="determinate" 
              color="primary" 
              value={props.totalAllTransaction*2 > 100 ? 100 : props.totalAllTransaction*2} 
            />

            <Typography
              component="div"
              sx={subCaptionTrackTransactionStyle}
            >
              {t("request.transaction.title")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography
                component="span"
                sx={captionTrackTransactionStyle}
              >
                {t("request.transaction.data", { count: props.totalAllTransaction })}
              </Typography>
              {props.totalAllTransaction >= props.minimumAllTransaction ? <CheckOutlinedIcon sx={{color: "green", p: 0, m: 0}} /> : <ClearOutlinedIcon sx={{color: "red", p: 0, m: 0}} />}
            </Stack>
            <Typography
              component="div"
              sx={subCaptionStyle}
            >
              {t("request.transaction.minimum", { count: props.minimumAllTransaction })}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Paper sx={{ px: 2, py: 1, backgroundColor: "#FBFAFF", boxShadow: "none" }}>
            {/* Progress Bar */}
            <BorderLinearProgress 
              style={{backgroundColor: props.successPercentageTransaction >= props.minimumSuccessPercentageTransaction ? '#17e339' : '#ed3e3e'}} 
              variant="determinate" 
              color="secondary" 
              value={props.successPercentageTransaction >= props.minimumSuccessPercentageTransaction ? 100 : props.successPercentageTransaction} 
            />

            <Typography
              component="div"
              sx={subCaptionTrackTransactionStyle}
            >
              {t("request.percentage.title")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography
                component="span"
                sx={captionTrackTransactionStyle}
              >
                {t("request.percentage.data", { count: props.successPercentageTransaction })}
              </Typography>
              {props.successPercentageTransaction >= props.minimumSuccessPercentageTransaction ? <CheckOutlinedIcon sx={{color: "green", p: 0, m: 0}} /> : <ClearOutlinedIcon sx={{color: "red", p: 0, m: 0}} />}
            </Stack>
            <Typography
              component="div"
              sx={subCaptionStyle}
            >
              {t("request.percentage.minimum", { count: props.minimumSuccessPercentageTransaction })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {
        props.totalAllTransaction >= props.minimumAllTransaction && props.successPercentageTransaction >= props.minimumSuccessPercentageTransaction ?      
        <Alert sx={{backgroundColor: "#fff"}} iconMapping={{
          error: <SentimentSatisfiedAltIcon fontSize="inherit" />
        }} severity="success">
          <Typography
            component="span"
            sx={successRequestStyle}
          >
            {t("alert.permitted.msg")}
          </Typography>
        </Alert>
         :
        <Alert sx={{backgroundColor: "#fff"}} iconMapping={{
          error: <SentimentVeryDissatisfiedIcon fontSize="inherit" />
        }} severity="error">
          <Typography
            component="span"
            sx={errorRequestStyle}
          >
            {t("alert.notPermitted.danger")}
          </Typography>
          <Typography
            component="span"
            sx={errorRequestMessageStyle}
          >
            &nbsp; {t("alert.notPermitted.sub", { featurename: "Instant" })}
          </Typography> 
        </Alert>
      }
      
    </Paper>
  )
}