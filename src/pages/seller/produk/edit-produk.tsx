import { useTranslation } from "next-i18next";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import queryString from "query-string";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import AddProductDetail from "~/components/organism/AddProductDetail";
import AddProductVariant from "~/components/organism/AddProductVariant";
import VGButton from "~/components/atomic/VGButton";
import { useCreateProduct, useEditProduct, useGetProductDetail } from "~/services/api/product";
import { toastOption } from "~/utils/toast";
import AddProductDetailLoading from "~/components/atomic/AddProductDetailLoading";

interface Response {
  product_category_id: string
  product_brand_id: string
  product_group_id: string
  name: string
  description: string
  images_url: string[]
  variations: Variation[]
}
interface Variation {
  id?: string
  name: string
  product_variation_master_id?: string
  delivery_type: number
  stock: number
  price: number
  is_custom_image: boolean
  is_active: boolean
  images_url?: string[]
  visit?: number;
  favorite?: number;
  sold?: number;
}
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function TambahProdukPage() {
  const { t } = useTranslation("addProduct");
  const [id, setId] = useState("");
  const createProduct = useCreateProduct()
  const editProduct = useEditProduct(queryString.stringify({ product_id: id }))
  const productDetail = useGetProductDetail()
  const router = useRouter()
  const [params, setParams] = useState<Response>({
    product_category_id: "",
    product_brand_id: "",
    product_group_id: "",
    name: "",
    description: "",
    images_url: [],
    variations: [],
  })
  const [isVoucherInstant, setIsVoucherInstant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof router.query.product_id === "string") {
      setId(router.query.product_id)
      productDetail.mutate(queryString.stringify({ product_id: router.query.product_id }), {
        onSuccess: (res) => {
          setParams({
            product_category_id: res.data.product_category.value,
            product_brand_id: res.data.product_brand.value,
            product_group_id: res.data.product_group.value,
            name: res.data.name,
            description: res.data.description,
            images_url: res.data.images_url.map((image) => image.object_key),
            variations: res.data.variations.map((item) => {
              return {
                id: item.id,
                name: item.name,
                product_variation_master_id: item.product_variation_master ? item.product_variation_master.value : undefined,
                delivery_type: item.delivery_type,
                stock: item.stock,
                price: item.price,
                is_active: item.is_active,
                is_custom_image: item.is_custom_image,
                images_url: item.images_url.map((image) => image.object_key)
              }
            })
          })
        }
      })
    }
  }, [router.query.product_id])
  useEffect(() => {
    setIsLoading(productDetail.isLoading)
  }, [productDetail.isLoading])

  const handleFilter = (
    key: string,
    value: string | number | boolean | Variation,
    index?: number
  ) => {
    if (key === 'variations') {
      const updatedArray = params.variations;
      if (typeof value === 'object') {
        updatedArray.push(value)
      }

      setParams({
        ...params,
        variations: updatedArray
      });
    } else if (key === 'images_url') {
      const updatedArray = params.images_url;
      if (typeof value === 'string' && typeof index === 'number') {
        updatedArray[index] = value
      }

      setParams({
        ...params,
        images_url: updatedArray
      });
    } else {
      setParams({
        ...params,
        [key]: value
      });
    }
  }
  const handleChangeVariantField = <K extends keyof Variation>(
    key: K,
    value: Variation[K],
    index: number,
    indexImage?: number
  ) => {
    const updatedArray = params.variations;
    const updatedVariation = updatedArray[index] as Variation;

    if (typeof indexImage === "undefined") {
      updatedVariation[key] = value;
    } else {
      if (typeof updatedVariation.images_url === 'undefined') {
        updatedVariation.images_url = [];
      }
      if (typeof value === "object") {
        updatedVariation.images_url[indexImage] = value[0] as string;
      }
    }

    updatedArray[index] = updatedVariation;

    setParams({
      ...params,
      variations: updatedArray,
    });
  };
  const onEditVariation = (value: Variation, index: number) => {
    const updatedVariations = params.variations;
    updatedVariations[index] = value;
    setParams({
      ...params,
      variations: updatedVariations,
    });
  }
  const onDeleteVariant = (index: number) => {
    const updatedArray = params.variations;
    updatedArray.splice(index, 1);
    setParams({
      ...params,
      variations: updatedArray,
    });
  }
  const onSubmit = () => {
    if (id) {
      editProduct.mutate(params, {
        onSuccess: () => {
          toast.success(t("detail.edit.onSuccess"), toastOption);
          setParams({
            product_category_id: "",
            product_brand_id: "",
            product_group_id: "",
            name: "",
            description: "",
            images_url: [],
            variations: [],
          })
          void router.push('/seller/produk/kelola-produk');
        },
        onError: (error) => {
          const err = error as ErrorResponse
          const errorMessage = `${t("detail.edit.onError")}: ${err?.response?.data?.message}`
          toast.error(errorMessage, toastOption);
        }
      })
    } else {
      createProduct.mutate(params, {
        onSuccess: () => {
          toast.success(t("detail.create.onSuccess"), toastOption);
          setParams({
            product_category_id: "",
            product_brand_id: "",
            product_group_id: "",
            name: "",
            description: "",
            images_url: [],
            variations: [],
          })
          void router.push('/seller/produk/kelola-produk');
        },
        onError: (error) => {
          const err = error as ErrorResponse
          const errorMessage = `${t("detail.create.onError")}: ${err?.response?.data?.message}`
          toast.error(errorMessage, toastOption);
        }
      })
    }
  }
  const handleVoucherInstant = (isVoucher: boolean) => {
    setIsVoucherInstant(isVoucher)
  }

  return (
    <>
      <VGPageTitle
        subTitle={(
          <>
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                color: "common.shade.200",
                cursor: "pointer"
              }}
              onClick={() => void router.push('/seller/produk/kelola-produk')}
            >
              <ArrowBackIcon
                fontSize="small"
                sx={{ mr: 1 }}
              />
              {t("subTitle")}
            </Link>
          </>
        )}
        title={t("title")}
        sx={{ width: "100%" }}
      />
      {
        isLoading
          ? (
            <AddProductDetailLoading />
          ) : (
            <>
              <AddProductDetail
                handleVoucherInstant={handleVoucherInstant}
                handleChangeFilter={handleFilter}
                productDetail={productDetail.data?.data}
              />
              <AddProductVariant
                productDetail={productDetail.data?.data}
                variant={params.variations}
                groupId={params.product_group_id}
                isVoucherInstant={isVoucherInstant}
                onEditVariation={onEditVariation}
                onDeleteVariant={onDeleteVariant}
                handleChangeVariantField={handleChangeVariantField}
                handleChangeFilter={handleFilter}
              />
            </>
          )
      }
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <VGButton
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
          size="large"
        >
          {t("cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          onClick={onSubmit}
        >
          {t("save")}
        </VGButton>
      </Box>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["addProduct"]);
