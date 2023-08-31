import StoreIcon from "~/components/icons/StoreIcon";
import ProductIcon from "~/components/icons/ProductIcon";
import SettingIcon from "~/components/icons/SettingIcon";
import MessageIcon from "~/components/icons/MessageIcon";
import RequestIcon from "~/components/icons/RequestIcon";

export const menus = [
  {
    name: "shop",
    translationKey: "drawer.myShop.head",
    leading: StoreIcon,
    subList: [
      {
        name: "dashboard",
        label: "drawer.myShop.dashboard",
        href: "/seller/toko"
      },
      {
        name: "orders",
        label: "drawer.myShop.orders",
        href: "/seller/toko/daftar-penjualan"
      },
      {
        name: "balance",
        label: "drawer.myShop.balance",
        href: "/seller/toko/saldo-toko"
      }
    ]
  },
  {
    name: "product",
    translationKey: "drawer.myProduct.head",
    leading: ProductIcon,
    subList: [
      {
        name: "manage",
        label: "drawer.myProduct.manage",
        href: "/seller/produk/kelola-produk"
      },
      {
        name: "add",
        label: "drawer.myProduct.add",
        href: "/seller/produk/tambah-produk"
      },
      {
        name: "bulkEdit",
        label: "drawer.myProduct.bulkEdit",
        href: "/seller/produk/edit-produk-massal"
      }
    ]
  },
  {
    name: "setting",
    translationKey: "drawer.config.head",
    leading: SettingIcon,
    subList: [
      {
        name: "profile",
        label: "drawer.config.profile",
        href: "/seller/pengaturan/profil-toko"
      },
      {
        name: "schedule",
        label: "drawer.config.schedule",
        href: "/seller/pengaturan/jadwal-toko"
      }
    ]
  },
  {
    name: "chat",
    translationKey: "drawer.chat.head",
    leading: MessageIcon,
    subList: [
      {
        name: "complain",
        label: "drawer.chat.complain",
        href: "/seller/obrolan/komplain"
      },
      {
        name: "chat",
        label: "drawer.chat.chat",
        href: "/seller/obrolan/percakapan"
      }
    ]
  },
  {
    name: "feature",
    translationKey: "drawer.feature.head",
    leading: RequestIcon,
    subList: [
      {
        name: "instant",
        label: "drawer.feature.instant",
        href: "/seller/request/instant"
      },
      {
        name: "kilat",
        label: "drawer.feature.kilat",
        href: "/seller/request/proses-kilat"
      },
      {
        name: "vip",
        label: "drawer.feature.vip",
        href: "/seller/request/vip-seller"
      }
      // {
      //   name: "host",
      //   label: "drawer.feature.host",
      //   href: "/seller/request/host-to-host"
      // }
    ]
  }
]