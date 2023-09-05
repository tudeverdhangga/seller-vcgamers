import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "next-i18next";

export default function APIFeatureSidebarMenu(props: {
  position: number;
  setPosition: (value: number) => void;
}) {
  const { t } = useTranslation("vip");

  return (
    <Box
      sx={{
        height: "100px",
        bgcolor: "background.paper",
        borderRadius: "10px",
      }}
    >
      <List
        component="aside"
        aria-label="sidebar"
        disablePadding
        sx={{ borderRadius: "10px" }}
      >
        <ListItemButton
          selected={props.position === 0}
          onClick={() => props.setPosition(0)}
          sx={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <ListItemText
            primary={t("contentApi.whitelist.tab")}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 700,
              color: props.position === 0 ? "primary.main" : "common.shade.200",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={props.position === 1}
          onClick={() => props.setPosition(1)}
          sx={{
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <ListItemText
            primary={t("contentApi.accessKey.tab")}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 700,
              color: props.position === 1 ? "primary.main" : "common.shade.200",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={props.position === 2}
          onClick={() => props.setPosition(2)}
          sx={{
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <ListItemText
            primary={t("contentApi.webhook.tab")}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 700,
              color: props.position === 2 ? "primary.main" : "common.shade.200",
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
