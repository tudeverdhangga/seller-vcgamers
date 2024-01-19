import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { notificationDetailAtom } from "~/atom/notificationDetail";
import { useReadNotification } from "~/services/notification/hooks";
import type { DataNotification } from "~/services/notification/types";
import NotificationUpdateIcon from "../icons/NotificationUpdateIcon";
import TimeIcon from "../icons/svg/notification/time.svg";
import WalletIcon from "../icons/svg/notification/wallet.svg";
import BlueCartIcon from "../icons/svg/notification/blueCart.svg";
import TagIcon from "../icons/svg/notification/tag.svg";
import TickIcon from "../icons/svg/notification/tick.svg";
import AlertIcon from "../icons/svg/notification/alert.svg";
import InstantIcon from "../icons/svg/notification/instant.svg";
import ProsesKilatIcon from "../icons/svg/notification/prosesKilat.svg";
import VipIcon from "../icons/svg/notification/vip.svg";

export default function NotificationCard(props: {
  notification: DataNotification;
}) {
  const { t } = useTranslation("notification");
  const [, setNotificationDetail] = useAtom(notificationDetailAtom);
  const { mutate } = useReadNotification();
  const router = useRouter();

  const handleClick = () => {
    mutate({
      notification_id: props.notification.id,
      flag: props.notification.flag,
    });

    setNotificationDetail({
      isOpen: true,
      notification: props.notification,
    });
  };

  const handleClickable = () => {
    mutate(
      { notification_id: props.notification.id, flag: props.notification.flag },
      {
        onSettled: () => {
          switch (props.notification.clickable_type) {
            case "Moderation":
              return void router.push(
                "/seller/obrolan/komplain/" + props.notification.clickable_id
              );
            case "Chat":
              return void router.push(
                "/seller/obrolan/percakapan/" + props.notification.clickable_id
              );
            case "Withdraw":
              return void router.push("/seller/toko/saldo-toko");
            case "Instant_kilat":
              return void router.push("/seller/request/instant");
            case "Transaction":
              return void router.push(
                `/seller/toko/daftar-penjualan/detail?transaction_id=${props.notification.transaction_id}`
              );
            default:
              return;
          }
        },
      }
    );
  };

  const date = dayjs(props.notification.date);
  const dateFormat =
    Math.abs(date.diff(dayjs(), "s")) < 1
      ? "Baru saja"
      : date.format("DD MMM YYYY, HH:mm");

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", p: 2, width: "100%" }}
      {...(props.notification.is_clickable && {
        onClick: handleClickable,
        style: { cursor: "pointer" },
      })}
    >
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
              {dateFormat}
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
    switch (props.notification.icon) {
      case "withdraw":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <WalletIcon />
          </SvgIcon>
        );
      case "transaction payment":
      case "transaction order":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <TagIcon />
          </SvgIcon>
        );
      case "transaction order finish":
      case "review":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <BlueCartIcon />
          </SvgIcon>
        );
      case "transaction order issue":
      case "complain submission":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <AlertIcon />
          </SvgIcon>
        );
      case "instant":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <InstantIcon />
          </SvgIcon>
        );
      case "kilat":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <ProsesKilatIcon />
          </SvgIcon>
        );
      case "vip":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <VipIcon />
          </SvgIcon>
        );
      case "complain finish":
        return (
          <SvgIcon viewBox="0 0 24 24">
            <TickIcon />
          </SvgIcon>
        );
    }
  }
}
