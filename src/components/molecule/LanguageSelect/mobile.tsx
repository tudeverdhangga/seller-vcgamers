import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useTranslation } from "next-i18next";

import { setLangCookie } from "~/utils/cookies";
import { languages } from "./common";
import DrawerListSubItem from "../DrawerListSubItem";

export default function LanguageSelect() {
  const { t } = useTranslation("layout");

  const [open, setOpen] = useState(false);

  const handleClose = (value: string) => {
    setLangCookie(value);
    setOpen(false);
  };

  return (
    <>
      <DrawerListSubItem
        title={t("drawer.other.language")}
        onClick={() => setOpen(true)}
      />
      <SimpleDialog open={open} onClose={handleClose} />
    </>
  );
}

function SimpleDialog(props: {
  open: boolean;
  onClose: (value: string) => void;
}) {
  const { onClose, open } = props;

  const handleClose = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <List sx={{ pt: 0 }}>
        {languages.map((language) => (
          <ListItem key={language.label} disableGutters>
            <ListItemButton
              key={language.label}
              onClick={() => handleClose(language.value)}
            >
              <ListItemIcon style={{ minWidth: "30px" }}>
                <language.icon />
              </ListItemIcon>
              <ListItemText primary={language.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
