import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import DropzoneArea from "mui-file-dropzone/dist/components/DropzoneArea";
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';

import VGCard from "~/components/atomic/VGCard";
import { useState } from "react";
import Box from "@mui/material/Box";

export default function BulkUpdateUpload() {
  const { t } = useTranslation("bulkUpdate");
  const [fileObjects, setFileObjects] = useState<File[]>([]);

  const handleFileChange = (newFileObjects: File[], index: number) => {
    setFileObjects(newFileObjects);
    // Handle the uploaded files
    console.log(newFileObjects);
    console.log(index);
  };
  const subLabelStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: "common.shade.700",
    my: 2
  }

  return (
    <VGCard sx={{ height: 370, maxHeight: 370 }}>
      <Typography
       sx={{
        fontSize: 16,
        fontWeight: 700,
        color: "primary.main",
        mb: 2
       }}
      >
        {t("upload.title")}
      </Typography>
      <Typography sx={{...subLabelStyle, mb: 0}}>
        {t("upload.note.title")}
      </Typography>
      <ol style={{ marginTop: 0 }}>
        <li style={{
          ...subLabelStyle,
          color: "#616A82"
        }}>
          {t("upload.note.1")}
        </li>
        <li style={{
          ...subLabelStyle,
          color: "#616A82"
        }}>
          {t("upload.note.2")}
        </li>
        <li style={{
          ...subLabelStyle,
          color: "#616A82"
        }}>
          {t("upload.note.3")}
        </li>
      </ol>
      <Box
        sx={{
          "& .mui-dropzone": {
            height: "auto",
            minHeight: "auto",
            background: "#F5F5F5",
            border: "2px dashed #9AA4BF"
          }
        }}
      >
        <DropzoneArea
          dropzoneClass="mui-dropzone"
          acceptedFiles={["image/*"]}
          fileObjects={fileObjects}
          dropzoneText={t("upload.label")}
          showPreviewsInDropzone={false}
          Icon={UploadIcon}
          onChange={(files) => handleFileChange(files, 0)}
        />
      </Box>
    </VGCard>
  )
}