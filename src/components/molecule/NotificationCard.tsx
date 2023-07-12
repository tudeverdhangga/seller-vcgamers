import { useTranslation } from "next-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import TimeIcon from "../icons/svg/notification/time.svg";

export default function NotificationCard(props: {
  title?: string;
  subtitle?: string;
  time?: string;
  unread?: boolean;
  onClick?: () => void;
  icon: JSX.Element;
}) {
  const { t } = useTranslation("notification");

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
        {props.icon}
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
            {props.title}
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
              {props.subtitle}
            </Typography>
          </div>
          {props.onClick && (
            <Button
              sx={{
                color: "primary.main",
                fontSize: 14,
                fontWeight: 500,
                textTransform: "none",
                p: 0,
              }}
              onClick={props.onClick}
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
              {props.time}
            </Typography>
          </Box>
        </Box>
      </Box>
      {props.unread && (
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
