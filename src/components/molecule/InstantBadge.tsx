import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useGetProfile } from "~/services/api/auth";

export default function InstantBadge() {
  const { t } = useTranslation("layout");
  const { data } = useGetProfile();

  const hasInstant = data?.data.seller_has_instant;

  const title = hasInstant ? t("badge.active") : t("badge.inactive");
  const color = hasInstant ? "common.green.500" : "common.shade.75";

  return (
    <Typography fontSize={14} fontWeight={600} color={color}>
      {title}
    </Typography>
  );
}
