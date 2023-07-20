import { useState } from 'react';
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTranslation } from "next-i18next";
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from "@mui/material/Box";

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";

export default function ListTransactionFilter() {
  const { t } = useTranslation("transaction");
  const category = [
    { label: "Category A", value: "a" },
    { label: "Category B", value: "b" },
    { label: "Category C", value: "c" }
  ]
  const [selectedStatus, setSelectedStatus] = useState("process")

  const handleFilterStatus = (status: string) => {
    setSelectedStatus(status)
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
            md={5 }
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
            />
          </Grid>
          <Grid
            item
            xs={12}
            md
          >
            <Autocomplete
              id="filter-by-feature"
              disablePortal
              options={category}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("filter.feature")}
                />
              )}
            />
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
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </VGCard>
      <Box
        display="flex"
        overflow="auto"
        width="100vw"
      >
        <VGButton
          sx={{m: 1, minWidth: "fit-content"}}
          color={ selectedStatus === "process" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("process")}
        >
          {t("filter.status.process")}
        </VGButton>
        <VGButton
          sx={{m: 1, minWidth: "fit-content"}}
          color={ selectedStatus === "onProcess" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("onProcess")}
        >
          {t("filter.status.onProcess")}
        </VGButton>
        <VGButton
          sx={{m: 1, minWidth: "fit-content"}}
          color={ selectedStatus === "sent" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("sent")}
        >
          {t("filter.status.sent")}
        </VGButton>
        <VGButton
          sx={{m: 1, minWidth: "fit-content"}}
          color={ selectedStatus === "done" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("done")}
        >
          {t("filter.status.done")}
        </VGButton>
        <VGButton
          sx={{m: 1, minWidth: "fit-content"}}
          color={ selectedStatus === "cancel" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("cancel")}
        >
          {t("filter.status.cancel")}
        </VGButton>
        <VGButton
          sx={{m: 1, minWidth: "fit-content"}}
          color={ selectedStatus === "complain" ? "primary" : "secondary" }
          variant="outlined"
          size="small"
          onClick={() => handleFilterStatus("complain")}
        >
          {t("filter.status.complain")}
        </VGButton>
      </Box>
    </>
  )
}