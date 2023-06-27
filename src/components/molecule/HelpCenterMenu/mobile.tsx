import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useTranslation } from "next-i18next";

import DrawerListSubItem from "~/components/atomic/DrawerListSubItem";
import EmailIcon from "../../icons/svg/helpCenter/emailIcon.svg";
import FAQIcon from "../../icons/svg/helpCenter/helpCircleIcon.svg";
import WhatsAppIcon from "../../icons/svg/helpCenter/whatsAppIcon.svg";

export default function HelpCenterMenu() {
  const { t } = useTranslation("layout");

  const [open, setOpen] = useState(false);

  return (
    <>
      <DrawerListSubItem
        title={t("drawer.other.helpCenter")}
        onClick={() => setOpen(true)}
      />
      <SimpleDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function SimpleDialog(props: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation("layout");

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const menus = [
    { label: "helpCenterMenu.faq" as const, icon: <FAQIcon /> },
    { label: "helpCenterMenu.email" as const, icon: <WhatsAppIcon /> },
    { label: "helpCenterMenu.whatsapp" as const, icon: <EmailIcon /> },
  ];

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <List sx={{ pt: 0 }}>
        {menus.map((menu) => (
          <ListItem key={menu.label} disableGutters>
            <ListItemButton key={menu.label} onClick={handleClose}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={t(menu.label)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
