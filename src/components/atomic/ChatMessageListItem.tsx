/* eslint-disable @next/next/no-img-element */
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import SentIcon from "~/components/icons/chat/SentIcon";
import ComplainAdminMessageListItem from "~/components/atomic/ComplainAdminMessageListItem";
import type {
  AttachmentProps,
  ChatMessageProps,
  InfoProps,
  ProductProps,
  SideProps,
  TextProps,
  TransactionProps,
} from "~/services/moderation/types";
import FailedIcon from "../icons/chat/FailedIcon";
import RetryIcon from "../icons/chat/RetryIcon";
import SendingIcon from "../icons/chat/SendingIcon";
import ShopRatingIcon from "../icons/chat/ShopRatingIcon";
import { env } from "~/env.mjs";
import Link from "next/link";
import VGChip from "./VGChip";

export default function ChatMessageListItem(props: ChatMessageProps) {
  switch (props.type) {
    case "TEXT":
      if (props.side === "admin") {
        return ComplainAdminMessageListItem({ ...props, side: "left" });
      }
      return TextChatMessage(props);
    case "PRODUCT":
      return ProductChatMessage(props);
    case "TRANSACTION":
      return TransactionChatMessage(props);
    case "VIDEO":
    case "IMAGE":
    case "DOCUMENT":
      return AttachmentChatMessage(props);
    case "INFO":
      return InfoChatMessage(props);
    default:
      return <></>;
  }
}

function TextChatMessage(props: TextProps & SideProps) {
  const justifyContent = props.side === "left" ? "flex-start" : "flex-end";
  const backgroundColor =
    props.side === "left" ? "common.shade.0" : "primary.light";
  const fontColor = props.side === "left" ? "common.shade.200" : "primary.main";
  const borderRadius =
    props.side === "left" ? "0px 10px 10px 10px" : "10px 0px 10px 10px";

  const statusIcon = props.side === "right" && statusMap[props.status];
  const isFailed = props.side === "right" && props.status === "failed";

  return (
    <ListItem sx={{ justifyContent }} disableGutters>
      {isFailed && (
        <IconButton>
          <RetryIcon />
        </IconButton>
      )}
      <Box
        sx={{
          display: "flex",
          borderRadius,
          backgroundColor,
          maxWidth: { xs: "75%", sm: "50%" },
          p: "10px",
          gap: "5px",
          alignItems: "flex-end",
        }}
      >
        <Typography sx={{ color: fontColor, fontSize: 14, fontWeight: 500 }}>
          {props.content}
        </Typography>
        {statusIcon}
        <Typography
          sx={{ color: "common.shade.100", fontSize: 12, fontWeight: 500 }}
        >
          {props.time}
        </Typography>
      </Box>
    </ListItem>
  );
}

function ProductChatMessage(props: ProductProps & SideProps) {
  const justifyContent = props.side === "left" ? "flex-start" : "flex-end";
  const backgroundColor =
    props.side === "left" ? "common.shade.0" : "primary.light";

  const isFailed = props.side === "right" && props.status === "failed";

  return (
    <ListItem sx={{ justifyContent }} disableGutters>
      {isFailed && (
        <IconButton>
          <RetryIcon />
        </IconButton>
      )}
      <Link
        href={`${env.NEXT_PUBLIC_MARKET_URL}/${props.content.slug}`}
        passHref
        legacyBehavior
        style={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            display: "flex",
            borderRadius: "5px",
            backgroundColor,
            maxWidth: { xs: "75%", sm: "50%" },
            p: "10px",
            gap: "10px",
            alignItems: "flex-end",
          }}
        >
          <Image
            src={props.content.image}
            alt={props.content.name}
            width={60}
            height={60}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "common.shade.700",
                fontSize: 14,
                fontWeight: 700,
                mb: "2px",
              }}
            >
              {props.content.name}
            </Typography>
            <Typography
              sx={{
                color: "primary.main",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {props.content.price}
            </Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={0.5}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
                <ShopRatingIcon sx={{ width: 12, height: 12, mt: "2px" }} />
                <Typography
                  sx={{
                    color: "common.shade.100",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {props.content.rating}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "common.shade.100",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Terjual {props.content.sold}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Link>
    </ListItem>
  );
}

function TransactionChatMessage(props: TransactionProps & SideProps) {
  const justifyContent = props.side === "left" ? "flex-start" : "flex-end";
  const backgroundColor =
    props.side === "left" ? "common.shade.0" : "primary.light";

  const isFailed = props.side === "right" && props.status === "failed";

  return (
    <ListItem sx={{ justifyContent }} disableGutters>
      {isFailed && (
        <IconButton>
          <RetryIcon />
        </IconButton>
      )}
      <Link
        href={`/seller/toko/daftar-penjualan/detail?transaction_id=${props.content.code}`}
        passHref
        legacyBehavior
        style={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            display: "flex",
            borderRadius: "5px",
            backgroundColor,
            maxWidth: { xs: "75%", sm: "50%" },
            p: "10px",
            gap: "10px",
            alignItems: "flex-end",
          }}
        >
          <Image
            src={props.content.image}
            alt={props.content.transaction_code}
            width={60}
            height={60}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <VGChip
              label={props.content.status}
              sx={{ backgroundColor: "#BFE9F6", color: "#024357" }}
            />
            <Typography
              sx={{
                color: "common.shade.700",
                fontSize: { sm: 14, xs: 12 },
                fontWeight: 700,
                mt: "10px",
              }}
            >
              {props.content.transaction_code}
            </Typography>
          </Box>
        </Box>
      </Link>
    </ListItem>
  );
}

function AttachmentChatMessage(props: AttachmentProps & SideProps) {
  const justifyContent = props.side === "left" ? "flex-start" : "flex-end";
  const backgroundColor =
    props.side === "left" ? "common.shade.0" : "primary.light";
  const borderRadius =
    props.side === "left" ? "0px 10px 10px 10px" : "10px 0px 10px 10px";

  const statusIcon = props.side === "right" && statusMap[props.status];
  const isFailed = props.side === "right" && props.status === "failed";

  return (
    <ListItem sx={{ justifyContent }} disableGutters>
      {isFailed && (
        <IconButton>
          <RetryIcon />
        </IconButton>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius,
          backgroundColor,
          maxWidth: { xs: "100%", sm: "50%" },
          p: "10px",
          gap: "5px",
          alignItems: "flex-end",
        }}
      >
        <img src={props.content} alt="Attachment" />
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {statusIcon}
          <Typography
            sx={{ color: "common.shade.100", fontSize: 12, fontWeight: 500 }}
          >
            {props.time}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}

const statusMap = {
  sent: <SentIcon sx={{ width: "14px" }} />,
  sending: <SendingIcon sx={{ height: "12px", width: "12px", mb: "4px" }} />,
  failed: <FailedIcon sx={{ height: "12px", width: "12px", mb: "4px" }} />,
};

function InfoChatMessage(props: InfoProps) {
  return (
    <ListSubheader sx={{ backgroundColor: "transparent" }}>
      <Typography
        sx={{
          color: "common.purple.500",
          fontSize: 12,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {props.content}
      </Typography>
    </ListSubheader>
  );
}
