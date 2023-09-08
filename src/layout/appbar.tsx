import Box from "@mui/material/Box";
import ChevronLeftIcon from "~/components/icons/ChevronLeftIcon";
import { DRAWER_WIDTH } from "./drawer";
import HelpCenterMenu from "~/components/molecule/HelpCenterMenu/desktop";
import IconButton from "@mui/material/IconButton";
import LanguageSelect from "~/components/molecule/LanguageSelect/desktop";
import MenuDotsIcon from "../components/icons/MenuDotsIcon";
import MenuIcon from "../components/icons/MenuIcon";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { drawerOpenAtom } from "~/atom";
import dynamic from "next/dynamic";
import { mobileAppBarAtom } from "~/atom/layout";
import { useFCMToken, useOnMessage } from "~/utils/firebase";
import { useAtom } from "jotai";
import { useResponsive } from "~/utils/mediaQuery";
import { useRouter } from "next/router";
import { useSetOnlineIndicator } from "~/utils/socket";

const NotificationIcon = dynamic(
  () => import("~/components/molecule/AppBarNotificationIcon"),
  {
    ssr: false,
  }
);

export function AppBar() {
  const { isDesktop, isMobile } = useResponsive();
  useFCMToken();
  useOnMessage();
  useSetOnlineIndicator();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
        {isDesktop && <DesktopAppBar />}
        {isMobile && <MobileAppBar />}
      </Toolbar>
    </MuiAppBar>
  );
}

function DesktopAppBar() {
  return (
    <>
      <HelpCenterMenu />
      <LanguageSelect />
      <Box component="div" sx={{ flexGrow: 1 }} />
      <NotificationIcon />
    </>
  );
}

function MobileAppBar() {
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const [appBar] = useAtom(mobileAppBarAtom);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlerPrevButton = () => {
    router.back();
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="previous history"
        edge="start"
        onClick={handlerPrevButton}
        sx={{
          display: { xs: appBar.showPrev ? "inline-flex" : "none", sm: "none" },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { sm: "none" } }}
      >
        {appBar.content}
      </Typography>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={appBar.onClick ? appBar.onClick : handleDrawerToggle}
        sx={{
          display: { xs: appBar.showMenu ? "inline-flex" : "none", sm: "none" },
        }}
      >
        {appBar.menuIcon === "dots" ? <MenuDotsIcon /> : <MenuIcon />}
      </IconButton>
    </>
  );
}
