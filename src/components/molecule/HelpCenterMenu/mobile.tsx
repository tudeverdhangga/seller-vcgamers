import { useState } from "react";

import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useTranslation } from "next-i18next";

import EmailIcon from "../../icons/svg/helpCenter/emailIcon.svg";
import FAQIcon from "../../icons/svg/helpCenter/helpCircleIcon.svg";
import WhatsAppIcon from "../../icons/svg/helpCenter/whatsappIcon.svg";
import DrawerListSubItem from "../DrawerListSubItem";

import { env } from "~/env.mjs";

export default function HelpCenterMenu() {
  const { t } = useTranslation("layout");

  const [open, setOpen] = useState(false);

  return (
    <>
      <DrawerListSubItem
        label={t("drawer.other.helpCenter")}
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

  const faqLink = env.NEXT_PUBLIC_SUPPORT_FAQ_LINK;
  const whatsappLink = env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LINK;
  const emailLink = env.NEXT_PUBLIC_SUPPORT_EMAIL_LINK;

  const menus = [
    { label: "helpCenterMenu.faq" as const, icon: <FAQIcon />, link: faqLink },
    {
      label: "helpCenterMenu.email" as const,
      icon: <WhatsAppIcon />,
      link: emailLink,
    },
    {
      label: "helpCenterMenu.whatsapp" as const,
      icon: <EmailIcon />,
      link: whatsappLink,
    },
  ];

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <List sx={{ pt: 0 }}>
        {menus.map((menu) => (
          <Link
            key={menu.label}
            href={menu.link}
            passHref
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <ListItem disableGutters>
              <ListItemButton key={menu.label} onClick={handleClose}>
                <ListItemIcon style={{ minWidth: "30px" }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={t(menu.label)} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Dialog>
  );
}
