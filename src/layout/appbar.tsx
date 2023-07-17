import Link from "next/link";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Badge, { type BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useAtom } from "jotai";

import ChevronLeftIcon from "~/components/icons/ChevronLeftIcon";
import BellIcon from "../components/icons/BellIcon";
import MenuIcon from "../components/icons/MenuIcon";
import MenuDotsIcon from "../components/icons/MenuDotsIcon";

import { drawerOpenAtom } from "~/atom";

import { mobileAppBarAtom } from "~/atom/layout";
import HelpCenterMenu from "~/components/molecule/HelpCenterMenu/desktop";
import LanguageSelect from "~/components/molecule/LanguageSelect/desktop";
import { useResponsive } from "~/utils/mediaQuery";
import { DRAWER_WIDTH } from "./drawer";

export function AppBar() {
  const { isDesktop } = useResponsive();

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
        <MobileAppBar />
      </Toolbar>
    </MuiAppBar>
  );
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 13,
    padding: "0 4px",
    backgroundColor: theme.palette.common.red[500],
    color: theme.palette.common.white,
  },
}));

function DesktopAppBar() {
  return (
    <>
      <HelpCenterMenu />
      <LanguageSelect />
      <Box component="div" sx={{ flexGrow: 1 }} />
      <Link
        href={"/seller/notifikasi"}
        passHref
        legacyBehavior
        style={{ textDecoration: "none" }}
      >
        <IconButton>
          <StyledBadge badgeContent={1}>
            <BellIcon color="action" />
          </StyledBadge>
        </IconButton>
      </Link>
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
        {appBar.menuIcon === "default" && <MenuIcon />}
        {appBar.menuIcon === "dots" && <MenuDotsIcon />}
      </IconButton>
    </>
  );
}
