import {Typography, Box, Grid, FormControl, InputLabel, Input, FormHelperText, OutlinedInput, Button, TextField, Stack} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import DropzoneArea from "mui-file-dropzone/dist/components/DropzoneArea";
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';
import UploadFlatIcon from '@mui/icons-material/Upload';
import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

export default function RegistrationVIPModal (props: {
  // isBulk: boolean | false;
  name?: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("requestFitur");
  const [isActive] = useState(true)
  const [otherPlatformUrl, setOtherPlatformUrl] = useState('');
  const [otherPlatformUrlError, setOtherPlatformUrlError] = useState('');
  const [transactionDataFile, setTransactionDataFile] = useState('');
  const [transactionDataFileName, setTransactionDataFileName] = useState('Upload');
  const [fileObjects, setFileObjects] = useState<File[]>([]);

  const handleFileChange = (newFileObjects: File[], index: number) => {
    setFileObjects(newFileObjects);
    console.log(newFileObjects);
    // TODO: // hit endpoint Image Upload
  };

  const handleChangeOtherPlatformUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherPlatformUrl(event.target.value);
  };
  const handleUploadTransaksi = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileName = event.target.files[0]?.name;
      if (fileName){
        setTransactionDataFile(fileName);
      }
    }
  };
  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(otherPlatformUrl);
  };

  const titleModalStyle = {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 18,
    color: "primary.main"
  }
  const subtitleModalStyle = {
    fontSize: "16px",
    fontWeight: 800,
    color: "common.shade.400"
  }
  const labelFormStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: "common.shade.200"
  }
  const subLabelFormStyle = {
    fontSize: "13px",
    fontWeight: 500,
    color: "common.shade.100"
  }
  const subtitleTextInputStyle = {
    fontSize: "12px",
    fontWeight: 200,
    color: "common.shade.200"
  }
  const muiDropzoneStyle = {
    "& .mui-dropzone": {
      height: "124px",
      minHeight: "auto",
      width: "124px",
      background: "#F5F5F5",
      border: "2px dashed #9AA4BF",
      borderRadius: "10px",
      margin: "5px",
      "& .MuiSvgIcon-fontSizeMedium": {
        color: "#616A82",
        width: "31px",
        height: "21px"

      },
      "& .mui-dropzone__label": {
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: 0,
        marginTop: "40px",
        color: '#616A82',
      }
    }
  }

  return (
    <VGDialog
      isOpen={props.isOpen}
      width="400px"
      onClose={props.handleClose}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Grid container sx={{ my: 1 }}>
          <Grid item xs={12}>
            <Typography
              component="div"
              sx={titleModalStyle}
            >
              {props.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{mt: 1}}>
            <Typography
              component="div"
              sx={subtitleModalStyle}
            >
              {t("modalRegisterVIP.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{mt: 1}}>
            <Typography sx={labelFormStyle}>
              {t("modalRegisterVIP.form.0.title")}
            </Typography>
            <Typography sx={subLabelFormStyle}>
              {t("modalRegisterVIP.form.0.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={muiDropzoneStyle}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                fileObjects={fileObjects}
                dropzoneText={t("modalRegisterVIP.form.0.label")}
                dropzoneClass="mui-dropzone"
                dropzoneParagraphClass="mui-dropzone__label"
                showPreviewsInDropzone={true}
                Icon={UploadIcon}
                onChange={(files) => handleFileChange(files, 0)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sx={{mt: 1}}>
            <Typography sx={labelFormStyle}>
              {t("modalRegisterVIP.form.1.title")}
            </Typography>
            <Typography sx={subLabelFormStyle}>
              {t("modalRegisterVIP.form.1.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={muiDropzoneStyle}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                fileObjects={fileObjects}
                dropzoneText={t("modalRegisterVIP.form.1.label")}
                dropzoneClass="mui-dropzone"
                dropzoneParagraphClass="mui-dropzone__label"
                showPreviewsInDropzone={true}
                Icon={UploadIcon}
                onChange={(files) => handleFileChange(files, 1)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sx={{mt: 1}}>
            <Typography sx={labelFormStyle}>
              {t("modalRegisterVIP.form.2.title")}
            </Typography>
            <Typography sx={subLabelFormStyle}>
              {t("modalRegisterVIP.form.2.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{my: 1}}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleUploadTransaksi}
            />
            <label htmlFor="raised-button-file">
              <Button fullWidth variant="outlined" component="span" startIcon={<UploadFlatIcon />} sx={{textTransform: 'none'}}>
                {transactionDataFileName}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sx={{mt: 1}}>
            <TextField
              id={t("modalRegisterVIP.form.3.label")}
              value={otherPlatformUrl}
              error={otherPlatformUrlError === '' ? false : true}
              onChange={handleChangeOtherPlatformUrl}
              fullWidth={true}
              label={t("modalRegisterVIP.form.3.title")}
              defaultValue=""
              helperText={otherPlatformUrlError !== '' ? otherPlatformUrlError : ''}
            />
            {/* <FormControl error={otherPlatformUrlError === '' ? false : true} variant="standard">
              <InputLabel htmlFor={t("modalRegisterVIP.form.3.label")}>{t("modalRegisterVIP.form.3.title")}</InputLabel>
              <OutlinedInput
                fullWidth={true}
                id={t("modalRegisterVIP.form.3.label")}
                defaultValue=""
                aria-describedby={`${t("modalRegisterVIP.form.3.label")}-text`}
              />
              <FormHelperText id={`${t("modalRegisterVIP.form.3.label")}-text`}>
                {otherPlatformUrlError !== '' ? otherPlatformUrlError : ''}
              </FormHelperText>
            </FormControl> */}
            <Typography
              component="div"
              sx={subtitleTextInputStyle}
            >
              {t("modalRegisterVIP.form.3.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
          <Stack 
            justifyContent="center"
            alignItems="center"
            direction="row" 
            spacing={2}>
              <Button onClick={props.handleClose} fullWidth variant="outlined" sx={{textTransform: 'none'}}>
                {t("modalRegisterVIP.backBtn")}
              </Button>
              <Button onClick={handleSubmitForm} fullWidth variant="contained" color="success" sx={{textTransform: 'none'}}>
                {t("modalRegisterVIP.submitBtn")}
              </Button>
          </Stack>
          </Grid> 
        </Grid>
      </Box>
    </VGDialog>
  )
}
