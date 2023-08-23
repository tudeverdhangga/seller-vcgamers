import Typography from "@mui/material/Typography";
import VGCard from "../atomic/VGCard";
import { useTranslation } from "next-i18next";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "../icons/SearchIcon";
import { useQueryState } from "next-usequerystate";
import { useForm } from "react-hook-form";
import VGInputText from "../atomic/VGInputText";

export default function ManagePromoSearchBar() {
  const { t } = useTranslation("managePromo");
  const [, setSearch] = useQueryState("search");
  const { control, handleSubmit } = useForm<{ search: string }>();

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
      <form onSubmit={handleSubmit((data) => setSearch(data.search))}>
        <VGInputText
          ControllerProps={{ name: "search", control }}
          TextFieldProps={{
            label: t("promoHistory.textInput"),
            variant: "outlined",
            size: "small",
            fullWidth: true,
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search" type="submit" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
    </VGCard>
  );
}
