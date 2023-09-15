import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import SearchIcon from '@mui/icons-material/Search';

import VoucherItem from "~/components/molecule/VoucherItem";
import { useDebounce } from "~/utils/debounce";
import { type ChangeEvent } from "react";
import Skeleton from "@mui/material/Skeleton";

interface DataVoucher {
  id: string
  voucher_code: string
  status: number
  status_name: string
  pulled_reason: string
}

export default function VoucherList({
  vouchers,
  isLoading,
  handleWithdraw,
  handleSearch
}: {
  vouchers?: DataVoucher[],
  isLoading: boolean,
  handleWithdraw: () => void,
  handleSearch: (search: string) => void
}) {
  const { t } = useTranslation("voucher");

  const onSearch = useDebounce((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleSearch(e.target.value)
  }, 1500)

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          md={9}
        >
          <Typography
            fontSize={18}
            fontWeight={700}
            color="primary"
          >
            {t("list.label")}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
        >
          <TextField
            id="filter-by-search"
            label={t("list.placeholder")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => onSearch(e)}
          />
        </Grid>
      </Grid>
      {
        isLoading
          ? (
            [0, 1, 2, 3, 4].map((index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="100%"
                height={84.5}
                sx={{ my: 1 }}
              />
            ))
          ) : (
            vouchers && vouchers.map((voucher, index) => (
              <VoucherItem
                key={index}
                id={voucher.id}
                status={voucher.status}
                label={voucher.status_name}
                code={voucher.voucher_code}
                reason={voucher.pulled_reason}
                handleWithdraw={handleWithdraw}
              />
            ))
          )
      }
    </>
  )
}