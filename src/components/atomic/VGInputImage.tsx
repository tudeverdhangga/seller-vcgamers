import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';
import { useState, type ChangeEvent } from "react";

import ConfirmationDeleteImageDialog from "~/components/molecule/ConfirmationDeleteImageDialog";

export default function VGInputImage({
  onChange,
  onDelete,
  id,
  imageUrl,
  width,
  height,
  disabled,
  deletable = false
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
  id: string;
  imageUrl?: string;
  width: string;
  height: string;
  disabled?: boolean;
  deletable?: boolean;
}) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  return (
    <>
      <Box>
        <input
          type="file"
          id={id}
          accept="image/png, image/jpg"
          style={{ display: "none" }}
          disabled={disabled}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor={id} style={{ width, display: "block" }}>
          <Box
            component="div"
            sx={{
              width,
              height,
              borderRadius: "10px",
              border: imageUrl ? "none" : "2px dashed #9AA4BF",
              backgroundColor: "common.shade.50",
              backgroundImage: Boolean(imageUrl)
                ? imageUrl
                : "none",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "relative",
              cursor: (!disabled && !imageUrl) || !deletable ? "pointer" : "auto",
            }}
            onClick={(e) => imageUrl && deletable && e.preventDefault()}
          >
            {
              imageUrl
                ? !disabled && (
                  <Box
                    component="div"
                    sx={{
                      width,
                      height: "40%",
                      borderRadius: "0 0 10px 10px",
                      backgroundColor: "#2A324999",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      cursor: 'pointer'
                    }}
                    onClick={() => deletable && setIsOpenDeleteModal(true)}
                  >
                    {
                      deletable
                        ? (<DeleteOutlineIcon sx={{ color: "common.shade.0" }} />)
                        : (<EditIcon sx={{ color: "common.shade.0" }} />)
                    }
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%"
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: 0,
                        color: '#616A82',
                      }}
                    >
                      Gambar
                    </Typography>
                    <UploadIcon sx={{ color: "common.shade.200" }} />
                  </Box>
                )
            }
          </Box>
        </label>
      </Box>

      {
        onDelete && (
          <ConfirmationDeleteImageDialog
            isOpen={isOpenDeleteModal}
            handleClose={() => setIsOpenDeleteModal(false)}
            handleDelete={() => {
              onDelete()
              setIsOpenDeleteModal(false)
            }}
          />
        )
      }
    </>
  )
}