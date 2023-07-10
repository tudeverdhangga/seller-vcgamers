import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ChatProfilePicture from "./ChatProfilePicture";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BadgeIcon from "../icons/BadgeIcon";
import Link from "next/link";

export default function ChatConversationListItem(props: {
  id: string;
  name: string;
  text: string;
  unread?: number;
  time: string;
}) {
  return (
    <>
      <ListItem key={props.id} disableGutters disablePadding>
        <Link
          href={`/seller/obrolan/percakapan/${props.id}`}
          passHref
          legacyBehavior
          style={{ textDecoration: "none" }}
        >
          <ListItemButton
            sx={{ display: "flex", gap: "10px", p: "20px" }}
            component="a"
          >
            <ChatProfilePicture />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px",
                flex: "1 0 0",
              }}
            >
              <Typography
                maxWidth={200}
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "common.shade.700",
                }}
                noWrap
              >
                {props.name}
              </Typography>
              <Typography
                maxWidth={200}
                sx={{
                  fontSize: 14,
                  color: "common.shade.200",
                }}
                noWrap
              >
                {props.text}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "7px",
                justifyContent: "end",
                alignItems: "end",
                height: 48,
              }}
            >
              {props.unread && <BadgeIcon content={props.unread} />}
              <Typography
                sx={{
                  fontSize: 14,
                  color: "common.shade.200",
                }}
              >
                {props.time}
              </Typography>
            </Box>
          </ListItemButton>
        </Link>
      </ListItem>
      <Divider />
    </>
  );
}
