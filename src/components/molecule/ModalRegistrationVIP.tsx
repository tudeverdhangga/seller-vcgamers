import { Typography, Box, Grid, Button, TextField, Stack, Alert, Snackbar, Skeleton } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "next-i18next";
import { useAtom } from "jotai";
import DropzoneArea from "mui-file-dropzone/dist/components/DropzoneArea";
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';
import UploadFlatIcon from '@mui/icons-material/Upload';
import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { toast } from "react-toastify";
import { toastOption } from "~/utils/toast";
import { sendRequestDialogOpenAtom } from "~/atom/requestFitur";
import { useFileUpload, useMediaUpload } from "~/services/api/media";
import { BodyPayloadRegisterVIP, CustomErrorResponse, ErrorResponse, MediaUploaded, PrintErrorMessages, SeverityType, useRequestVIP } from "~/services/api/request-fitur";
import VGInputImage from "~/components/atomic/VGInputImage";

interface ResponsePhoto {
  object_url: string
  object_key: string
}

export default function RegistrationVIPModal(props: {
  name?: string;
  isOpen: boolean;
  handleClose: () => void;
  refetchStatusVIP: () => void;
}) {
  const { t } = useTranslation("requestFitur");
  const [transactionDataFileName, setTransactionDataFileName] = useState('Upload');
  const [imageKTP, setImageKTP] = useState<MediaUploaded | undefined>();
  const [imageSelfie, setImageSelfie] = useState<MediaUploaded | undefined>();
  const [dataTransactionFile, setDataTransactionFile] = useState<MediaUploaded | undefined>();
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [otherPlatformUrl, setOtherPlatformUrl] = useState('');
  const [otherPlatformUrlError, setOtherPlatformUrlError] = useState('');
  const [modalOpenRequestVIP, setModalOpenRequestVIP] = useAtom(sendRequestDialogOpenAtom);
  const [alertMessage, setAlertMessage] = useState("");
  const [severityAlert, setSeverityAlert] = useState<SeverityType>("error");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const mediaUpload = useMediaUpload();
  const fileUpload = useFileUpload();
  const postRequestVIP = useRequestVIP();

  // const handleFileChange = (newFileObjects: File[], index: number) => {
  //   setFileObjects(newFileObjects);
  //   console.log(newFileObjects);
  // };
  const handleImageChangeKTP = (newFileObjects: ChangeEvent<HTMLInputElement>) => {
    if (newFileObjects) {
      const file = newFileObjects.target.files
      if (file && typeof file[0] !== "undefined") {
        if (file[0].size > 2048000) { // in Byte
          toast.error(t("modalRegisterVIP.uploadFileSizeError"), toastOption)
        } else {
          const formData = new FormData();
          formData.append("file", file[0]);
          mediaUpload.mutate(formData, {
            onSuccess: (res) => {
              setImageKTP(res.data)
            }
          });
        }
      }
    }
  };
  const handleImageChangeSelfie = (newFileObjects: ChangeEvent<HTMLInputElement>) => {
    if (newFileObjects) {
      const file = newFileObjects.target.files
      if (file && typeof file[0] !== "undefined") {
        if (file[0].size > 2048000) { // in Byte
          toast.error(t("modalRegisterVIP.uploadFileSizeError"), toastOption)
        } else {
          const formData = new FormData();
          formData.append("file", file[0]);
          mediaUpload.mutate(formData, {
            onSuccess: (res) => {
              setImageSelfie(res.data)
            }
          });
        }
      }
    }
  };

  const handleUploadTransaksi = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files

    if (file && typeof file[0] !== "undefined") {
      if (file[0].size > 2 * 1024 * 1024) {
        toast.error(t("modalRegisterVIP.uploadFileSizeError"), toastOption)
      } else {
        const formData = new FormData();
        formData.append("file", file[0]);
        fileUpload.mutate(formData, {
          onSuccess: (res) => {
            setDataTransactionFile(res.data)
            setTransactionDataFileName(file[0]?.name ?? "File Uploaded")
          }
        });
      }
    }
  };

  const handleChangeOtherPlatformUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherPlatformUrl(event.target.value);
  };

  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (imageKTP && imageSelfie && dataTransactionFile) {
      const payload: BodyPayloadRegisterVIP = {
        ktp_image_url: imageKTP.object_key,
        ktp_selfie_image_url: imageSelfie.object_key,
        transaction_data_file_url: dataTransactionFile.object_key,
        other_platform_url: otherPlatformUrl
      }
      postRequestVIP.mutate(payload, {
        onSuccess: () => {
          // show Confirmed modal
          setModalOpenRequestVIP(true);

          props.handleClose();
          // refetch status VIP data & reset state
          props.refetchStatusVIP();
        },
        onError: (error) => {
          const err = error as CustomErrorResponse
          console.log("Err: ", err.response.data)
          const msg = `${err.response.data.code} ${err.response.data.status}: ` + PrintErrorMessages(err.response.data.validation_fields)
          setAlertMessage(msg)
          setSeverityAlert("error");
          setOpenSnackbar(true);
        }
      });

      setOtherPlatformUrl('');
      setOtherPlatformUrlError('');
    }
  };

  const onClose = () => {
    setImageKTP(undefined)
    setImageSelfie(undefined)
    props.handleClose()
  }

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
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography
              component="div"
              sx={subtitleModalStyle}
            >
              {t("modalRegisterVIP.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography sx={labelFormStyle}>
              {t("modalRegisterVIP.form.0.title")}
            </Typography>
            <Typography sx={subLabelFormStyle}>
              {t("modalRegisterVIP.form.0.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              {
                mediaUpload.isLoading
                  ? (
                    <Skeleton
                      variant="rounded"
                      width={124}
                      height={124}
                      sx={{ m: 1 }}
                    />
                  ) : (
                    <VGInputImage
                      id="ktp-image"
                      width="124px"
                      height="124px"
                      imageUrl={imageKTP?.object_url && `url(${imageKTP.object_url})`}
                      onChange={(files) => handleImageChangeKTP(files)}
                    />
                  )
              }
              {/* <DropzoneArea
                acceptedFiles={["image/*"]}
                fileObjects={fileObjects}
                dropzoneText={t("modalRegisterVIP.form.0.label")}
                dropzoneClass="mui-dropzone"
                dropzoneParagraphClass="mui-dropzone__label"
                showPreviewsInDropzone={true}
                Icon={UploadIcon}
                onChange={(files) => handleImageChangeKTP(files)}
              /> */}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography sx={labelFormStyle}>
              {t("modalRegisterVIP.form.1.title")}
            </Typography>
            <Typography sx={subLabelFormStyle}>
              {t("modalRegisterVIP.form.1.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box>
              {
                mediaUpload.isLoading
                  ? (
                    <Skeleton
                      variant="rounded"
                      width={124}
                      height={124}
                      sx={{ m: 1 }}
                    />
                  ) : (
                    <VGInputImage
                      id="selfie-ktp"
                      width="124px"
                      height="124px"
                      imageUrl={imageSelfie?.object_url && `url(${imageSelfie.object_url})`}
                      onChange={(files) => handleImageChangeSelfie(files)}
                    />
                  )
              }
              {/* <DropzoneArea
                acceptedFiles={["image/*"]}
                fileObjects={fileObjects}
                dropzoneText={t("modalRegisterVIP.form.1.label")}
                dropzoneClass="mui-dropzone"
                dropzoneParagraphClass="mui-dropzone__label"
                showPreviewsInDropzone={true}
                Icon={UploadIcon}
                onChange={(files) => handleImageChangeSelfie(files)}
              /> */}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography sx={labelFormStyle}>
              {t("modalRegisterVIP.form.2.title")}
            </Typography>
            <Typography sx={subLabelFormStyle}>
              {t("modalRegisterVIP.form.2.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ my: 1 }}>
            <input
              accept="file/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={(e) => handleUploadTransaksi(e)}
            />
            <label htmlFor="raised-button-file">
              <Button fullWidth variant="outlined" component="span" startIcon={<UploadFlatIcon />} sx={{ textTransform: 'none' }}>
                {transactionDataFileName}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
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
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack
              justifyContent="center"
              alignItems="center"
              direction="row"
              spacing={2}>
              <Button onClick={onClose} fullWidth variant="outlined" sx={{ textTransform: 'none' }}>
                {t("modalRegisterVIP.backBtn")}
              </Button>
              <Button onClick={handleSubmitForm} fullWidth variant="contained" color="success" sx={{ textTransform: 'none' }}>
                {t("modalRegisterVIP.submitBtn")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* for Alerting */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={severityAlert} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </VGDialog>
  )
}
