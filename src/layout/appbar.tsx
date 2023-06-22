import { Box, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Badge, { type BadgeProps } from "@mui/material/Badge";
import { useTranslation } from "next-i18next";

import { useAtom } from "jotai";

import MenuIcon from "../components/icons/MenuIcon";
import IdFlagIcon from "../components/icons/IdFlagIcon";
import ChevronDownIcon from "../components/icons/ChevronDownIcon";
import BellIcon from "../components/icons/BellIcon";

import { drawerOpenAtom } from "~/atom";

import { DRAWER_WIDTH } from "./drawer";
import { useResponsive } from "~/utils/mediaQuery";

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
  const { t } = useTranslation("layout");

  return (
    <>
      <Typography variant="h6" component="div" sx={{ mr: 2 }}>
        {t("helpCenter")}
      </Typography>
      {/* TODO: make new component for languange select */}
      <Box component="div" sx={{ display: "flex", alignContent: "flex-end" }}>
        <IdFlagIcon />
        <Typography variant="h6" component="div">
          ID
        </Typography>
        <ChevronDownIcon />
      </Box>
      <Box component="div" sx={{ flexGrow: 1 }} />
      <IconButton>
        <StyledBadge badgeContent={1} color="secondary">
          <BellIcon color="action" />
        </StyledBadge>
      </IconButton>
    </>
  );
}
