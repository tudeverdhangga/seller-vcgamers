import * as React from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useTranslation } from "next-i18next";

import FAQIcon from "../../icons/svg/helpCenter/helpCircleIcon.svg";
import WhatsAppIcon from "../../icons/svg/helpCenter/whatsappIcon.svg";
import EmailIcon from "../../icons/svg/helpCenter/emailIcon.svg";

export default function HelpCenterMenu() {
  const { t } = useTranslation("layout");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menus = [
    { label: "helpCenterMenu.faq" as const, icon: <FAQIcon /> },
    { label: "helpCenterMenu.email" as const, icon: <WhatsAppIcon /> },
    { label: "helpCenterMenu.whatsapp" as const, icon: <EmailIcon /> },
  ];

  return (
    <div>
      <HelpCenterButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          {t("helpCenter")}
        </Typography>
      </HelpCenterButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menus.map((menu) => (
          <MenuItem
            key={menu.label}
            onClick={handleClose}
            sx={{ display: "flex", gap: "6px", width: "180px" }}
          >
            {menu.icon}
            {t(menu.label)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const HelpCenterButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.shade[0],
  fontFamily: theme.typography.fontFamily,
  textTransform: "none",
}));
