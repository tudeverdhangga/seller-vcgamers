import { Box, Typography } from "@mui/material";
import { BorderColorOutlined } from "@mui/icons-material";
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';
import { type ChangeEvent } from "react";

export default function VGInputImage({
  onChange,
  id,
  imageUrl,
  width,
  height,
  disabled
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  imageUrl?: string;
  width: string;
  height: string;
  disabled?: boolean;
}) {
  return (
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
            backgroundImage: imageUrl
              ? imageUrl
              : "none",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative",
            cursor: !disabled ? "pointer" : "auto",
          }}
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
                  }}
                >
                  <BorderColorOutlined sx={{ color: "common.shade.0" }} />
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
  )
}