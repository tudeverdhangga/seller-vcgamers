import { ListItem, Switch, type TypographyProps } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { type MouseEventHandler } from "react";

import InstantMenu from "~/components/icons/feature/InstantMenu";
import KilatMenu from "~/components/icons/feature/KilatMenu";
import VIPMenu from "~/components/icons/feature/VIPMenu";

const activeProps: TypographyProps = {
  fontSize: 14,
  fontWeight: "700",
  color: "common.purple.500",
};

const defaultProps: TypographyProps = {
  fontSize: 14,
  fontWeight: "500",
  color: "common.shade.200",
};

export default function DrawerListSubItem({
  name,
  label,
  isActive = false,
  trailing,
  href,
  onClick
}: {
  name?: string;
  label: string;
  isActive?: boolean;
  trailing?: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const router = useRouter()

  const listSubItem = (
    <ListItemButton
      selected={isActive}
      onClick={onClick}
      component="a"
      sx={{
        pl: 6,
        py: 0,
        minHeight: 28,
        textDecoration: "none",
        bgcolor: isActive ? "primary.light" : "#FBFAFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {
        name === "instant"
          ? <InstantMenu />
          : name === "kilat"
            ? <KilatMenu />
            : name === "vip"
              ? <VIPMenu />
              : (
                <ListItemText
                  primary={label}
                  primaryTypographyProps={isActive ? activeProps : defaultProps}
                />
              )
      }
    </ListItemButton>
  );

  if (href) {
    return (
      <ListItem
        secondaryAction={
          name === "kilat"
           ? (
            <Switch
              onClick={() => console.log('asd')}
            />
           )
           : trailing
        }
        onClick={() => void router.push(href)}
        sx={{ p: 0 }}
      >
        {listSubItem}
      </ListItem>
    );
  }

  return listSubItem;
}
