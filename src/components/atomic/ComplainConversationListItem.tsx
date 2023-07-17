import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import BadgeIcon from "../icons/BadgeIcon";

export default function ComplainConversationListItem(props: {
  complain: {
    id: string;
    name: string;
    transactionId: string;
    transactionName: string;
    complain: string;
    unread?: boolean;
    time: string;
    type: "completed" | "in-process";
  };
}) {
  return (
    <>
      <ListItem key={props.complain.id} disableGutters disablePadding>
        <Link
          href={`/seller/obrolan/komplain/${props.complain.id}`}
          passHref
          legacyBehavior
          style={{ textDecoration: "none" }}
        >
          <ListItemButton sx={{ display: "block" }} component="a">
            <Box
              sx={{ display: "flex", gap: "10px", p: { xs: 0, sm: "20px" } }}
            >
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
                    fontWeight: 700,
                    fontSize: 14,
                    color: "common.shade.700",
                  }}
                  noWrap
                >
                  {props.complain.name}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "baseline", gap: "2px" }}
                >
                  <Typography
                    maxWidth={200}
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "common.shade.200",
                    }}
                    noWrap
                  >
                    {props.complain.transactionId}
                  </Typography>
                  {props.complain.unread && (
                    <BadgeIcon
                      content={props.complain.unread}
                      sx={{ width: 7, height: 7 }}
                    />
                  )}
                </Box>
                <Typography
                  maxWidth={200}
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "common.purple.500",
                  }}
                  noWrap
                >
                  {props.complain.transactionName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "common.shade.200",
                  }}
                >
                  {props.complain.time}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                m: { xs: "10px 0px", sm: "10px 16px" },
                p: "10px",
                borderRadius: "10px",
                backgroundColor: "common.shade.50",
              }}
            >
              <Typography
                maxWidth={{ xs: 200, sm: 400 }}
                sx={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: "common.shade.200",
                }}
                noWrap
              >
                {props.complain.complain}
              </Typography>
            </Box>
          </ListItemButton>
        </Link>
      </ListItem>
      <Divider />
    </>
  );
}
