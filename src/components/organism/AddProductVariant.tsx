import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Trans, useTranslation } from "next-i18next";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Image from "next/image";
import SeeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { type ChangeEvent, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import AddVariantDialog from "~/components/molecule/AddVariantDialog";
import { useMediaUpload } from "~/services/api/media";
import VGInputImage from "~/components/atomic/VGInputImage";
import { toastOption } from "~/utils/toast";
import CropImageModal from "~/components/molecule/CropImageModal";
import { dateToTime } from "~/utils/format";
import ConfirmationDeleteVariantDialog from "~/components/molecule/ConfirmationDeleteVariantDialog";
import ConfirmationDeactiveVariantDialog from "~/components/molecule/ConfirmationDeactiveVariantDialog";
import ConfirmationActiveVariantDialog from "~/components/molecule/ConfirmationActiveVariantDialog";

interface Variation {
  name: string
  product_variation_master_id?: string
  delivery_type: number
  stock: number
  price: number
  is_custom_image: boolean
  is_active: boolean
  images_url?: string[]
  next_update_price?: string
  next_activate_kilat?: string
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
  variations: VariationProductDetail[]
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
interface VariationProductDetail {
  id: string
  product_variation_master: ProductVariationMaster
  slug: string
  code: string
  name: string
  price: number
  discount: number
  final_price: number
  rating: number
  is_custom_image: boolean
  images_url: ImagesUrl[]
  stock: number
  sold: number
  total_visited: number
  total_wishlist: number
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
  next_activate_kilat: string
}
interface ProductVariationMaster {
  value: string
  label: string
}

export default function AddProductVariant({
  productDetail,
  variant,
  groupId,
  isVoucherInstant,
  handleChangeVariantField,
  handleChangeFilter,
  onEditVariation,
  onDeleteVariant,
  onError
}: {
  productDetail?: ProductDetail;
  variant: Variation[];
  groupId: string;
  isVoucherInstant: boolean;
  handleChangeVariantField: <K extends keyof Variation>(
    key: K,
    value: Variation[K],
    index: number,
    indexImage?: number
  ) => void;
  handleChangeFilter: (
    key: string,
    value: string | number | boolean | Variation,
    index?: number
  ) => void;
  onEditVariation: (value: Variation, index: number) => void;
  onDeleteVariant: (index: number) => void;
  onError: (error: boolean) => void;
}) {
  const { t } = useTranslation("addProduct");
  const mediaUpload = useMediaUpload();
  const [isShowAddVariantDialog, setIsShowAddVariantDialog] = useState(false);
  const [variantImage, setVariantImage] = useState<string[][]>([['']]);
  const [variantData, setVariantData] = useState<Variation>();
  const [indexRow, setIndexRow] = useState<number>();
  const [nextUpdatePrice, setNextUpdatePrice] = useState<string | undefined>();
  const [nextUpdateKilat, setNextUpdateKilat] = useState<string | undefined>();
  const [multiple100, setMultiple100] = useState<string[]>([]);
  const [isShowCropImage, setIsShowCropImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedImageDataIndex, setUploadedImageDataIndex] = useState(0);
  const [uploadedImageIndex, setUploadedImageIndex] = useState(0);
  const [isOpenDeactiveProductDialog, setIsOpenDeactiveProductDialog] = useState(false)
  const [isOpenActiveProductDialog, setIsOpenActiveProductDialog] = useState(false)
  const [isOpenDeleteProductDialog, setIsOpenDeleteProductDialog] = useState(false)
  const [dataAction, setDataAction] = useState<{
    name: string;
    index: number;
    images_url?: string;
    is_active: boolean;
  }>({
    name: '',
    index: 0,
    images_url: '',
    is_active: false
  })

  useEffect(() => {
    if (typeof variantData !== 'undefined' && typeof indexRow !== 'undefined') {
      onClickAddVariant(true);
    }
  }, [variantData, indexRow])
  useEffect(() => {
    if (variant.length === 0) {
      setVariantImage([])
    }
  }, [variant.length])
  useEffect(() => {
    if (productDetail) {
      const imageUrl: string[][] = []

      productDetail.variations.map((item) => {
        const images = item?.images_url?.map((image) => image?.object_url) ?? []
        imageUrl.push(images)
      })

      setVariantImage(imageUrl)
    }
  }, [productDetail])
  useEffect(() => {
    onError(multiple100.some(item => typeof item === "string" && item !== ""))
  }, [multiple100])

  const onChangeImage = (checked: boolean, index: number) => {
    handleChangeVariantField("is_custom_image", checked, index)
  }
  const onClickAddVariant = (value: boolean) => {
    setIsShowAddVariantDialog(value)
  }
  const onChangeStockPrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Variation,
    index: number
  ) => {
    if (key === "price") {
      if (parseInt(event.target.value) % 100 !== 0) {
        const updatedArray = [...multiple100];
        updatedArray[index] = t("variant.dialog.setting.error.multiple100");
        setMultiple100(updatedArray)
      } else {
        const updatedArray = [...multiple100];
        updatedArray[index] = "";
        setMultiple100(updatedArray)
      }
    }
    onChangeVariant(parseInt(event.target.value), key, index)
  }
  const onChangeVariant = (
    value: string | boolean | number,
    key: keyof Variation,
    index: number
  ) => {
    handleChangeVariantField(key, value, index)
  }
  const handleFileChange = (file: File, index: number, indexImage: number) => {
    if (file.size > 1024 * 1024) {
      toast.error(t("updateImageSizeError"), toastOption)
    } else {
      const formData = new FormData();
      formData.append("file", file);
      mediaUpload.mutate(formData, {
        onSuccess: (res) => {
          handleChangeVariantField("images_url", [res?.data.object_key], index, indexImage)
          const array = variantImage;
          if (!array[index]) {
            array.push([res?.data.object_url])
          } else {
            (array[index] as string[])[indexImage] = res?.data.object_url;
          }
          setVariantImage(array);
          setIsShowCropImage(false)
        }
      });
    }
  }
  const onInputImage = (e: ChangeEvent<HTMLInputElement>, index: number, indexImage: number) => {
    const file = e.target.files

    if (file && typeof file[0] !== "undefined") {
      if (file[0].size < 1024 * 1024) {
        const url = URL.createObjectURL(file[0]);
        setUploadedImageDataIndex(index);
        setUploadedImageIndex(indexImage);
        setUploadedImage(url);
        setIsShowCropImage(true);
      } else {
        toast.error(t("updateImageSizeError"), toastOption)
      }
    }
  }
  const handleEditVariant = (variation: Variation, index: number) => {
    setVariantData(variation);
    setIndexRow(index);
    setNextUpdatePrice(variation.next_update_price);
    setNextUpdateKilat(variation.next_activate_kilat);
  }
  const handleDeleteVariation = (index: number) => {
    setVariantImage([])
    onDeleteVariant(index)
  }
  const onSubmit = (variation: Variation) => {
    handleChangeFilter("variations", variation)
  }
  const handleCloseModal = () => {
    setVariantData(undefined);
    setIndexRow(undefined);
    setNextUpdatePrice(undefined);
    setNextUpdateKilat(undefined);
    setIsShowAddVariantDialog(false);
  }
  const getImageUrl = (index: number, indexImg: number) => {
    if (variantImage && variantImage[index] && (variantImage[index] as string[])[indexImg]) {
      return `url(${(variantImage[index] as string[])[indexImg] as string})`
    } else {
      return undefined
    }
  }

  const thStyle = {
    color: "#7750F8",
    fontWeight: 700,
    fontSize: "14px",
    borderRight: "1px solid #DEDEDE",
  }

  const thContainer = (
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
  )
  const imageContainer = (row: Variation, index: number) => (
    <TableCell width={193} sx={{ borderRight: "1px solid #DEDEDE", minWidth: "193px" }}>
      <Switch
        checked={row.is_custom_image}
        disabled={!row.is_active}
        onChange={(_, event) => onChangeImage(event, index)}
      />
      <Typography
        fontSize={12}
        color={row.is_custom_image && row.is_active ? "common.shade.200" : "common.shade.100"}
      >
        {row.is_custom_image
          ? t("variant.table.td.image.enabled")
          : t("variant.table.td.image.disabled")
        }
      </Typography>
      {
        row.is_custom_image && (
          <Box display={"flex"}>
            {
              [0, 1, 2].map((indexImg) => (
                <Box key={indexImg} sx={{ m: 0.5 }}>
                  {
                    mediaUpload.isLoading
                      ? (
                        <Skeleton
                          variant="rounded"
                          width={47}
                          height={47}
                        />
                      ) : (
                        <VGInputImage
                          id={`variant-${index}-${indexImg}`}
                          width="47px"
                          height="47px"
                          imageUrl={getImageUrl(index, indexImg)}
                          disabled={!row.is_active}
                          onChange={(e) => onInputImage(e, index, indexImg)}
                        />
                      )
                  }
                </Box>
              ))
            }
          </Box>
        )
      }
    </TableCell>
  )
  const nameContainer = (row: Variation, index: number) => (
    <TableCell sx={{ borderRight: "1px solid #DEDEDE" }}>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: row.is_active ? "common.shade.700" : "common.shade.100"
        }}
      >
        {row.name}
      </Typography>
      {
        row.delivery_type === 1
          ? (
            <>
              <Box display="flex" alignItems="center">
                <Image
                  src="/assets/badge-kilat.svg"
                  alt="Badge Kilat"
                  width={53}
                  height={11}
                />
                <Switch
                  defaultChecked={productDetail?.variations[index]?.is_kilat}
                  disabled={!row.is_active || row.next_activate_kilat !== null}
                />
              </Box>
              {
                Boolean(row.next_activate_kilat) && (
                  <Typography
                    color="success.dark"
                    fontSize={12}
                    fontWeight={600}
                    mt={1}
                  >
                    {t("variant.error.updateKilatTime", { time: dateToTime(row.next_activate_kilat as string) })}
                  </Typography>
                )
              }
            </>
          ) : row.delivery_type === 2
            ? (
              <Box display="flex" flexDirection="column">
                <Image
                  src="/assets/badge-instant.svg"
                  alt="Badge Instant"
                  width={53}
                  height={11}
                />
                <Typography
                  color="common.shade.200"
                  fontSize={12}
                  fontWeight={600}
                  mt={2}
                >
                  <Trans
                    ns="addProduct"
                    i18nKey={"variant.note.instant"}
                  />
                </Typography>
              </Box>
            ) : ""
      }
    </TableCell>
  )
  const stockContainer = (row: Variation, index: number) => (
    <TableCell width={114} sx={{ borderRight: "1px solid #DEDEDE", minWidth: "114px" }}>
      <TextField
        variant="outlined"
        value={row.stock}
        fullWidth
        type="number"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          min: "0"
        }}
        disabled={!row.is_active || row.delivery_type === 2}
        onKeyDown={(e) => {
          if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+" || e.key === "-") {
            e.preventDefault()
          }
        }}
        onChange={(e) => onChangeStockPrice(e, "stock", index)}
      />
    </TableCell>
  )
  const priceContainer = (row: Variation, index: number) => (
    <TableCell width={114} sx={{ borderRight: "1px solid #DEDEDE", minWidth: "144px" }}>
      <TextField
        variant="outlined"
        value={row.price}
        fullWidth
        type="number"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          min: "100"
        }}
        error={Boolean(multiple100[index])}
        helperText={multiple100[index]}
        disabled={!row.is_active || Boolean(row.next_update_price)}
        onKeyDown={(e) => {
          if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+" || e.key === "-") {
            e.preventDefault()
          }
        }}
        onChange={(e) => onChangeStockPrice(e, "price", index)}
      />
      {
        Boolean(row.next_update_price) && (
          <Typography
            color="success.dark"
            fontSize={12}
            fontWeight={600}
            mt={1}
          >
            {t("variant.error.updatePriceTime", { time: dateToTime(row.next_update_price as string) })}
          </Typography>
        )
      }
    </TableCell>
  )
  const statisticContainer = (index: number) => (
    <TableCell width={193} sx={{ borderRight: "1px solid #DEDEDE", minWidth: "193px" }}>
      <Box display="flex">
        <SeeIcon color={"secondary"} />
        <Typography pl={2} color={"common.shade.200"} fontSize={14}>
          {t("variant.table.td.statistic.visit")}
        </Typography>
        <Typography pl={1} fontWeight={700} color={"common.shade.700"}>
          {productDetail?.variations[index]?.total_visited ?? 0}
        </Typography>
      </Box>
      <Box display="flex">
        <FavoriteIcon color={"secondary"} />
        <Typography pl={2} color={"common.shade.200"} fontSize={14}>
          {t("variant.table.td.statistic.favorite")}
        </Typography>
        <Typography pl={1} fontWeight={700} color={"common.shade.700"}>
          {productDetail?.variations[index]?.total_wishlist ?? 0}
        </Typography>
      </Box>
      <Box display="flex">
        <ShoppingCartIcon color={"secondary"} />
        <Typography pl={2} color={"common.shade.200"} fontSize={14}>
          {t("variant.table.td.statistic.sold")}
        </Typography>
        <Typography pl={1} fontWeight={700} color={"common.shade.700"}>
          {productDetail?.variations[index]?.sold ?? 0}
        </Typography>
      </Box>
    </TableCell>
  )
  const actionContainer = (row: Variation, index: number) => (
    <TableCell width={148} sx={{ borderRight: "1px solid #DEDEDE", maxWidth: "148px", minWidth: "148px" }}>
      <Box textAlign="left">
        <Link
          underline="hover"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setDataAction({
              name: row.name,
              index,
              images_url: productDetail?.variations[index]?.images_url[0]?.object_url,
              is_active: row.is_active
            })
            handleEditVariant(row, index)
          }}
        >
          <strong>{t("variant.table.td.action.edit")}</strong>
        </Link>
        <Box display="flex" justifyContent="space-between">
          {
            row.is_active ? (
              <Link
                underline="hover"
                color="error"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setDataAction({
                    name: row.name,
                    index,
                    images_url: productDetail?.variations[index]?.images_url[0]?.object_url,
                    is_active: row.is_active
                  })
                  setIsOpenDeactiveProductDialog(true)
                }}
              >
                <strong>
                  {t("variant.table.td.action.nonactive")}
                </strong>
              </Link>
            ) : (
              <Link
                underline="hover"
                color="success.main"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setDataAction({
                    name: row.name,
                    index,
                    images_url: productDetail?.variations[index]?.images_url[0]?.object_url,
                    is_active: row.is_active
                  })
                  setIsOpenActiveProductDialog(true)
                }}
              >
                <strong>
                  {t("variant.table.td.action.active")}
                </strong>
              </Link>
            )
          }
          <Link
            underline="hover"
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setDataAction({
                name: row.name,
                index,
                images_url: productDetail?.variations[index]?.images_url[0]?.object_url,
                is_active: row.is_active
              })

              setIsOpenDeleteProductDialog(true)
            }}
          >
            <strong>{t("variant.table.td.action.delete")}</strong>
          </Link>
        </Box>
      </Box>
    </TableCell>
  )
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
                {thContainer}
              </TableHead>
              <TableBody>
                {variant.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ borderBottom: "1.5px solid #DEDEDE" }}
                  >
                    <TableCell
                      sx={{
                        borderRight: "1px solid #DEDEDE",
                        maxWidth: "53px",
                        width: "53px"
                      }}
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    {imageContainer(row, index)}
                    {nameContainer(row, index)}
                    {stockContainer(row, index)}
                    {priceContainer(row, index)}
                    {statisticContainer(index)}
                    {actionContainer(row, index)}
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
      <Typography
        fontSize={16}
        fontWeight={700}
        color="primary"
        mb={2}
      >
        {t("variant.title")}
      </Typography>
      {tableContainer}
      <VGButton
        variant="contained"
        color="primary"
        disabled={!groupId}
        onClick={() => onClickAddVariant(true)}
      >
        <AddIcon />{t("variant.buttonLabel")}
      </VGButton>

      <AddVariantDialog
        isOpen={isShowAddVariantDialog}
        isVoucherInstant={isVoucherInstant}
        variant={variantData}
        dataAction={dataAction}
        index={indexRow}
        groupId={groupId}
        nextUpdatePrice={nextUpdatePrice}
        nextUpdateKilat={nextUpdateKilat}
        onEditVariation={onEditVariation}
        onDeleteVariant={handleDeleteVariation}
        onSubmit={onSubmit}
        handleClose={handleCloseModal}
      />
      <CropImageModal
        url={uploadedImage}
        isOpen={isShowCropImage}
        onClose={() => {
          setUploadedImage("")
          setUploadedImageDataIndex(0)
          setUploadedImageIndex(0)
          setIsShowCropImage(false)
        }}
        onSave={(file) => handleFileChange(file, uploadedImageDataIndex, uploadedImageIndex)}
      />
      <ConfirmationDeactiveVariantDialog
        id={dataAction.name}
        name={dataAction.name}
        image={dataAction.images_url}
        isOpen={isOpenDeactiveProductDialog}
        handleClose={() => setIsOpenDeactiveProductDialog(false)}
        handleDeactive={() => onChangeVariant(!dataAction.is_active, "is_active", dataAction.index)}
      />
      <ConfirmationActiveVariantDialog
        id={dataAction.name}
        name={dataAction.name}
        image={dataAction.images_url}
        isOpen={isOpenActiveProductDialog}
        handleClose={() => setIsOpenActiveProductDialog(false)}
        handleActivate={() => onChangeVariant(!dataAction.is_active, "is_active", dataAction.index)}
      />
      <ConfirmationDeleteVariantDialog
        id={dataAction.name}
        name={dataAction.name}
        image={dataAction.images_url}
        isOpen={isOpenDeleteProductDialog}
        handleClose={() => setIsOpenDeleteProductDialog(false)}
        handleDelete={() => onDeleteVariant(dataAction.index)}
      />
    </VGCard>
  )
}