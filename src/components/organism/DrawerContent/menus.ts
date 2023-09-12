import StoreIcon from "~/components/icons/StoreIcon";
import ProductIcon from "~/components/icons/ProductIcon";
import SettingIcon from "~/components/icons/SettingIcon";
import MessageIcon from "~/components/icons/MessageIcon";
import RequestIcon from "~/components/icons/RequestIcon";
import InstantMenu from "~/components/icons/feature/InstantMenu";
import KilatMenu from "~/components/icons/feature/KilatMenu";
import VIPMenu from "~/components/icons/feature/VIPMenu";
import KilatSwitch from "~/components/molecule/KilatSwitch";
import SalesBadge from "~/components/molecule/SalesBadge";
import BalanceBadge from "~/components/molecule/BalanceBadge";
import InstantBadge from "~/components/molecule/InstantBadge";
import VIPBadge from "~/components/molecule/VIPBadge";
import ComplainBadge from "~/components/molecule/ComplainBadge";
import ChatBadge from "~/components/molecule/ChatBadge";

export type MenuType = {
  name: string;
  translationKey: string;
  leading?: (props: any) => React.ReactNode;
  trailing?: (props: any) => React.ReactNode;
  href?: string;
  subList: {
    name: string;
    label?: string;
    href: string;
    leading?: (props: any) => React.ReactNode;
    trailing?: (props: any) => React.ReactNode;
  }[];
}[];

export const menus: MenuType = [
  {
    name: "shop",
    translationKey: "drawer.myShop.head",
    leading: StoreIcon,
    subList: [
      {
        name: "dashboard",
        label: "drawer.myShop.dashboard",
        href: "/seller/toko",
      },
      {
        name: "orders",
        label: "drawer.myShop.orders",
        trailing: SalesBadge,
        href: "/seller/toko/daftar-penjualan",
      },
      {
        name: "balance",
        label: "drawer.myShop.balance",
        trailing: BalanceBadge,
        href: "/seller/toko/saldo-toko",
      },
    ],
  },
  {
    name: "product",
    translationKey: "drawer.myProduct.head",
    leading: ProductIcon,
    subList: [
      {
        name: "manage",
        label: "drawer.myProduct.manage",
        href: "/seller/produk/kelola-produk",
      },
      {
        name: "addProduct",
        label: "drawer.myProduct.add",
        href: "/seller/produk/tambah-produk",
      },
      {
        name: "bulkEdit",
        label: "drawer.myProduct.bulkEdit",
        href: "/seller/produk/edit-produk-massal",
      },
    ],
  },
  {
    name: "setting",
    translationKey: "drawer.config.head",
    leading: SettingIcon,
    subList: [
      {
        name: "profile",
        label: "drawer.config.profile",
        href: "/seller/pengaturan/profil-toko",
      },
      {
        name: "schedule",
        label: "drawer.config.schedule",
        href: "/seller/pengaturan/jadwal-toko",
      },
    ],
  },
  {
    name: "chat",
    translationKey: "drawer.chat.head",
    leading: MessageIcon,
    subList: [
      {
        name: "complain",
        label: "drawer.chat.complain",
        trailing: ComplainBadge,
        href: "/seller/obrolan/komplain",
      },
      {
        name: "chat",
        label: "drawer.chat.chat",
        trailing: ChatBadge,
        href: "/seller/obrolan/percakapan",
      },
    ],
  },
  {
    name: "feature",
    translationKey: "drawer.feature.head",
    leading: RequestIcon,
    subList: [
      {
        name: "instant",
        leading: InstantMenu,
        trailing: InstantBadge,
        href: "/seller/request/instant",
      },
      {
        name: "kilat",
        leading: KilatMenu,
        trailing: KilatSwitch,
        href: "/seller/request/proses-kilat",
      },
      {
        name: "vip",
        leading: VIPMenu,
        trailing: VIPBadge,
        href: "/seller/request/vip-seller",
      },
    ],
  },
];
