import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { notificationDetailAtom } from "~/atom/notificationDetail";
import { useReadNotification } from "~/services/notification/hooks";
import type { DataNotification } from "~/services/notification/types";
import NotificationUpdateIcon from "../icons/NotificationUpdateIcon";
import TimeIcon from "../icons/svg/notification/time.svg";

export default function NotificationCard(props: {
  notification: DataNotification;
}) {
  const { t } = useTranslation("notification");
  const [, setNotificationDetail] = useAtom(notificationDetailAtom);
  const { mutate } = useReadNotification();

  const handleClick = () => {
    mutate(
      { notification_id: props.notification.id, flag: props.notification.flag },
      {
        onSettled: () => {
          setNotificationDetail({
            isOpen: true,
            notification: props.notification,
          });
        },
      }
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          flex: "1 0 0",
        }}
      >
        <NotificationIcon notification={props.notification} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
            flex: "1 0 0",
          }}
        >
          <Typography
            sx={{
              alignSelf: "stretch",
              color: "common.shade.200",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {props.notification.title}
          </Typography>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "60rem",
            }}
          >
            <Typography
              noWrap
              sx={{
                color: "common.shade.200",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {props.notification.description}
            </Typography>
          </div>
          {props.notification.flag === "update" && (
            <Button
              sx={{
                color: "primary.main",
                fontSize: 14,
                fontWeight: 500,
                textTransform: "none",
                p: 0,
              }}
              onClick={handleClick}
            >
              {t("readMore")}
            </Button>
          )}
          <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <TimeIcon />
            <Typography
              sx={{
                color: "common.shade.100",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {props.notification.desc_date}
            </Typography>
          </Box>
        </Box>
      </Box>
      {!props.notification.is_read && (
        <Box
          sx={{
            backgroundColor: "common.red.500",
            borderRadius: "50%",
            width: 10,
            height: 10,
          }}
        />
      )}
    </Box>
  );
}

function NotificationIcon(props: { notification: DataNotification }) {
  if (props.notification.flag === "update") {
    return <NotificationUpdateIcon />;
  }

  if (props.notification.flag === "marketplace") {
    switch (props.notification.clickable_type) {
      case "Moderation":
        return <div></div>;
    }
  }
}
