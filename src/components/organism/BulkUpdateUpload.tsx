import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import DropzoneArea from "mui-file-dropzone/dist/components/DropzoneArea";
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';
import { useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

import VGCard from "~/components/atomic/VGCard";
import { useUploadBulkProduct } from "~/services/api/product";
import { toastOption } from "~/utils/toast";

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function BulkUpdateUpload() {
  const { t } = useTranslation("bulkUpdate");
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const uploadFile = useUploadBulkProduct();

  const handleUpload = (newFileObjects: File[]) => {
    // uploadFile.mutate
    setFileObjects(newFileObjects);
    if (newFileObjects.length > 0) {
      const formData = new FormData();
      formData.append('file', newFileObjects[0] as File)
      uploadFile.mutate(formData, {
        onSuccess: () => {
          toast.success(t("upload.onSuccess"), toastOption)
        },
        onError: (error) => {
          const err = error as ErrorResponse
          const errorMessage = `${t("upload.onError")}: ${err?.response?.data?.message}`
          toast.error(errorMessage, toastOption)
        }
      })
    }
  };

  const subLabelStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: "common.shade.700",
    my: 2
  }
  const dropzoneStyle = {
    "& .mui-dropzone": {
      height: "168px",
      minHeight: "auto",
      background: "#F5F5F5",
      border: "2px dashed #9AA4BF",

      ".MuiBox-root": {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
        color: "#1D2333",

        ".MuiTypography-root": {
          fontSize: "16px",
          fontWeight: 600,
          margin: 0,
          paddingTop: "10px",
        },
        ".MuiSvgIcon-fontSizeMedium": {
          color: "#616A82",
        },
      }
    }
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
      <Typography sx={{ ...subLabelStyle, mb: 0 }}>
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
      <Box sx={dropzoneStyle}>
        <DropzoneArea
          dropzoneClass="mui-dropzone"
          acceptedFiles={["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
          fileObjects={fileObjects}
          dropzoneText={t("upload.label")}
          showPreviewsInDropzone={false}
          showAlerts={false}
          Icon={UploadIcon}
          onChange={(files) => handleUpload(files)}
        />
      </Box>
    </VGCard>
  )
}