import { useResponsive } from "~/utils/mediaQuery";
import { mobileAppBarAtom } from "~/atom/layout";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useAtom } from "jotai";
import VGPageTitle from "~/components/atomic/VGPageTitle";

export default function BalanceTitle() {
  const { isMobile } = useResponsive();
  const { t } = useTranslation("balance");

  const [, setMobileAppBar] = useAtom(mobileAppBarAtom);

  useEffect(() => {
    setMobileAppBar({
      showPrev: false,
      content: t("title"),
      showMenu: true,
    });
  }, [setMobileAppBar, t]);

  return isMobile ? (
    <></>
  ) : (
    <VGPageTitle title={t("title")} subTitle={t("subtitle")} />
  );
}
