import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form"
import Link from "next/link";
import { BorderColorOutlined, CloudUploadOutlined } from '@mui/icons-material';
import { Box, Grid, Typography } from "@mui/material"
import { useTranslation } from "next-i18next";

import VGInputText from "~/components/atomic/VGInputText"
import VGAlert from "~/components/atomic/VGAlert";

interface IFormInput {
  shopName: string;
  shopUrl: string;
  shopDesc: string;
  shopPhone: string;
  bankName: string;
  bankNumber: string;
  bankCustomerName: string;
}

const defaultValues = {
  shopName: "",
  shopUrl: "",
  shopDesc: "",
  shopPhone: "",
  bankName: "BCA",
  bankNumber: "1123124355",
  bankCustomerName: "VCGamers"
}

export default function ProfileSettingForm() {
  const [shopUrl, setShopUrl] = useState("");
  const [profileImage, setProfileImage] = useState<undefined | Blob>();
  const [bannerImage, setBannerImage] = useState<undefined | Blob>();
  const defaultBanner = "/assets/default-user-banner.png"
  const {
    control,
    setValue
  } = useForm<IFormInput>({
    defaultValues: defaultValues
  })
  const { t } = useTranslation("setting");

  // Style
  const fieldStyle = {
    py: 2
  }
  const fieldTitleStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "primary.main",
    pt: 2
  }
  const fieldSubTitleStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.100",
  }

  const handleChangeProfilImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0] as Blob)
    }
  }
  const handleChangeBannerImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBannerImage(e.target.files[0] as Blob)
    }
  }

  const shopNameContainer = (
    <VGInputText
      name="shopName"
      control={control}
      label={t("tab.profile.form.name")}
      rules={{
        required: true
      }}
    />
  )
  const shopUrlContainer = (
    <>
      <VGInputText
        name="shopUrl"
        control={control}
        label={t("tab.profile.form.url")}
        rules={{
          required: true
        }}
        onChange={(e) => {
          setValue("shopUrl", e.target.value);
          setShopUrl(e.target.value);
        }}
      />
      <VGAlert
        sx={{ py: 0 }}
      >
        <Typography
          component="span"
          color="common.shade.100"
          sx={{ fontSize: "12px", fontWeight: 600 }}
        >
          {t("tab.profile.form.name")}
        </Typography>
        {' '}
        <Typography
          component="span"
          color="primary.main"
          sx={{ fontSize: "12px" }}
        >
          vcgamers.com/store/{shopUrl}
        </Typography>
      </VGAlert>
    </>
  )
  const shopDescContainer = (
    <VGInputText
      name="shopDesc"
      control={control}
      label={t("tab.profile.form.desc")}
      rules={{
        required: true
      }}
    />
  )
  const shopPhoneContainer = (
    <VGInputText
      name="shopPhone"
      control={control}
      label={t("tab.profile.form.phone")}
      rules={{
        required: true
      }}
    />
  )
  const bankNameContainer = (
    <VGInputText
      name="bankName"
      control={control}
      label={t("tab.profile.form.bankName")}
      disabled={true}
      rules={{
        required: true
      }}
    />
  )
  const bankNumberContainer = (
    <VGInputText
      name="bankNumber"
      control={control}
      label={t("tab.profile.form.bankNumber")}
      disabled={true}
      rules={{
        required: true
      }}
    />
  )
  const bankCustomerNameContainer = (
    <VGInputText
      name="bankCustomerName"
      control={control}
      label={t("tab.profile.form.bankCustomerName")}
      disabled={true}
      rules={{
        required: true
      }}
    />
  )

  return (
    <form>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          <Box sx={{...fieldStyle, pt: 0}}>
            {shopNameContainer}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          <Box sx={fieldStyle}>
            {shopUrlContainer}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          <Box sx={fieldStyle}>
            {shopDescContainer}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          <Box sx={fieldStyle}>
            {shopPhoneContainer}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={fieldStyle}
        >
          <Typography sx={fieldTitleStyle}>
            {t("tab.profile.form.info.title")}
          </Typography>
          <VGAlert color="info">
            {t("tab.profile.form.info.alert")}
            {' '}
            <Link href="mailto:support@vcgamers.com">
              support@vcgamers.com
            </Link>
          </VGAlert>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Box sx={fieldStyle}>
            {bankNameContainer}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Box sx={fieldStyle}>
            {bankNumberContainer}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          <Box sx={fieldStyle}>
            {bankCustomerNameContainer}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        >
        <Grid
          item
          xs={12}
          md={12}
          sx={fieldStyle}
        >
          <Typography sx={fieldTitleStyle}>
            {t("tab.profile.form.profileImg.label")}
          </Typography>
          <Typography sx={fieldSubTitleStyle}>
            {t("tab.profile.form.profileImg.subLabel")}
          </Typography>
          <Box>
            <input
              type="file"
              id="upload-profile"
              accept="image/*"
              style={{display: "none"}}
              onChange={(e) => handleChangeProfilImage(e)}
            />
            <label htmlFor="upload-profile">
              <Box
                component="div"
                sx={{
                  width: "124px",
                  height: "124px",
                  borderRadius: "10px",
                  backgroundColor: "common.shade.50",
                  backgroundImage: profileImage ? `url(${URL.createObjectURL(profileImage)})` : "none",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  cursor: "pointer"
                }}
              >
                <Box
                  component="div"
                  sx={{
                    width: "124px",
                    height: "51px",
                    borderRadius: "0 0 10px 10px",
                    backgroundColor: "#2A324999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 0,
                    left: 0
                  }}
                >
                  <BorderColorOutlined sx={{ color: "common.shade.0" }} />
                </Box>
              </Box>
            </label>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        >
        <Grid
          item
          xs={12}
          md={12}
          sx={fieldStyle}
        >
          <Typography sx={fieldSubTitleStyle}>
            {t("tab.profile.form.bannerImg.label")}
          </Typography>
          <Box>
            <Box
              component="div"
              sx={{
                width: "100%",
                height: "299px",
                borderRadius: "10px",
                borderStyle: "dotted",
                backgroundColor: "common.shade.50",
                backgroundImage: `url(${bannerImage ? URL.createObjectURL(bannerImage) : defaultBanner})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <input
                type="file"
                id="upload-banner"
                accept="image/*"
                style={{display: "none"}}
                onChange={handleChangeBannerImage}
              />
              <label htmlFor="upload-banner">
                <Box
                  component="div"
                  sx={{
                    width: "215px",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#000000B2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <CloudUploadOutlined sx={{ color: "common.shade.0", width: "50px" }} />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "common.shade.0"
                      }}
                    >
                      {t("tab.profile.form.bannerImg.changeBannerLabel")}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "common.shade.0"
                      }}
                    >
                      {t("tab.profile.form.bannerImg.changeBannerSubLabel")}
                    </Typography>
                  </Box>
                </Box>
              </label>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}
