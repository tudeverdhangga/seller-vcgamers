import { useAtom } from "jotai";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2";

import { useTranslation } from "next-i18next";

import DashboardCard from "../atomic/DashboardCard";
import HelpToolTip from "../atomic/HelpToolTip";
import ChatIcon from "../icons/svg/chatIcon.svg";
import CopyIcon from "../icons/svg/copyIcon.svg";
import MailIcon from "../icons/svg/mailIcon.svg";
import WhatsappIcon from "../icons/svg/whatsappIcon.svg";
import SuggestionBoxDialog from "./SuggestionBoxDialog";

import { suggestionBoxOpenAtom } from "~/atom/suggestionBox";

export default function HelpContactCard() {
  const { t } = useTranslation("dashboard");

  const [, setOpen] = useAtom(suggestionBoxOpenAtom);

  return (
    <Grid container spacing="20px">
      <Grid xs={12} sm={8}>
        <DashboardCard
          title={t("card.helpContact.title")}
          titleTrailing={<HelpToolTip title={t("tooltip.helpContact")} />}
        >
          <List
            disablePadding
            dense
            sx={{
              width: "100%",
              listStyleType: "disc",
              pl: 2,
              "& .MuiListItem-root": {
                display: "list-item",
              },
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            <ListItem
              disableGutters
              secondaryAction={
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <IconButton edge="end" aria-label="delete">
                    <CopyIcon />
                  </IconButton>
                  <IconButton aria-label="copy">
                    <WhatsappIcon />
                  </IconButton>
                </div>
              }
            >
              <ListItemText primary={t("card.helpContact.body.phoneNum")} />
            </ListItem>
            <Divider />
            <ListItem
              disableGutters
              secondaryAction={
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <IconButton edge="end" aria-label="copy">
                    <CopyIcon />
                  </IconButton>
                  <IconButton aria-label="copy">
                    <MailIcon />
                  </IconButton>
                </div>
              }
            >
              <ListItemText primary={t("card.helpContact.body.email")} />
            </ListItem>
          </List>
        </DashboardCard>
      </Grid>
      <Grid xs={12} sm={4}>
        <DashboardCard title={t("card.feedback.title")}>
          <Button
            variant="outlined"
            sx={{
              px: "10px",
              py: "21px",
              alignSelf: "stretch",
              borderRadius: "10px",
              border: "1px solid",
              borderColor: "primary.light",
            }}
            onClick={() => setOpen(true)}
          >
            <ChatIcon />
          </Button>
          <SuggestionBoxDialog />
        </DashboardCard>
      </Grid>
    </Grid>
  );
}
