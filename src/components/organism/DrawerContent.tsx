import { useTranslation } from "next-i18next";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import DrawerListItem from "../atomic/DrawerListItem";
import DrawerListSubItem from "../atomic/DrawerListSubItem";
import ProfileCard from "../molecule/ProfileCard";
import StoreIcon from "../icons/StoreIcon";
import ProductIcon from "../icons/ProductIcon";
import SettingIcon from "../icons/SettingIcon";
import MessageIcon from "../icons/MessageIcon";
import RequestIcon from "../icons/RequestIcon";
import SellerToolbar from "../molecule/SellerToolbar";

export default function DrawerContent() {
  const { t } = useTranslation("layout");

  return (
    <div>
      <SellerToolbar />
      <Divider />
      <ProfileCard name={"Nama Toko"} />
      <Divider />
      <List sx={{ bgcolor: "background.paper" }}>
        <DrawerListItem
          title={t("drawer.myShop.head")}
          leading={<StoreIcon />}
        />
        <List component="div" disablePadding>
          <DrawerListSubItem
            title={t("drawer.myShop.dashboard")}
            href="/seller/toko"
          />
          <DrawerListSubItem
            title={t("drawer.myShop.orders")}
            href="/seller/daftar-penjualan"
          />
          <DrawerListSubItem
            title={t("drawer.myShop.balance")}
            href="/seller/saldo-toko"
          />
        </List>
        <DrawerListItem
          title={t("drawer.myProduct.head")}
          leading={<ProductIcon />}
        />
        <List component="div" disablePadding>
          <DrawerListSubItem
            title={t("drawer.myProduct.manage")}
            href="/seller/produk/kelola-produk"
          />
          <DrawerListSubItem
            title={t("drawer.myProduct.add")}
            href="/seller/produk/tambah-produk"
          />
          <DrawerListSubItem
            title={t("drawer.myProduct.bulkEdit")}
            href="/seller/produk/edit-produk-massal"
          />
        </List>
        <DrawerListItem
          title={t("drawer.config.head")}
          leading={<SettingIcon />}
        />
        <List component="div" disablePadding>
          <DrawerListSubItem
            title={t("drawer.config.profile")}
            href="/seller/pengaturan/profil-toko"
          />
          <DrawerListSubItem
            title={t("drawer.config.schedule")}
            href="/seller/pengaturan/jadwal-toko"
          />
        </List>
        <DrawerListItem
          title={t("drawer.chat.head")}
          leading={<MessageIcon />}
        />
        <List component="div" disablePadding>
          <DrawerListSubItem
            title={t("drawer.chat.complain")}
            href="/seller/obrolan/komplain"
          />
          <DrawerListSubItem
            title={t("drawer.chat.chat")}
            href="/seller/obrolan/percakapan"
          />
        </List>
        <DrawerListItem
          title={t("drawer.feature.head")}
          leading={<RequestIcon />}
        />
        <List component="div" disablePadding>
          <DrawerListSubItem
            title={t("drawer.feature.instant")}
            href="/seller/request/instant"
          />
          <DrawerListSubItem
            title={t("drawer.feature.kilat")}
            href="/seller/request/proses-kilat"
          />
          <DrawerListSubItem
            title={t("drawer.feature.vip")}
            href="/seller/request/vip-seller"
          />
          <DrawerListSubItem
            title={t("drawer.feature.host")}
            href="/seller/request/host-to-host"
          />
        </List>
        <DrawerListItem
          title={t("drawer.other.head")}
          sx={{ display: { sm: "none" } }}
          leading={<RequestIcon />}
        />
        <List component="div" disablePadding sx={{ display: { sm: "none" } }}>
          <DrawerListSubItem title={t("drawer.other.helpCenter")} />
          <DrawerListSubItem title={t("drawer.other.language")} />
        </List>
      </List>
    </div>
  );
}
