import { useState, useEffect } from 'react'
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import DrawerListItem from "~/components/atomic/DrawerListItem";
import DrawerListSubItem from "~/components/molecule/DrawerListSubItem";
import ProfileCard from "~/components/molecule/ProfileCard";
import SellerToolbar from "~/components/molecule/SellerToolbar";

import { useGetProfile } from "~/services/api/auth";
import { menus } from './menus'

export default function DrawerContent() {
  const router = useRouter();
  const getProfile = useGetProfile();
  const [sellerName, setSellerName] = useState("");
  const [sellerProfile, setSellerProfile] = useState("");
  const [sellerOpen, setSellerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(router.asPath);
  const { t } = useTranslation("layout");

  useEffect(() => {
    setSellerName(getProfile?.data?.data?.seller_name ? getProfile?.data?.data?.seller_name : "Nama Toko" )
    setSellerProfile(getProfile?.data?.data?.seller_photo ? getProfile?.data?.data?.seller_photo.object_url : "" )
    setSellerOpen(!getProfile?.data?.data?.is_closed)
  }, [
    getProfile?.data?.data?.seller_name,
    getProfile?.data?.data?.seller_photo,
    getProfile?.data?.data?.is_closed,
  ])

  useEffect(() => {
    // Check if user want to access voucher from direct url
    const url = router.asPath
    const matches = url.match(/\/([^\/?]+)/g)
    const mainUrl = matches && matches[2]

    if (mainUrl === "/kelola-voucher") {
      if (!localStorage.getItem("voucherPermission")) {
        void router.push("/seller/produk/kelola-produk")
      }
    } else {
      localStorage.removeItem("voucherPermission")
    }
    
    // Handle the route change here
    const handleRouteChange = (activeMenu: string) => {
      setActiveMenu(activeMenu);
    };

    // Subscribe to router events
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  })

  return (
    <div>
      <SellerToolbar />
      <Divider />
      <ProfileCard name={sellerName} profile_src={sellerProfile} is_closed={!sellerOpen} />
      <Divider />
      <List sx={{ bgcolor: "background.paper" }}>
        {menus.map(menu => (
          <DrawerListItem
            key={`sub-menu-${menu.name}`}
            title={t(menu.translationKey as "drawer.myShop.head")}
            leading={ <menu.leading /> }
            subList={menu.subList}
            activeMenu={activeMenu}
          />
        ))}
        <List component="div" disablePadding sx={{ display: { sm: "none" } }}>
          <DrawerListSubItem title={t("drawer.other.helpCenter")} />
          <DrawerListSubItem title={t("drawer.other.language")} />
        </List>
      </List>
    </div>
  );
}
