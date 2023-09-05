import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTranslation } from "next-i18next";
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from "@mui/material/Box";
import dayjs, { type Dayjs } from 'dayjs';
import Skeleton from '@mui/material/Skeleton';

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import { useDebounce } from '~/utils/debounce';
import { useGetTransactionStatus } from '~/services/api/transaction';
import { useGetFeature } from '~/services/api/masterData';
import Typography from '@mui/material/Typography';

interface TabsStatus {
  label: string;
  value: string;
  counter: string;
}
interface Dropdown {
  label: string;
  value: string;
}

export default function ListTransactionFilter({ handleFilter }: {
  handleFilter: (key: string, param: string | number) => void
}) {
  const { t } = useTranslation("transaction");
  const [feature, setFeature] = useState<Dropdown[]>([])
  const [selectedFeature, setSelectedFeature] = useState({
    label: "Semua Layanan",
    value: ""
  })
  const [selectedStatus, setSelectedStatus] = useState("2")
  const [transactionStatus, setTransactionStatus] = useState<TabsStatus[]>([])
  const getTransactionStatus = useGetTransactionStatus()
  const getFeature = useGetFeature()

  useEffect(() => {
    const dataProductStatus: TabsStatus[] = [];
    getTransactionStatus?.data?.data?.map((item) => {
      if (item) {
        dataProductStatus?.push({
          label: item.label,
          value: item.value,
          counter: item.counter
        })
      }
    })
    setTransactionStatus(dataProductStatus)
  }, [getTransactionStatus?.data?.data])
  useEffect(() => {
    const dataFeature: Dropdown[] = [{
      label: "Semua Layanan",
      value: ""
    }];

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

  const handleFilterTabs = (status: string) => {
    setSelectedStatus(status);
    handleFilter('status', status);
  }
  const handleFilterFeature = (event: Dropdown) => {
    setSelectedFeature(event);
    handleFilter("feature", event.value);
  }
  const onSearch = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilter('search', event?.target?.value);
  }, 1200)
  const onChangeDate = (value: Dayjs | null, key: string) => {
    const date = dayjs(value).format("YYYY-MM-DD");
    handleFilter(key, date)
  }

  return (
    <>
      <VGCard>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={5}
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
              fullWidth
              onChange={onSearch}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md
          >
            {
              getFeature.isLoading
                ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={56}
                  />
                ) : (
                  <Autocomplete
                    id="filter-by-feature"
                    clearOnEscape
                    options={feature}
                    value={selectedFeature}
                    fullWidth
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("filter.feature")}
                      />
                    )}
                    onChange={(_, value) => handleFilterFeature(value as Dropdown)}
                  />
                )
            }
          </Grid>
          <Grid
            item
            xs={12}
            md
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("filter.startDate")}
                sx={{ width: "100%" }}
                onChange={(e) => onChangeDate(e as Dayjs, 'date_start')}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            md
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("filter.endDate")}
                sx={{ width: "100%" }}
                onChange={(e) => onChangeDate(e as Dayjs, 'date_end')}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </VGCard>
      <Box
        display="flex"
        overflow="auto"
      >
        {
          getTransactionStatus.isLoading
            ? (
              [0, 1, 2, 3, 4].map((index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={64}
                  height={36.5}
                  sx={{ m: 1 }}
                />
              ))
            ) : (
              <>
                {
                  transactionStatus.map((item, index) => (
                    <VGButton
                      key={index}
                      sx={{ m: 1, minWidth: "fit-content" }}
                      color={selectedStatus === item.value ? "primary" : "secondary"}
                      variant="outlined"
                      size="small"
                      onClick={() => handleFilterTabs(item.value)}
                    >
                      <Typography
                        fontSize={14}
                        fontWeight={600}
                      >
                        {item.label}
                      </Typography>
                      {
                        item.value !== "4" && item.value !== "5" && item.counter !== "0" && (
                          <Box
                            sx={{
                              backgroundColor: "error.main",
                              borderRadius: "20px",
                              height: "15px",
                              display: "flex",
                              alignItems: "center",
                              padding: "6px",
                              marginLeft: "5px"
                            }}
                            color="white"
                            fontSize={10}
                          >
                            {item.counter}
                          </Box>
                        )
                      }
                    </VGButton>
                  ))
                }
              </>
            )
        }
      </Box>
    </>
  )
}