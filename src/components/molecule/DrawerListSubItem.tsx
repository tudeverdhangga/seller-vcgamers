import { ListItem, type TypographyProps } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { type MouseEventHandler } from "react";

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

export default function DrawerListSubItem(props: {
  label?: string;
  isActive?: boolean;
  leading?: (props: any) => React.ReactNode;
  trailing?: (props: any) => React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const router = useRouter();

  const listSubItem = (
    <ListItemButton
      selected={props.isActive ?? false}
      onClick={props.onClick}
      component="a"
      sx={{
        pl: 6,
        py: 0,
        minHeight: 28,
        textDecoration: "none",
        bgcolor: props.isActive ? "primary.light" : "#FBFAFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {props.label ? (
        <ListItemText
          primary={props.label}
          primaryTypographyProps={props.isActive ? activeProps : defaultProps}
        />
      ) : null}
      {props.leading ? <props.leading /> : null}
    </ListItemButton>
  );

  if (props.href) {
    return (
      <ListItem
        secondaryAction={props.trailing ? <props.trailing /> : null}
        onClick={() => void router.push(props.href as string)}
        sx={{ p: 0 }}
      >
        {listSubItem}
      </ListItem>
    );
  }

  return listSubItem;
}
