import { useTranslation } from "next-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import AddProductDetail from "~/components/organism/AddProductDetail";
import AddProductVariant from "~/components/organism/AddProductVariant";
import VGButton from "~/components/atomic/VGButton";
import { useCreateProduct } from "~/services/api/product";
import { toastOption } from "~/utils/toast";
import VGHead from "~/components/atomic/VGHead";

interface Response {
  product_category_id: string;
  product_brand_id: string;
  product_group_id: string;
  name: string;
  description: string;
  images_url: string[];
  variations: Variation[];
  next_update_price?: string;
}

interface Variation {
  name: string;
  product_variation_master_id?: string;
  delivery_type: number;
  stock: number;
  price: number;
  is_custom_image: boolean;
  is_active: boolean;
  images_url?: string[];
  visit?: number;
  favorite?: number;
  sold?: number;
  next_update_price?: string;
  next_activate_kilat?: string;
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
  const createProduct = useCreateProduct();
  const router = useRouter();
  const [params, setParams] = useState<Response>({
    product_category_id: "",
    product_brand_id: "",
    product_group_id: "",
    name: "",
    description: "",
    images_url: [],
    variations: [],
  });
  const [isVoucherInstant, setIsVoucherInstant] = useState(false);
  const [error, setError] = useState(false);

  const handleFilter = (
    key: string,
    value: string | number | boolean | Variation,
    index?: number
  ) => {
    if (key === "variations") {
      const updatedArray = params.variations;
      if (typeof value === "object") {
        updatedArray.push(value);
      }

      setParams({
        ...params,
        variations: updatedArray,
      });
    } else if (key === "images_url") {
      const updatedArray = params.images_url;
      if (typeof value === "string" && typeof index === "number") {
        updatedArray[index] = value;
      }

      setParams({
        ...params,
        images_url: updatedArray,
      });
    } else {
      setParams({
        ...params,
        [key]: value,
      });
    }
  };
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
    } else if (typeof value === "object") {
      if (typeof updatedVariation.images_url === "undefined") {
        updatedVariation.images_url = [];
      }
      updatedVariation.images_url[indexImage] = value[0] as string;
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
  };
  const onDeleteVariant = (index: number) => {
    const updatedArray = params.variations;
    updatedArray.splice(index, 1);
    setParams({
      ...params,
      variations: updatedArray,
    });
  };
  const onSubmit = () => {
    const formData = new FormData();

    formData.append("product_category_id", params.product_category_id);
    formData.append("product_brand_id", params.product_brand_id);
    formData.append("product_group_id", params.product_group_id);
    formData.append("description", params.description);

    params.images_url.forEach((element) => {
      formData.append("image_url[]", element);
    });

    params.variations.forEach((variation, index) => {
      formData.append(`variations[${index}][name]`, variation.name);
      formData.append(
        `variations[${index}][delivery_type]`,
        variation.delivery_type.toString()
      );
      formData.append(
        `variations[${index}][stock]`,
        variation.stock.toString()
      );
      formData.append(
        `variations[${index}][price]`,
        variation.price.toString()
      );
      formData.append(
        `variations[${index}][is_custom_image]`,
        variation.is_custom_image.toString()
      );
      formData.append(
        `variations[${index}][is_active]`,
        variation.is_active.toString()
      );

      if (variation.images_url !== undefined) {
        variation.images_url.forEach((imageUrl, imageIndex) => {
          formData.append(
            `variations[${index}][images_url][${imageIndex}]`,
            imageUrl
          );
        });
      }
      if (variation.product_variation_master_id !== undefined) {
        formData.append(
          `variations[${index}][product_variation_master_id]`,
          variation.product_variation_master_id
        );
      }
    });

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
        });
        void router.push("/seller/produk/kelola-produk");
      },
      onError: (error) => {
        const err = error as ErrorResponse;
        const errorMessage = `${t("detail.create.onError")}: ${
          err?.response?.data?.message
        }`;
        toast.error(errorMessage, toastOption);
      },
    });
  };
  const handleVoucherInstant = (isVoucher: boolean) => {
    setIsVoucherInstant(isVoucher);
  };
  const clearVariations = () => {
    const clearArray = params.variations.splice(0, params.variations.length);

    setParams({
      ...params,
      variations: clearArray,
    });
  };
  const onError = (error: boolean) => {
    setError(error);
  };

  return (
    <>
      <VGHead>{t("head")}</VGHead>
      <VGPageTitle
        subTitle={
          <>
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                color: "common.shade.200",
                cursor: "pointer",
              }}
              onClick={() => void router.push("/seller/produk/kelola-produk")}
            >
              <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
              {t("subTitle")}
            </Link>
          </>
        }
        title={t("title")}
        sx={{ width: "100%" }}
      />
      <AddProductDetail
        handleVoucherInstant={handleVoucherInstant}
        handleChangeFilter={handleFilter}
        clearVariations={clearVariations}
      />
      <AddProductVariant
        variant={params.variations}
        groupId={params.product_group_id}
        isVoucherInstant={isVoucherInstant}
        onEditVariation={onEditVariation}
        onDeleteVariant={onDeleteVariant}
        handleChangeVariantField={handleChangeVariantField}
        handleChangeFilter={handleFilter}
        onError={onError}
      />
      <Box display="flex" justifyContent="flex-end">
        <VGButton
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
          size="large"
          onClick={() => void router.push("/seller/produk/kelola-produk")}
        >
          {t("cancel")}
        </VGButton>
        <VGButton
          variant="contained"
          color="success"
          size="large"
          disabled={error || params.variations.length === 0}
          onClick={onSubmit}
        >
          {t("save")}
        </VGButton>
      </Box>
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["addProduct"]);
