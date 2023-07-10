/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import SentIcon from "~/components/icons/chat/SentIcon";
import ShopRatingIcon from "../icons/chat/ShopRatingIcon";
import SendingIcon from "../icons/chat/SendingIcon";
import FailedIcon from "../icons/chat/FailedIcon";
import { IconButton } from "@mui/material";
import RetryIcon from "../icons/chat/RetryIcon";

type SideProps =
  | {
      side: "left";
    }
  | {
      side: "right";
      status: "sent" | "sending" | "failed";
    };

type TextProps = {
  type: "text";
  content: string;
  time: string;
};

type ProductProps = {
  type: "product";
  content: {
    img: string;
    title: string;
    price: string;
    rating: string;
    sold: string;
  };
};

type AttachmentProps = {
  type: "attachment";
  content: string;
  time: string;
};

export default function ChatMessageListItem(
  props: (TextProps | ProductProps | AttachmentProps) & SideProps
) {
  switch (props.type) {
    case "text":
      return TextChatMessage(props);
    case "product":
      return ProductChatMessage(props);
    case "attachment":
      return AttachmentChatMessage(props);
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
          src={props.content.img}
          alt={props.content.title}
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
            {props.content.title}
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
