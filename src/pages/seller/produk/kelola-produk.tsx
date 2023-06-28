import { getStaticPropsWithTrans } from "~/utils/translation";
import VGPageTitle from "~/components/atomic/VGPageTitle";
import ListProductFilter from "~/components/organism/ListProductFilter";
import ListProduct from "~/components/organism/ListProduct";

export default function KelolaProdukPage() {
  return (
    <>
      <VGPageTitle
        subTitle="Kelola Katalog"
        title="Produk"
      />
      <ListProductFilter />
      <ListProduct />
    </>
  );
}

export { getStaticPropsWithTrans as getStaticProps };
