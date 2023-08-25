import { Slider, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Fragment, useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from 'react-easy-crop'

import VGDialog from "~/components/atomic/VGDialog";
import VGButton from "~/components/atomic/VGButton";
import { getCroppedImg } from "~/utils/cropImage";
import { toast } from "react-toastify";
import { toastOption } from "~/utils/toast";

export default function CropImageModal({
  url,
  isOpen,
  onClose,
  onSave
}: {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}) {
  const { t } = useTranslation("addProduct");
  const [imageSrc, setImageSrc] = useState(url)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  useEffect(() => {
    setImageSrc(url)
  }, [url])

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const getCroppedImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels
        )
        if (croppedImage !== null) {
          onSave(croppedImage)
        }
      }
    } catch {
      toast.error("Atur gambar gagal", toastOption)
    }
  }, [imageSrc, croppedAreaPixels])

  const imageContainer = (
    <Box
      position="relative"
      height={340}
    >
      <Fragment>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Fragment>
    </Box>
  )

  return (
    <VGDialog
      isOpen={isOpen}
      width="480px"
      onClose={onClose}
    >
      <Box p={1}>
        <Typography
          fontSize={16}
          fontWeight={700}
          color="primary"
          mb={1}
        >
          {t("cropImage.title")}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={700}
          color="common.shade.200"
          mb={3}
        >
          {t("cropImage.subTitle")}
        </Typography>

        {imageContainer}

        <Box mt={3}>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(_, zoom) => setZoom(zoom as number)}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          my={1}
        >
          <VGButton
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ width: "100%", mr: 1 }}
            onClick={onClose}
          >
            {t("cropImage.cancel")}
          </VGButton>
          <VGButton
            variant="contained"
            color="success"
            size="large"
            sx={{ width: "100%", ml: 1 }}
            onClick={getCroppedImage}
          >
            {t("cropImage.save")}
          </VGButton>
        </Box>
      </Box>
    </VGDialog>
  )
}