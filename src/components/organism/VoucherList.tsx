import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import SearchIcon from '@mui/icons-material/Search';

import { vouchers } from "~/utils/dummy/vouchers"
import VoucherItem from "~/components/molecule/VoucherItem";

export default function VoucherList() {
  const { t } = useTranslation("voucher");

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
          />
        </Grid>
      </Grid>
      {vouchers.map((voucher, index) => (
        <VoucherItem
          key={index}
          status={voucher.status}
          code={voucher.code}
          reason={voucher.alasan}
        />
      ))}
    </>
  )
}