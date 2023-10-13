import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

export default function ComplainAdminJoinListSubheader() {
  const { t } = useTranslation("complain");

  return (
    <ListSubheader sx={{ backgroundColor: "transparent" }}>
      <Typography
        sx={{
          color: "common.purple.500",
          fontSize: 12,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {t("adminJoinMessage")}
      </Typography>
    </ListSubheader>
  );
}
