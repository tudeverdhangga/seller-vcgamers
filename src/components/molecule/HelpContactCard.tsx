import Link from "next/link";
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
import ChatIcon from "../icons/svg/chatIcon.svg";
import CopyIcon from "../icons/svg/copyIcon.svg";
import MailIcon from "../icons/svg/mailIcon.svg";
import WhatsappIcon from "../icons/svg/whatsappIcon.svg";
import SuggestionBoxDialog from "./SuggestionBoxDialog";
import DashboardHelpContactHelpToolTip from "./DashboardHelpCenterHelpToolTip";

import { suggestionBoxOpenAtom } from "~/atom/suggestionBox";
import { env } from "~/env.mjs";

export default function HelpContactCard() {
  const { t } = useTranslation("dashboard");

  const [, setOpen] = useAtom(suggestionBoxOpenAtom);

  const whatsappLink = env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LINK;
  const emailLink = env.NEXT_PUBLIC_SUPPORT_EMAIL_LINK;

  const clickCopyWhatsapp = async () => {
    await navigator.clipboard.writeText(env.NEXT_PUBLIC_SUPPORT_WHATSAPP);
    return;
  };

  const clickCopyEmail = async () => {
    await navigator.clipboard.writeText(env.NEXT_PUBLIC_SUPPORT_EMAIL);
    return;
  };

  return (
    <Grid container spacing={{ sm: "20px", xs: "10px" }}>
      <Grid xs={12} sm={8}>
        <DashboardCard
          title={t("card.helpContact.title")}
          titleTrailing={<DashboardHelpContactHelpToolTip />}
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
                  <IconButton
                    edge="end"
                    aria-label="copy"
                    onClick={() => void clickCopyWhatsapp()}
                  >
                    <CopyIcon />
                  </IconButton>
                  <Link
                    href={whatsappLink}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton aria-label="whatsapp">
                      <WhatsappIcon />
                    </IconButton>
                  </Link>
                </div>
              }
            >
              <ListItemText
                primary={t("card.helpContact.body.phoneNum")}
                sx={{ fontSize: { sm: 14, xs: 12 } }}
              />
            </ListItem>
            <Divider />
            <ListItem
              disableGutters
              secondaryAction={
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <IconButton
                    edge="end"
                    aria-label="copy"
                    onClick={() => void clickCopyEmail()}
                  >
                    <CopyIcon />
                  </IconButton>
                  <Link
                    href={emailLink}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton aria-label="mail">
                      <MailIcon />
                    </IconButton>
                  </Link>
                </div>
              }
            >
              <ListItemText
                primary={t("card.helpContact.body.email")}
                sx={{ fontSize: { sm: 14, xs: 12 } }}
              />
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
