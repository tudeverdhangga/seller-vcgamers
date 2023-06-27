import { Box, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Badge, { type BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useAtom } from "jotai";

import BellIcon from "../components/icons/BellIcon";
import MenuIcon from "../components/icons/MenuIcon";

import { drawerOpenAtom } from "~/atom";

import HelpCenterMenu from "~/components/molecule/HelpCenterMenu/desktop";
import LanguageSelect from "~/components/molecule/LanguageSelect/desktop";
import { useResponsive } from "~/utils/mediaQuery";
import { DRAWER_WIDTH } from "./drawer";

export function AppBar() {
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

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
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { sm: "none" } }}
        >
          Dashboard Toko
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 13,
    padding: "0 4px",
  },
}));

function DesktopAppBar() {
  return (
    <>
      <HelpCenterMenu />
      <LanguageSelect />
      <Box component="div" sx={{ flexGrow: 1 }} />
      <IconButton>
        <StyledBadge badgeContent={1} color="secondary">
          <BellIcon color="action" />
        </StyledBadge>
      </IconButton>
    </>
  );
}
