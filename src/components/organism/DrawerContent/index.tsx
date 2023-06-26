import { useState, useEffect } from 'react'
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import DrawerListItem from "~/components/atomic/DrawerListItem";
import DrawerListSubItem from "~/components/molecule/DrawerListSubItem";
import ProfileCard from "~/components/molecule/ProfileCard";
import SellerToolbar from "~/components/molecule/SellerToolbar";

import { menus } from './menus'

export default function DrawerContent() {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState(router.asPath);
  const { t } = useTranslation("layout");

  useEffect(() => {
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
      <ProfileCard name={"Nama Toko"} />
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
