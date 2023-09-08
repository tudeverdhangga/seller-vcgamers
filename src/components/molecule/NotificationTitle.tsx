import { useTranslation } from "next-i18next";

import VGPageTitle from "../atomic/VGPageTitle";

export default function NotificationTitle() {
  const { t } = useTranslation("notification");

  return (
    <VGPageTitle
      title={t("title")}
      subTitle={t("subtitle")}
      sx={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        mb: "20px",
        display: "flex",
        flex: "1 0 0",
      }}
    />
  );
}
