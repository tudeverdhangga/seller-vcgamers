import NotificationTitle from "~/components/molecule/NotificationTitle";
import NotificationTab from "~/components/organism/NotificationTab";
import { getStaticPropsWithTransNamespace } from "~/utils/translation";

export default function NotificationPage() {
  return (
    <>
      <NotificationTitle />
      <NotificationTab />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace([
  "notification",
]);
