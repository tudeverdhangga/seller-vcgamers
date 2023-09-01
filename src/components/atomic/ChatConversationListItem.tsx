import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ChatProfilePicture from "./ChatProfilePicture";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BadgeIcon from "../icons/BadgeIcon";
import Link from "next/link";
import { type DataChatRoom } from "~/services/chat/types";
import { dateToTime } from "~/utils/format";
import { useChatReadMessage } from "~/services/chat/hooks";

export default function ChatConversationListItem(props: {
  chat: DataChatRoom;
}) {
  const mutation = useChatReadMessage();

  return (
    <>
      <ListItem
        disableGutters
        disablePadding
        onClick={() =>
          mutation.mutate({ room_id: props.chat.id, requester: "SELLER" })
        }
      >
        <Link
          href={`/seller/obrolan/percakapan/${props.chat.id}`}
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
                {props.chat.name}
              </Typography>
              <Typography
                maxWidth={200}
                sx={{
                  fontSize: 14,
                  color: "common.shade.200",
                }}
                noWrap
              >
                {props.chat.thumbnail_message}
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
              {props.chat.unread_count && (
                <BadgeIcon content={props.chat.unread_count} />
              )}
              <Typography
                sx={{
                  fontSize: 14,
                  color: "common.shade.200",
                }}
              >
                {dateToTime(props.chat.last_message_date)}
              </Typography>
            </Box>
          </ListItemButton>
        </Link>
      </ListItem>
      <Divider />
    </>
  );
}
