import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/CloudUploadOutlined";
import DropzoneArea from "mui-file-dropzone/dist/components/DropzoneArea";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Image from "next/image";
import SeeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from "react";
import TextField from "@mui/material/TextField";

import { variant } from "~/utils/dummy/variant"
import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import AddVariantDialog from "~/components/molecule/AddVariantDialog";

export default function AddProductVariant() {
  const { t } = useTranslation("addProduct");
  const [isImage, setIsImage] = useState<boolean | undefined>(undefined)
  const [fileObjects, setFileObjects] = useState<File[]>();
  const [isShowAddVariantDialog, setIsShowAddVariantDialog] = useState(false);
  
  const onChangeImageFile = (newFileObjects: File[], index: number) => {
    setFileObjects(newFileObjects);
    // Handle the uploaded files
    console.log(fileObjects);
    console.log(newFileObjects);
    console.log(index);
  };
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImage(e.target.checked)
  }
  const getIsImage = (data: boolean) => {
    if (isImage !== undefined) {
      return isImage;
    }
    return data;
  }
  const onClickAddVariant = (value: boolean) => {
    setIsShowAddVariantDialog(value)
  }

  const muiDropzoneStyle = {
    "& .mui-dropzone": {
      height: "47px",
      minHeight: "auto",
      width: "47px",
      background: "#F5F5F5",
      border: "2px dashed #9AA4BF",
      borderRadius: "10px",
      margin: "5px",
      "& .MuiSvgIcon-fontSizeMedium": {
        color: "#616A82",
        width: "18px",
        height: "16px"

      },
      "& .mui-dropzone__label": {
        fontSize: '10px',
        fontWeight: '600',
        marginBottom: 0,
        marginTop: "5px",
        color: '#616A82',
      }
    }
  }
  const thStyle = {
    color: "#7750F8",
    fontWeight: 700,
    fontSize: "14px",
    borderRight: "1px solid #DEDEDE",
  }

  const tableContainer = (
    <>
      {
        variant.length !== 0
        && (
          <TableContainer
            sx={{
              border: "1px solid #DEDEDE",
              borderRadius: "10px",
              mb: 2
            }}
          >
            <Table aria-label="simple table">
              <TableHead
                sx={{
                  backgroundColor: "#EFEBFF",
                  borderBottom: "1.5px solid #DEDEDE",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={thStyle}
                    align="center"
                  >
                    {t("variant.table.th.var")}
                  </TableCell>
                  <TableCell
                    sx={thStyle}
                  >
                    {t("variant.table.th.image")}
                  </TableCell>
                  <TableCell
                    sx={thStyle}
                  >
                    {t("variant.table.th.name")}
                  </TableCell>
                  <TableCell
                    sx={thStyle}
                  >
                    {t("variant.table.th.stock")}
                  </TableCell>
                  <TableCell
                    sx={thStyle}
                  >
                    {t("variant.table.th.price")}
                  </TableCell>
                  <TableCell
                    sx={thStyle}
                  >
                    {t("variant.table.th.statistic")}
                  </TableCell>
                  <TableCell
                    sx={thStyle}
                  >
                    {t("variant.table.th.action")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variant.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{borderBottom: "1.5px solid #DEDEDE"}}
                  >
                    <TableCell sx={{ borderRight: "1px solid #DEDEDE" }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #DEDEDE" }}>
                      <Switch
                        defaultChecked={row.isActiveImage}
                        onChange={(event) => onChangeImage(event)}
                      />
                      <Typography fontSize={12}>
                        {getIsImage(row.isActiveImage)
                          ? t("variant.table.td.image.enabled")
                          : t("variant.table.td.image.disabled")
                        }
                      </Typography>
                      <Box display={"flex"}>
                        <Box sx={muiDropzoneStyle}
                        >
                          <DropzoneArea
                            acceptedFiles={["image/*"]}
                            fileObjects={fileObjects}
                            dropzoneText={t("variant.table.td.image.label")}
                            dropzoneClass="mui-dropzone"
                            dropzoneParagraphClass="mui-dropzone__label"
                            showPreviewsInDropzone={false}
                            Icon={UploadIcon}
                            onChange={(files) => onChangeImageFile(files, 0)}
                          />
                        </Box>
                        <Box sx={muiDropzoneStyle}
                        >
                          <DropzoneArea
                            acceptedFiles={["image/*"]}
                            fileObjects={fileObjects}
                            dropzoneText={t("variant.table.td.image.label")}
                            dropzoneClass="mui-dropzone"
                            dropzoneParagraphClass="mui-dropzone__label"
                            showPreviewsInDropzone={false}
                            Icon={UploadIcon}
                            onChange={(files) => onChangeImageFile(files, 1)}
                          />
                        </Box>
                        <Box sx={muiDropzoneStyle}
                        >
                          <DropzoneArea
                            acceptedFiles={["image/*"]}
                            fileObjects={fileObjects}
                            dropzoneText={t("variant.table.td.image.label")}
                            dropzoneClass="mui-dropzone"
                            dropzoneParagraphClass="mui-dropzone__label"
                            showPreviewsInDropzone={false}
                            Icon={UploadIcon}
                            onChange={(files) => onChangeImageFile(files, 2)}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #DEDEDE" }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "common.shade.700"
                        }}
                      >
                        {row.name}
                      </Typography>
                      {row.isKilat &&
                        (
                          <Box display={"flex"}>
                          <Image
                            src="/assets/badge-kilat.svg"
                            alt="Badge Kilat"
                            width={53}
                            height={11}
                          />
                          <Switch defaultChecked/>
                        </Box>
                        )
                      }
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #DEDEDE", width: "114px" }}>
                      <TextField
                        variant="outlined"
                        defaultValue={row.stock}
                        fullWidth
                        type="number"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #DEDEDE", width: "144px" }}>
                      <TextField
                        variant="outlined"
                        defaultValue={row.price}
                        fullWidth
                        type="number"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #DEDEDE" }}>
                      <Box display="flex">
                        <SeeIcon color={"secondary"}/>
                        <Typography pl={2} color={"common.shade.200"} fontSize={14}>
                          {t("variant.table.td.statistic.visit")}
                        </Typography>
                        <Typography pl={1} fontWeight={700} color={"common.shade.700"}>
                          {row.visit}
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <FavoriteIcon color={"secondary"}/>
                        <Typography pl={2} color={"common.shade.200"} fontSize={14}>
                          {t("variant.table.td.statistic.favorite")}
                        </Typography>
                        <Typography pl={1} fontWeight={700} color={"common.shade.700"}>
                          {row.favorite}
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <ShoppingCartIcon color={"secondary"}/>
                        <Typography pl={2} color={"common.shade.200"} fontSize={14}>
                          {t("variant.table.td.statistic.sold")}
                        </Typography>
                        <Typography pl={1} fontWeight={700} color={"common.shade.700"}>
                          {row.sold}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #DEDEDE" }}>
                      <Box display="flex">
                        <VGButton
                          variant="text"
                          color="primary"
                          size="small"
                        >
                          {t("variant.table.td.action.edit")}
                        </VGButton>
                        <VGButton
                          variant="text"
                          color={row.status === 'active' ? "error" : "success"}
                          size="small"
                        >
                          {row.status === 'active'
                            ? t("variant.table.td.action.nonactive")
                            : t("variant.table.td.action.active")
                          }
                        </VGButton>
                        <VGButton
                          variant="text"
                          color="error"
                          size="small"
                        >
                          {t("variant.table.td.action.delete")}
                        </VGButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </>
  )

  return (
    <VGCard>
      {tableContainer}
      <VGButton
        variant="contained"
        color="primary"
        onClick={() => onClickAddVariant(true)}
      >
        <AddIcon/>{t("variant.buttonLabel")}
      </VGButton>
      <AddVariantDialog
        isOpen={isShowAddVariantDialog}
        handleClose={() => setIsShowAddVariantDialog(false)}
      />
    </VGCard>
  )
}