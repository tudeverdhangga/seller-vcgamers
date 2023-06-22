import { type MouseEventHandler } from "react";
import Link from "next/link";
import { type TypographyProps } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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
  title,
  isActive = false,
  trailing,
  href,
  onClick,
}: {
  title: string;
  isActive?: boolean;
  trailing?: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const listSubItem = (
    <ListItemButton
      onClick={onClick}
      component="a"
      sx={{
        pl: 6,
        py: 0,
        minHeight: 28,
        textDecoration: "none",
        bgcolor: isActive ? "primary.light" : "#FBFAFF",
      }}
    >
      <ListItemText
        primary={title}
        primaryTypographyProps={isActive ? activeProps : defaultProps}
      />
      {trailing}
    </ListItemButton>
  );

  if (href) {
    return (
      <Link
        href={href}
        passHref
        legacyBehavior
        style={{ textDecoration: "none" }}
      >
        {listSubItem}
      </Link>
    );
  }

  return listSubItem;
}
