import { useTranslation } from "next-i18next";

import { getStaticPropsWithTrans } from "~/utils/translation";

export default function Home() {
  const { t } = useTranslation();

  return <>{t("help-center")}</>;
}

export { getStaticPropsWithTrans as getStaticProps };
