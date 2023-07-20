import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import VGCard from "../atomic/VGCard";
import { useTranslation } from "next-i18next";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "../icons/SearchIcon";

export default function ManagePromoSearchBar() {
  const { t } = useTranslation("managePromo");

  return (
    <VGCard>
      <Typography
        sx={{
          color: "primary.main",
          fontSize: 16,
          fontWeight: 700,
          mb: "20px",
        }}
      >
        {t("promoHistory.title")}
      </Typography>
      <TextField
        label={t("promoHistory.textInput")}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="search"
                // onClick={() => {}}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </VGCard>
  );
}
