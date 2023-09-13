import { useTranslation } from "next-i18next";
import VGHead from "~/components/atomic/VGHead";
import NotificationTitle from "~/components/molecule/NotificationTitle";
import NotificationTab from "~/components/organism/NotificationTab";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function NotificationPage() {
  const { t } = useTranslation("notification");

  return (
    <>
      <VGHead>{t("head")}</VGHead>
      <NotificationTitle />
      <NotificationTab />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace([
  "notification",
]);
