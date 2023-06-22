import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import Link from "next/link";

export default function DrawerListItem(props: {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  sx?: SxProps<Theme>;
  title: string;
  href?: string;
}) {
  const listItem = (
    <ListItemButton
      disableTouchRipple={typeof props.href === "undefined"}
      component="a"
      sx={{ minHeight: 56, ...props.sx }}
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
        }}
      />
      {props.trailing}
    </ListItemButton>
  );

  if (props.href) {
    return (
      <Link href={props.href} passHref legacyBehavior>
        {listItem}
      </Link>
    );
  }

  return listItem;
}
