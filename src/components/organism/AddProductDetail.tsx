import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import { type ChangeEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import queryString from "query-string";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";

import VGCard from "~/components/atomic/VGCard";
import VGRichEditor from "~/components/atomic/VGRichEditor/index";
import { toastOption } from "~/utils/toast";
import {
  useGetCategory,
  useGetBrandByCategory,
  useGetGroup,
} from '~/services/api/masterData';
import { useDebounce } from "~/utils/debounce";
import { useMediaUpload } from "~/services/api/media";
import VGInputImage from "~/components/atomic/VGInputImage";
import CropImageModal from "~/components/molecule/CropImageModal";

interface Dropdown {
  label: string;
  value: string;
  isVoucher?: boolean;
}
interface ImageResponse {
  object_url: string
  object_key: string
}
interface ProductDetail {
  id: string
  product_category: ProductCategory
  product_brand: ProductBrand
  product_group: ProductGroup
  name: string
  slug: string
  description: string
  images_url: ImagesUrl[]
  is_active: boolean
  created_at: string
  updated_at: string
  variations: Variation[]
}
interface ProductCategory {
  value: string
  label: string
  is_voucher?: boolean
}
interface ProductBrand {
  value: string
  label: string
}
interface ProductGroup {
  value: string
  label: string
}
interface ImagesUrl {
  object_key: string
  object_url: string
}
interface Variation {
  id: string
  product_variation_master: ProductVariationMaster
  slug: string
  code: string
  name: string
  price: number
  discount: number
  final_price: number
  rating: number
  images_url: ImagesUrl[]
  stock: number
  sold: number
  sla_second: number
  max_sla_second: number
  sold_total: number
  is_active: boolean
  is_featured: boolean
  is_kilat: boolean
  is_instant: boolean
  is_host_active: boolean
  is_preorder: boolean
  is_new_item: boolean
  min_order: number
  success_rate: number
  delivery_type: number
  created_at: string
  updated_at: string
  next_update_price: string
}
interface ProductVariationMaster {
  value: string
  label: string
}

export default function AddProductDetail({
  handleVoucherInstant,
  handleChangeFilter,
  productDetail,
  clearVariations
}: {
  handleVoucherInstant: (isVoucher: boolean) => void;
  handleChangeFilter: (
    key: string,
    value: string | number | boolean | undefined,
    index?: number
  ) => void;
  productDetail?: ProductDetail;
  clearVariations?: () => void;
}) {
  const { t } = useTranslation("addProduct");
  const getCategory = useGetCategory();
  const getBrand = useGetBrandByCategory();
  const getGroup = useGetGroup();
  const mediaUpload = useMediaUpload();
  const [category, setCategory] = useState<Dropdown[]>([])
  const [brand, setBrand] = useState<Dropdown[]>([])
  const [group, setGroup] = useState<Dropdown[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Dropdown>()
  const [selectedBrand, setSelectedBrand] = useState<Dropdown>()
  const [selectedGroup, setSelectedGroup] = useState<Dropdown>()
  const [productImage, setProductImage] = useState<ImageResponse[]>([]);
  const [isShowCropImage, setIsShowCropImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedImageIndex, setUploadedImageIndex] = useState(0);
  const [isLoadingCategoryDetail, setIsLoadingCategoryDetail] = useState(false);

  useEffect(() => {
    const dataCategory: Dropdown[] = [];
    getCategory?.data?.data?.map((item) => {
      if (item) {
        dataCategory?.push({
          label: item.name,
          value: item.id,
          isVoucher: item.is_voucher
        })
      }
    })
    setCategory(dataCategory)
  }, [getCategory?.data?.data])
  useEffect(() => {
    if (selectedCategory && selectedCategory.value !== "") {
      const params = queryString.stringify({ category_id: selectedCategory.value })
      getBrand.mutate(params, {
        onSuccess: (res) => {
          const dataBrand: Dropdown[] = [];
          res?.data?.map((item) => {
            if (item) {
              dataBrand?.push({
                label: item.name,
                value: item.id
              })
            }
          })
          setBrand(dataBrand)
        }
      })

      if (typeof selectedCategory.isVoucher !== 'undefined') {
        handleVoucherInstant(selectedCategory.isVoucher)
      }

      setIsLoadingCategoryDetail(false)
    }
  }, [selectedCategory])
  useEffect(() => {
    if (selectedBrand && selectedCategory && selectedBrand.value && selectedCategory.value) {
      const params = queryString.stringify({
        category_id: selectedCategory.value,
        brand_id: selectedBrand.value
      })
      getGroup.mutate(params, {
        onSuccess: (res) => {
          const dataGroup: Dropdown[] = [];
          res.data?.map((item) => {
            if (item) {
              dataGroup?.push({
                label: item.name,
                value: item.id
              })
            }
          })
          setGroup(dataGroup)
        }
      })
    }
  }, [selectedBrand, selectedCategory])
  useEffect(() => {
    if (productDetail) {
      setIsLoadingCategoryDetail(true)
      setSelectedCategory({
        label: productDetail?.product_category.label,
        value: productDetail?.product_category.value,
        isVoucher: productDetail?.product_category.is_voucher
      })
      setSelectedBrand(productDetail?.product_brand)
      setSelectedGroup(productDetail?.product_group)
      setProductImage(productDetail.images_url)
    }
  }, [productDetail])

  const handleFileChange = (file: File, index: number) => {
    if (file.size > 1024 * 1024) {
      toast.error(t("updateImageSizeError"), toastOption)
    } else {
      const formData = new FormData();
      formData.append("file", file);
      mediaUpload.mutate(formData, {
        onSuccess: (res) => {
          handleChangeFilter("images_url", res?.data.object_key, index)
          const array = productImage
          array[index] = res?.data
          setProductImage(array)
          setIsShowCropImage(false)
        }
      });
    }
  };
  const handleDeleteFile = (index: number) => {
    const array = productImage
    array.splice(index, 1)
    setProductImage(array)
    handleChangeFilter("images_url", undefined, index)
  };
  const onInputImage = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files

    if (file && typeof file[0] !== "undefined") {
      if (file[0].size < 1024 * 1024) {
        const url = URL.createObjectURL(file[0]);
        setUploadedImageIndex(index);
        setUploadedImage(url);
        setIsShowCropImage(true);
      } else {
        toast.error(t("updateImageSizeError"), toastOption)
      }
    }
  }
  const onChangeFilter = (value: Dropdown | null, paramsKey: string) => {
    clearVariations && clearVariations()
    if (value) {
      handleChangeFilter(paramsKey, value?.value)

      if (paramsKey === "product_category_id") {
        setSelectedCategory(value)
        setSelectedBrand({
          label: "",
          value: ""
        })
        setSelectedGroup({
          label: "",
          value: ""
        })
      } else if (paramsKey === "product_brand_id") {
        setSelectedBrand(value)
        setSelectedGroup({
          label: "",
          value: ""
        })
      } else {
        setSelectedGroup(value)
      }
    } else {
      handleChangeFilter(paramsKey, "")

      if (paramsKey === "product_category_id") {
        setSelectedCategory({
          label: "",
          value: ""
        })
        setSelectedBrand({
          label: "",
          value: ""
        })
        setSelectedGroup({
          label: "",
          value: ""
        })
        setBrand([])
        setGroup([])
      } else if (paramsKey === "product_brand_id") {
        setSelectedBrand({
          label: "",
          value: ""
        })
        setSelectedGroup({
          label: "",
          value: ""
        })
        setGroup([])
      }
    }
  }
  const onChangeRichEditor = useDebounce((e: string) => {
    handleChangeFilter("description", e)
  }, 1000)

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
          {
            getCategory.isLoading || isLoadingCategoryDetail
              ? (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={40}
                />
              )
              : (
                <Autocomplete
                  id="product-category"
                  value={selectedCategory}
                  disablePortal
                  options={category}
                  disabled={productDetail !== undefined}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("detail.category")}
                      size="small"
                    />
                  )}
                  onChange={(_, e) => onChangeFilter(e, "product_category_id")}
                />
              )
          }
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          {
            getBrand.isLoading
              ? (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={40}
                />
              )
              : (
                <Autocomplete
                  id="product-brand"
                  value={selectedBrand}
                  disablePortal
                  options={brand}
                  disabled={
                    selectedCategory &&
                    selectedCategory.value !== undefined &&
                    productDetail !== undefined
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("detail.brand")}
                      size="small"
                    />
                  )}
                  onChange={(_, e) => onChangeFilter(e, "product_brand_id")}
                />
              )
          }
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          {
            getGroup.isLoading
              ? (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={40}
                />
              )
              : (
                <Autocomplete
                  id="product-group"
                  value={selectedGroup}
                  disablePortal
                  options={group}
                  disabled={
                    productDetail !== undefined &&
                    selectedCategory &&
                    selectedBrand &&
                    !selectedCategory.value !== undefined &&
                    !selectedBrand.value !== undefined
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("detail.group")}
                      size="small"
                    />
                  )}
                  onChange={(_, e) => onChangeFilter(e, "product_group_id")}
                />
              )
          }
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
            <VGRichEditor
              content={productDetail?.description}
              onChange={(e) => onChangeRichEditor(e)}
            />
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
              <Box m={1}>
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
                        id={`product-${0}`}
                        width="124px"
                        height="124px"
                        imageUrl={
                          productImage && productImage[0]
                          && `url(${productImage[0].object_url})`
                        }
                        deletable={true}
                        onChange={(e) => onInputImage(e, 0)}
                        onDelete={() => handleDeleteFile(0)}
                      />
                    )
                }
              </Box>
              <Box m={1}>
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
                        id={`product-${1}`}
                        width="124px"
                        height="124px"
                        imageUrl={
                          productImage && productImage[1]
                          && `url(${productImage[1].object_url})`
                        }
                        deletable={true}
                        onChange={(e) => onInputImage(e, 1)}
                        onDelete={() => handleDeleteFile(1)}
                      />
                    )
                }
              </Box>
              <Box m={1}>
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
                        id={`product-${2}`}
                        width="124px"
                        height="124px"
                        imageUrl={
                          productImage && productImage[2]
                          && `url(${productImage[2].object_url})`
                        }
                        deletable={true}
                        onChange={(e) => onInputImage(e, 2)}
                        onDelete={() => handleDeleteFile(2)}
                      />
                    )
                }
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <CropImageModal
        url={uploadedImage}
        isOpen={isShowCropImage}
        onClose={() => {
          setUploadedImage("")
          setUploadedImageIndex(0)
          setIsShowCropImage(false)
        }}
        onSave={(file) => handleFileChange(file, uploadedImageIndex)}
      />
    </VGCard>
  )
}