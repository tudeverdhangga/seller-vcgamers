import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";

export default function ListProductFilter() {
  const { t } = useTranslation("listProduct");
  const [selectedStatus, setSelectedStatus] = useState("all")
  const category = [
    { label: "Category A", value: "a" },
    { label: "Category B", value: "b" },
    { label: "Category C", value: "c" }
  ]
  const brand = [
    { label: "Brand A", value: "a" },
    { label: "Brand B", value: "b" },
    { label: "Brand C", value: "c" }
  ]

  const handleFilterStatus = (status: string) => {
    setSelectedStatus(status)
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
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Autocomplete
              id="filter-by-category"
              disablePortal
              options={category}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("filter.category")}
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Autocomplete
              id="filter-by-brand"
              disablePortal
              options={brand}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("filter.brand")}
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <TextField
              id="filter-by-feature"
              label={t("filter.feature")}
              size="small"
              select
              fullWidth
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </VGCard>
      <Box>
        <VGButton
          sx={{m: 1}}
          color={ selectedStatus === "all" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("all")}
        >
          {t("filter.status.all")}
        </VGButton>
        <VGButton
          sx={{m: 1}}
          color={ selectedStatus === "active" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("active")}
        >
          {t("filter.status.active")}
        </VGButton>
        <VGButton
          sx={{m: 1}}
          color={ selectedStatus === "nonActive" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("nonActive")}
        >
          {t("filter.status.nonAktive")}
        </VGButton>
        <VGButton
          sx={{m: 1}}
          color={ selectedStatus === "runningLow" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("runningLow")}
        >
          {t("filter.status.runningLow")}
        </VGButton>
      </Box>
    </>
  )
}