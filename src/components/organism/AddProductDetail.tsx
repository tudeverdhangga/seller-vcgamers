import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import DropzoneArea from "mui-file-dropzone/dist/components/DropzoneArea";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';
import Box from "@mui/material/Box";

import VGCard from "~/components/atomic/VGCard";
import VGRichEditor from "~/components/atomic/VGRichEditor/index";

export default function AddProductDetail() {
  const { t } = useTranslation("addProduct");
  const category = [
    { label: "Category A", value: "a" },
    { label: "Category B", value: "b" },
    { label: "Category C", value: "c" }
  ]
  const brand = [
    { label: "Brand A", value: "a" },
    { label: "Brand B", value: "b" },
    { label: "Brand C", value: "c" }
  ]
  const group = [
    { label: "Group A", value: "a" },
    { label: "Group B", value: "b" },
    { label: "Group C", value: "c" }
  ]

  const [fileObjects, setFileObjects] = useState<File[]>([]);

  const handleFileChange = (newFileObjects: File[], index: number) => {
    setFileObjects(newFileObjects);
    // Handle the uploaded files
    console.log(newFileObjects);
    console.log(index);
  };

  // Style
  const labelStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "common.shade.200"
  }
  const subLabelStyle = {
    fontSize: "12px",
    fontWeight: "500",
    color: "common.shade.100"
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
    <VGCard>
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: 700,
          fontSize: "16px"
        }}
      >
        {t("detail.title")}
      </Typography>
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
          <Autocomplete
            id="product-category"
            disablePortal
            options={category}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("detail.category")}
                size="small"
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Autocomplete
            id="product-brand"
            disablePortal
            options={brand}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("detail.brand")}
                size="small"
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Autocomplete
            id="product-group"
            disablePortal
            options={group}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("detail.group")}
                size="small"
              />
            )}
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
          <Typography sx={labelStyle}>
            {t("detail.description")}
          </Typography>
          <Grid
            item
            xs={12}
          >
            <VGRichEditor />
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
          <Typography sx={labelStyle}>
            {t("detail.images.label")}
          </Typography>
          <Typography sx={subLabelStyle}>
            {t("detail.images.subLabel")}
          </Typography>
          <Grid
            item
            xs={12}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={muiDropzoneStyle}>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  fileObjects={fileObjects}
                  dropzoneText={t("variant.table.td.image.label")}
                  dropzoneClass="mui-dropzone"
                  dropzoneParagraphClass="mui-dropzone__label"
                  showPreviewsInDropzone={false}
                  Icon={UploadIcon}
                  onChange={(files) => handleFileChange(files, 0)}
                />
              </Box>
              <Box sx={muiDropzoneStyle}>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  fileObjects={fileObjects}
                  dropzoneText={t("variant.table.td.image.label")}
                  dropzoneClass="mui-dropzone"
                  dropzoneParagraphClass="mui-dropzone__label"
                  showPreviewsInDropzone={false}
                  Icon={UploadIcon}
                  onChange={(files) => handleFileChange(files, 1)}
                />
              </Box>
              <Box sx={muiDropzoneStyle}>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  fileObjects={fileObjects}
                  dropzoneText={t("variant.table.td.image.label")}
                  dropzoneClass="mui-dropzone"
                  dropzoneParagraphClass="mui-dropzone__label"
                  showPreviewsInDropzone={false}
                  Icon={UploadIcon}
                  onChange={(files) => handleFileChange(files, 2)}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </VGCard>
  )
}