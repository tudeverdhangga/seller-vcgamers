import { useTranslation } from "next-i18next";

import VGPageTitle from "../atomic/VGPageTitle";

export default function ComplainTitle() {
  const { t } = useTranslation("complain");

  return <VGPageTitle title={t("title")} subTitle={t("subtitle")} />;
}
