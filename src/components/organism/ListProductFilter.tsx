import { type SyntheticEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Box, Skeleton } from '@mui/material';
import { useTranslation } from 'next-i18next';

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import {
  useGetCategory,
  useGetBrand,
  useGetFeature,
  useGetProductStatus
} from '~/services/api/masterData';
import { useDebounce } from "~/utils/debounce";

interface Dropdown {
  label: string;
  value: string;
}

export default function ListProductFilter({
  handleChangeFilter
}: {
  handleChangeFilter: (key: string, param: string | number) => void
}) {
  const { t } = useTranslation("listProduct");
  const [selectedStatus, setSelectedStatus] = useState("")
  const getCategory = useGetCategory();
  const getBrand = useGetBrand();
  const getFeature = useGetFeature();
  const getProductStatus = useGetProductStatus();
  const [category, setCategory] = useState<Dropdown[]>([])
  const [brand, setBrand] = useState<Dropdown[]>([])
  const [feature, setFeature] = useState<Dropdown[]>([])
  const [productStatus, setProductStatus] = useState<Dropdown[]>([])

  useEffect(() => {
    const dataCategory: Dropdown[] = [];
    getCategory?.data?.data?.map((item) => {
      if (item) {
        dataCategory?.push({
          label: item.name,
          value: item.id
        })
      }
    })
    setCategory(dataCategory)
  }, [getCategory?.data?.data])
  useEffect(() => {
    const dataBrand: Dropdown[] = [];
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
  useEffect(() => {
    const dataFeature: Dropdown[] = [];
    getFeature?.data?.data?.map((item) => {
      if (item) {
        dataFeature?.push({
          label: item.name,
          value: item.value
        })
      }
    })
    setFeature(dataFeature)
  }, [getFeature?.data?.data])
  useEffect(() => {
    const dataProductStatus: Dropdown[] = [];
    getProductStatus?.data?.data?.map((item) => {
      if (item) {
        dataProductStatus?.push({
          label: item.name,
          value: item.value
        })
      }
    })
    setProductStatus(dataProductStatus)
  }, [getProductStatus?.data?.data])
  
  const handleFilterStatus = (status: string) => {
    setSelectedStatus(status)
    handleChangeFilter('product_status', status)
  }
  const onChangeFilter = (value: Dropdown | null, filterBy: string) => {    
    if (value?.value) {
      handleChangeFilter(filterBy, value?.value)
    } else {
      handleChangeFilter(filterBy, "")
    }
  }
  const onSearch = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFilter('search', event?.target?.value);
  }, 1200)
  const getProductStatusLabel = (value: string) => {
    switch (value) {
      case "":
        return t("filter.status.all");
      case "1":
        return t("filter.status.active");
      case "2":
        return t("filter.status.nonAktive");
      case "3":
        return t("filter.status.runningLow");
      default:
        break;
    }
  }

  return (
    <>
      <VGCard>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              id="filter-by-search"
              label={t("filter.search")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              fullWidth
              onChange={onSearch}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Autocomplete
              id="filter-by-category"
              clearOnEscape
              options={category}
              disabled={getCategory.isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("filter.category")}
                  size="small"
                />
              )}
              onChange={(_, value) => onChangeFilter(value, "category_id")}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Autocomplete
              id="filter-by-brand"
              clearOnEscape
              options={brand}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("filter.brand")}
                  size="small"
                />
              )}
              onChange={(_, value) => onChangeFilter(value, "brand_id")}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Autocomplete
              id="filter-by-feature"
              clearOnEscape
              options={feature}
              disabled={getFeature.isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("filter.feature")}
                  size="small"
                />
              )}
              onChange={(_, value) => onChangeFilter(value, "feature")}
            />
          </Grid>
        </Grid>
      </VGCard>
      <Box display="flex">
        {
          getProductStatus.isLoading
            ? (
              [0, 1, 2, 3].map((index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={64}
                  height={36.5}
                  sx={{m: 1}}
                />
              ))
            )
            : (
              productStatus.map((item, index) => (
                <VGButton
                  key={index}
                  sx={{m: 1}}
                  color={ selectedStatus === item.value ? "primary" : "secondary" }
                  variant="outlined"
                  size="small"
                  onClick={() => handleFilterStatus(item.value)}
                >
                  {getProductStatusLabel(item.value)}
                </VGButton>
              ))
            )
        }
      </Box>
    </>
  )
}