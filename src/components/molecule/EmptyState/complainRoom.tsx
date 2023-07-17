import { useTranslation } from "next-i18next";

import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import EmptyStateIcon from "~/components/icons/EmptyStateIcon/chatRoom";
import Box from "@mui/material/Box";

export default function EmptyState() {
  const { t } = useTranslation("complain");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Toolbar />
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F5F5F5",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "40px 0px",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <EmptyStateIcon />
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: "common.shade.200",
                textAlign: "center",
              }}
            >
              {t("emptyState.complainRoom.title")}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#9AA4BF",
                textAlign: "center",
              }}
            >
              {t("emptyState.complainRoom.subtitle")}
            </Typography>
          </div>
        </div>
      </Box>
    </Box>
  );
}
