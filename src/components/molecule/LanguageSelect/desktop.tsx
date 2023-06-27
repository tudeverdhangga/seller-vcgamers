import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

import EnFlagIcon from "~/components/icons/EnFlagIcon";
import IdFlagIcon from "~/components/icons/IdFlagIcon";
import { setLangCookie, getLangCookie } from "~/utils/cookies";
import { languages } from "./common";

export default function LanguageSelect() {
  const handleChange = (event: SelectChangeEvent) => {
    setLangCookie(event.target.value);
  };

  return (
    <Box>
      <Select
        defaultValue={getLangCookie()}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
        onChange={handleChange}
        renderValue={(value) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            {value === "EN" ? <EnFlagIcon /> : <IdFlagIcon />}
            {value}
          </Box>
        )}
        sx={{
          "& .MuiSvgIcon-root": {
            color: "white",
          },
          color: "white",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        }}
      >
        {languages.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ display: "flex", gap: "6px" }}
          >
            <option.icon
              sx={{
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "common.shade.75",
                backgroundColor: "common.shade.75",
              }}
            />
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
