
import Image from "next/image";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";

import { getStaticPropsWithTransNamespace } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import VoucherInput from "~/components/organism/VoucherInput";
import VoucherList from "~/components/organism/VoucherList";

export default function KelolaVoucherPage() {
  const { t } = useTranslation("voucher");

  return (
    <>
      <VGPageTitle
        subTitle={t("subTitle")}
        title={(
          <Box display="flex" alignItems="center">
            {t("title")}
            <Image
              src="/assets/badge-instant.svg"
              width={88}
              height={21}
              alt="Badge Instant"
              style={{ marginLeft: "8px" }}
            />
          </Box>
        )}
        sx={{ width: "100%" }}
      />

      <VoucherInput />
      <VoucherList />
    </>
  );
}

export const getStaticProps = getStaticPropsWithTransNamespace(["voucher"]);
