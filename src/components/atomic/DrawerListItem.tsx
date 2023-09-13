import { useTranslation } from "next-i18next";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";

import DrawerListSubItem from "~/components/molecule/DrawerListSubItem";
import { useResponsive } from "~/utils/mediaQuery";

export default function DrawerListItem(props: {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  sx?: SxProps<Theme>;
  name: string;
  title: string;
  href?: string;
  subList: {
    name: string;
    label?: string;
    href: string;
    leading?: (props: any) => React.ReactNode;
    trailing?: (props: any) => React.ReactNode;
  }[];
  activeMenu: string;
}) {
  const { t } = useTranslation("layout");
  const { isMobile } = useResponsive();

  return (
    <ListItem
      component="div"
      sx={{
        minHeight: 56,
        display: "block",
        padding: 0,
        ...props.sx,
      }}
    >
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 2,
        }}
      >
        {props.leading}
        <ListItemText
          primary={props.title}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "bold",
            color: "primary",
          }}
          sx={{
            ml: props.leading ? 1 : 0,
            mr: props.trailing ? 1 : 0,
            display: "flex",
          }}
        />
        {props.trailing}
      </List>

      <List component="div" disablePadding>
        {props.subList.map((list) => {
          if (
            isMobile &&
            (list.name === "addProduct" || list.name === "bulkEdit")
          ) {
            return null;
          }
          return (
            <DrawerListSubItem
              key={`menu-${list.name}`}
              label={t(list.label as "drawer.myShop.dashboard")}
              href={list.href}
              isActive={list.href === props.activeMenu}
              leading={list.leading}
              trailing={list.trailing}
            />
          );
        })}
      </List>
    </ListItem>
  );
}
