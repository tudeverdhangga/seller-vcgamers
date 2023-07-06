import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";

export default function BulkUpdateDownload() {
  const { t } = useTranslation("bulkUpdate");
  const brand = [
    { label: "Brand A", value: "a" },
    { label: "Brand B", value: "b" },
    { label: "Brand C", value: "c" }
  ]

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
        <Autocomplete
          disablePortal
          options={brand}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("download.label")}
              size="small"
            />
          )}
          sx={{ width: "100%" }}
        />
        <VGButton
          variant="contained"
          color="success"
          sx={{ ml: 2 }}
        >
          {t("download.button")}
        </VGButton>
      </Box>
      <Typography sx={{...subLabelStyle, mb: 0}}>
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