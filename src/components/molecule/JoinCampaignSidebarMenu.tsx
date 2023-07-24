import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "next-i18next";

export default function JoinCampaignSidebarMenu(props: {
  position: number;
  setPosition: (value: number) => void;
}) {
  const { t } = useTranslation("joinCampaign");

  return (
    <Box
      sx={{
        width: "20%",
        height: "90px",
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
            primary={t("menu.list")}
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
            primary={t("menu.history")}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 700,
              color: props.position === 1 ? "primary.main" : "common.shade.200",
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
