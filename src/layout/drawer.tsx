import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import { useAtom } from "jotai";

import { drawerOpenAtom } from "~/atom";

import { useResponsive } from "~/utils/mediaQuery";

import DrawerContent from "~/components/organism/DrawerContent/index";
import KilatDrawerDialog from "~/components/molecule/KilatDrawerDialog";

export const DRAWER_WIDTH = 270;

export function Drawer() {
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  const { isDesktop } = useResponsive();

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="folders"
    >
      {isDesktop ? (
        <MuiDrawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <DrawerContent />
        </MuiDrawer>
      ) : (
        <MuiDrawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          <DrawerContent />
        </MuiDrawer>
      )}
      <KilatDrawerDialog />
    </Box>
  );
}
