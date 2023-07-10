import { useTranslation } from "next-i18next";

import VGPageTitle from "../atomic/VGPageTitle";

export default function ChatTitle() {
  const { t } = useTranslation("chat");

  return <VGPageTitle title={t("title")} subTitle={t("subtitle")} />;
}
