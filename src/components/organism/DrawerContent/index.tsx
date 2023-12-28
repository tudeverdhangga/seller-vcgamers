import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useAtom } from "jotai";

import { drawerOpenAtom } from "~/atom";

import DrawerListItem from "~/components/atomic/DrawerListItem";
import ProfileCard from "~/components/molecule/ProfileCard";
import ModerationInfo from "~/components/molecule/ModerationInfo";
import SellerToolbar from "~/components/molecule/SellerToolbar";

import { useGetProfile } from "~/services/api/auth";
import { menus } from "./menus";
import { checkVoucher, isOpenAlert, voucherCode } from "~/atom/voucher";
import HelpCenterMenu from "~/components/molecule/HelpCenterMenu/mobile";
import LanguageSelect from "~/components/molecule/LanguageSelect/mobile";

export default function DrawerContent() {
  const router = useRouter();
  const { data } = useGetProfile();
  const [activeMenu, setActiveMenu] = useState(router.asPath);
  const [, setDrawerOpen] = useAtom(drawerOpenAtom);
  const { t } = useTranslation("layout");
  const [, setVouchers] = useAtom(voucherCode);
  const [, setCheckVoucher] = useAtom(checkVoucher);
  const [, setIsOpenMessage] = useAtom(isOpenAlert);

  useEffect(() => {
    // Check if user want to access voucher from direct url
    const url = router.asPath;
    const matches = url.match(/\/([^\/?]+)/g);
    const mainUrl = matches && matches[2];

    if (mainUrl === "/kelola-voucher") {
      if (
        !localStorage.getItem("voucherPermission") &&
        !localStorage.getItem("pin")
      ) {
        void router.push("/seller/produk/kelola-produk");
      }
    } else {
      localStorage.removeItem("voucherPermission");
      localStorage.removeItem("pin");
    }

    // Handle the route change here
    const handleRouteChange = (activeMenu: string) => {
      setActiveMenu(activeMenu);
      setDrawerOpen(false);
    };

    // Subscribe to router events
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  });

  useEffect(() => {
    const url = router.asPath;
    const matches = url.match(/\/([^\/?]+)/g);
    const mainUrl = matches && matches[2];

    if (mainUrl !== "/kelola-voucher") {
      setIsOpenMessage(false);
      setCheckVoucher({
        isDisable: false,
        isValidate: false,
        isDuplicate: false,
        vouchers: "",
        total: 0,
      });
      setVouchers("");
    }
  }, [router.asPath]);

  return (
    <>
      <SellerToolbar />
      <Divider />
      {data?.data.is_moderation && <ModerationInfo />}
      <ProfileCard
        name={data?.data?.seller_name ?? "Nama Toko"}
        slug={data?.data?.seller_url ?? "seller"}
        profile_src={data?.data?.seller_photo.object_url ?? ""}
        is_closed={data?.data?.is_closed ?? true}
        store_status={data?.data?.status ?? 1}
      />
      <Divider />
      <List sx={{ bgcolor: "background.paper" }}>
        {menus.map((menu) => (
          <DrawerListItem
            key={`sub-menu-${menu.name}`}
            name={menu.name}
            title={t(menu.translationKey as "drawer.myShop.head")}
            leading={menu.leading ? <menu.leading /> : null}
            subList={menu.subList}
            activeMenu={activeMenu}
          />
        ))}
        <List component="div" disablePadding sx={{ display: { sm: "none" } }}>
          <HelpCenterMenu />
          <LanguageSelect />
        </List>
      </List>
    </>
  );
}
