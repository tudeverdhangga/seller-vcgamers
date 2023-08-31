import { type ChangeEvent, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { CloudUploadOutlined } from "@mui/icons-material";
import { Box, Grid, Typography, TextField, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";
import { useMediaUpload } from "~/services/api/media";
import {
  useGetProfile,
  useUpdateProfile,
  useCheckUrlAvailability
} from "~/services/api/auth";
import { toastOption } from "~/utils/toast";
import { env } from "~/env.mjs";
import VGInputImage from "~/components/atomic/VGInputImage";

interface ProfileForm {
  seller_name: string;
  seller_url: string;
  seller_description: string;
  phone: string;
  seller_bank: {
    bank_name: string;
    bank_account_number: string;
    bank_account_name: string;
  },
  seller_photo: SellerPhoto,
  seller_cover_photo: SellerPhoto
}
interface SellerPhoto {
  object_url: string
  object_key: string
}
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function ProfileSettingForm() {
  const defaultBanner = "/assets/default-user-banner.png";
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ProfileForm>({
    criteriaMode: "all"
  });
  const { t } = useTranslation("setting");
  const whatsappLink = env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LINK;
  const emailLink = env.NEXT_PUBLIC_SUPPORT_EMAIL_LINK;
  const mediaUpload = useMediaUpload();
  const getProfile = useGetProfile();
  const updateProfile = useUpdateProfile();
  const checkUrl = useCheckUrlAvailability();
  const [profileImage, setProfileImage] = useState<SellerPhoto | undefined>();
  const [bannerImage, setBannerImage] = useState<SellerPhoto | undefined>();
  const [shopUrl, setShopUrl] = useState<string | undefined>("");
  const [urlMessage, setUrlMessage] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);

  useEffect(() => {
    setProfileImage(getProfile?.data?.data?.seller_photo)
    setBannerImage(getProfile?.data?.data?.seller_cover_photo)
    setShopUrl(getProfile?.data?.data?.seller_url)
    setPhone(getProfile?.data?.data?.phone)
  }, [getProfile?.data])

  // Style
  const fieldStyle = {
    py: 2,
  };
  const fieldTitleStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "primary.main",
    pt: 2,
  };
  const fieldSubTitleStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.100",
  };

  // Methods
  const handleChangeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files

    if (file && typeof file[0] !== "undefined") {
      if (file[0].size > 1024 * 1024) {
        toast.error(t("tab.profile.toast.updateImageProfileSizeError"), toastOption)
      } else {
        const formData = new FormData();
        formData.append("file", file[0]);
        mediaUpload.mutate(formData, {
          onSuccess: (res) => {
            setProfileImage(res.data)
            setIsChangeImage(true)
          }
        });
      }
    }
  };
  const handleChangeBannerImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files

    if (file && typeof file[0] !== "undefined") {
      if (file[0].size > 2 * 1024 * 1024) {
        toast.error(t("tab.profile.toast.updateImageBannerSizeError"), toastOption)
      } else {
        const formData = new FormData();
        formData.append("file", file[0]);
        mediaUpload.mutate(formData, {
          onSuccess: (res) => {
            setBannerImage(res.data)
            setIsChangeImage(true)
          }
        });
      }
    }
  };
  const onSubmit = (data: ProfileForm) => {
    setIsSaveLoading(true)
    const formData = new FormData();
    formData.append("seller_name", data.seller_name);
    formData.append("seller_url", data.seller_url);
    formData.append("seller_description", data.seller_description);
    if (typeof phone !== 'undefined') {
      formData.append("phone", phone);
    }

    if (typeof profileImage !== 'undefined') {
      formData.append("seller_photo", profileImage?.object_key);
    }
    if (typeof bannerImage !== 'undefined') {
      formData.append("seller_cover_photo", bannerImage?.object_key);
    }

    updateProfile.mutate(formData, {
      onSuccess: () => {
        void getProfile.refetch()
        setIsSaveLoading(false)
        toast.success(t("tab.profile.toast.updateSuccess"), toastOption)
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("tab.profile.toast.updateFail")}: ${err?.response?.data?.message}`

        toast.error(errorMessage, toastOption)
      }
    })
  };
  const onChangeUrl = (url: string) => {
    setTimeout(() => {
      checkUrl.mutate(url, {
        onSuccess: (res) => {
          const isAvailable = res?.data?.available

          if (!isAvailable) {
            setUrlMessage("URL sudah terpakai")
          } else {
            setUrlMessage(undefined)
          }
        }
      })
    }, 1000)
    setShopUrl(url)
  };

  // Container
  const shopNameContainer = (
    <>
      <TextField
        label={t("tab.profile.form.name")}
        variant="outlined"
        size="small"
        fullWidth
        {
        ...register("seller_name", {
          required: t("tab.profile.form.error.required.name")
        })
        }
        error={Boolean(errors.seller_name)}
        helperText={errors.seller_name?.message}
        defaultValue={getProfile?.data?.data?.seller_name}
      />
      <Typography
        component="span"
        color="common.orange.500"
        fontSize={12}
        fontWeight={600}
      >
        {t("tab.profile.form.alert.label")}
      </Typography>
      <Typography
        component="span"
        fontSize={12}
        fontWeight={600}
      >
        <Link href={whatsappLink} style={{ color: "#7750F8" }}>
          {t("tab.profile.form.alert.subLabel")}
        </Link>
      </Typography>
    </>
  );
  const shopUrlContainer = (
    <>
      <TextField
        label={t("tab.profile.form.url")}
        variant="outlined"
        size="small"
        fullWidth
        {
        ...register("seller_url", {
          required: t("tab.profile.form.error.required.url"),
          validate: () => !urlMessage
        })
        }
        error={Boolean(errors.seller_url) || Boolean(urlMessage)}
        helperText={errors.seller_url?.message || urlMessage}
        defaultValue={getProfile?.data?.data?.seller_url}
        onChange={(e) => onChangeUrl(e.target.value)}
      />
      <VGAlert sx={{ py: 0 }}>
        <Typography
          component="span"
          color="common.shade.100"
          sx={{ fontSize: "12px", fontWeight: 600 }}
        >
          {t("tab.profile.form.url")}
        </Typography>{" "}
        <Typography
          component="span"
          color="primary.main"
          sx={{ fontSize: "12px" }}
        >
          vcgamers.com/store/{shopUrl}
        </Typography>
      </VGAlert>
    </>
  );
  const shopDescContainer = (
    <TextField
      label={t("tab.profile.form.desc")}
      variant="outlined"
      size="small"
      fullWidth
      {
      ...register("seller_description", {
        required: t("tab.profile.form.error.required.desc")
      })
      }
      error={Boolean(errors.seller_description)}
      defaultValue={getProfile?.data?.data?.seller_description}
      helperText={errors.seller_description?.message}
    />
  );
  const shopPhoneContainer = (
    <TextField
      label={t("tab.profile.form.phone")}
      variant="outlined"
      size="small"
      fullWidth
      disabled
      defaultValue={getProfile?.data?.data?.phone}
    />
  );
  const bankNameContainer = (
    <TextField
      label={t("tab.profile.form.bankName")}
      variant="outlined"
      size="small"
      fullWidth
      disabled
      defaultValue={getProfile?.data?.data?.seller_bank?.bank_name}
    />
  );
  const bankNumberContainer = (
    <TextField
      label={t("tab.profile.form.bankNumber")}
      variant="outlined"
      size="small"
      fullWidth
      disabled
      defaultValue={getProfile?.data?.data?.seller_bank?.bank_account_number}
    />
  );
  const bankCustomerNameContainer = (
    <TextField
      label={t("tab.profile.form.bankCustomerName")}
      variant="outlined"
      size="small"
      fullWidth
      disabled
      defaultValue={getProfile?.data?.data?.seller_bank?.bank_account_name}
    />
  );
  const uploadProfileContainer = (
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
              id="upload-profile"
              width="124px"
              height="124px"
              imageUrl={profileImage?.object_url && `url(${profileImage.object_url})`}
              onChange={(e) => handleChangeProfileImage(e)}
            />
          )
      }
    </Box>
  );
  const uploadBannerContainer = (
    <Box>
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "299px",
          borderRadius: "10px",
          borderStyle: "dotted",
          backgroundColor: "common.shade.50",
          backgroundImage: bannerImage
            ? `url(${bannerImage.object_url})`
            : defaultBanner,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="file"
          id="upload-banner"
          accept="image/png, image/jpg"
          style={{ display: "none" }}
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
                justifyContent: "center",
              }}
            >
              <CloudUploadOutlined
                sx={{ color: "common.shade.0", width: "50px" }}
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "common.shade.0",
                }}
              >
                {t("tab.profile.form.bannerImg.changeBannerLabel")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "common.shade.0",
                }}
              >
                {t("tab.profile.form.bannerImg.changeBannerSubLabel")}
              </Typography>
            </Box>
          </Box>
        </label>
      </Box>
    </Box>
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={{ ...fieldStyle, pt: 0 }}>
              {
                getProfile?.isLoading
                  ? (<Skeleton variant="rectangular" width="100%" height={60} />)
                  : shopNameContainer
              }
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={fieldStyle}>
              {
                getProfile?.isLoading
                  ? (<Skeleton variant="rectangular" width="100%" height={60} />)
                  : shopUrlContainer
              }
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={fieldStyle}>
              {
                getProfile?.isLoading
                  ? (<Skeleton variant="rectangular" width="100%" height={60} />)
                  : shopDescContainer
              }
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={fieldStyle}>
              {
                getProfile?.isLoading
                  ? (<Skeleton variant="rectangular" width="100%" height={60} />)
                  : shopPhoneContainer
              }
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={fieldStyle}>
            <Typography sx={fieldTitleStyle}>
              {t("tab.profile.form.info.title")}
            </Typography>
            <VGAlert color="info">
              {t("tab.profile.form.info.alert")}{" "}
              <Link
                href={emailLink}
                style={{ color: "#7750F8" }}
              >
                support@vcgamers.com
              </Link>
            </VGAlert>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={fieldStyle}>
              {
                getProfile?.isLoading
                  ? (<Skeleton variant="rectangular" width="100%" height={60} />)
                  : bankNameContainer
              }
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={fieldStyle}>
              {
                getProfile?.isLoading
                  ? (<Skeleton variant="rectangular" width="100%" height={60} />)
                  : bankNumberContainer
              }
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={fieldStyle}>
              {
                getProfile?.isLoading
                  ? (<Skeleton variant="rectangular" width="100%" height={60} />)
                  : bankCustomerNameContainer
              }
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={fieldStyle}>
            <Typography sx={fieldTitleStyle}>
              {t("tab.profile.form.profileImg.label")}
            </Typography>
            <Typography sx={fieldSubTitleStyle}>
              {t("tab.profile.form.profileImg.subLabel")}
            </Typography>
            {
              getProfile?.isLoading
                ? (<Skeleton variant="rectangular" width={124} height={124} />)
                : uploadProfileContainer
            }
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={fieldStyle}>
            <Typography sx={fieldSubTitleStyle}>
              {t("tab.profile.form.bannerImg.label")}
            </Typography>
            {
              getProfile?.isLoading
                ? (<Skeleton variant="rectangular" width="100%" height={299} />)
                : uploadBannerContainer
            }
          </Grid>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <VGButton
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            disabled={(!isDirty && !isChangeImage) || getProfile?.isLoading}
            loading={isSaveLoading}
          >
            {t("tab.profile.form.submit")}
          </VGButton>

        </Grid>
      </form>
    </>
  );
}
