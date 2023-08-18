import { useEffect, useState } from "react";
import queryString from "query-string";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import { useGetBrand } from "~/services/api/masterData";
import { useDownloadBulkProduct } from "~/services/api/product";
import { getCurrentTimestamp } from "~/utils/format";

interface Dropdown {
  label: string;
  value: string;
}

export default function BulkUpdateDownload() {
  const { t } = useTranslation("bulkUpdate");
  const [brand, setBrand] = useState<Dropdown[]>([])
  const [selectedBrand, setSelectedBrand] = useState({
    label: "Semua",
    value: ""
  })
  const getBrand = useGetBrand();
  const downloadProduct = useDownloadBulkProduct(queryString.stringify({ brand_id: selectedBrand.value }))

  useEffect(() => {
    const dataBrand: Dropdown[] = [{
      label: "Semua",
      value: ""
    }];

    getBrand?.data?.data?.map((item) => {
      if (item) {
        dataBrand?.push({
          label: item.name,
          value: item.id
        })
      }
    })
    setBrand(dataBrand)
  }, [getBrand?.data?.data])

  const handleDownloadReportProduct = () => {
    downloadProduct.mutate(
      undefined,
      {
        onSuccess: (res) => {
          // Convert response to xlsx
          const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `export_product_${getCurrentTimestamp()}.xlsx`;
          link.click();
        }
      }
    )
  }

  const subLabelStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: "common.shade.700",
    my: 2
  }

  return (
    <VGCard sx={{ height: 370, maxHeight: 370 }}>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          mb: 2
        }}
      >
        {t("download.title")}
      </Typography>
      <Typography sx={subLabelStyle}>
        {t("download.subTitle")}
      </Typography>
      <Box display="flex" my={1}>
        {
          getBrand.isLoading
            ? (
              <Skeleton
                variant="rounded"
                width="100%"
                height={40}
              />
            ) : (
              <Autocomplete
                disablePortal
                options={brand}
                value={selectedBrand}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("download.label")}
                    size="small"
                  />
                )}
                sx={{ width: "100%" }}
                onChange={(_, value) => setSelectedBrand(value)}
              />
            )
        }
        <VGButton
          variant="contained"
          color="success"
          sx={{ ml: 2 }}
          onClick={handleDownloadReportProduct}
        >
          {t("download.button")}
        </VGButton>
      </Box>
      <Typography sx={{ ...subLabelStyle, mb: 0 }}>
        {t("download.note.title")}
      </Typography>
      <ol style={{ marginTop: 0 }}>
        <li style={{
          ...subLabelStyle,
          color: "#616A82"
        }}>
          {t("download.note.1")}
        </li>
        <li style={{
          ...subLabelStyle,
          color: "#616A82"
        }}>
          {t("download.note.2")}
        </li>
        <li style={{
          ...subLabelStyle,
          color: "#616A82"
        }}>
          {t("download.note.3")}
        </li>
      </ol>
    </VGCard>
  )
}