import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { performanceDialogOpenAtom } from "~/atom/managePromo";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";

export default function PromoRejectedDialog() {
  const { t } = useTranslation("managePromo");
  const [modalOpen, setModalOpen] = useAtom(performanceDialogOpenAtom);

  const performanceList = [
    {
      title: t("dialog.performance.totalUsage.title"),
      subtitle: t("dialog.performance.totalUsage.subtitle"),
      content: t("dialog.performance.content", { value: 0 }),
    },
    {
      title: t("dialog.performance.gross.title"),
      subtitle: t("dialog.performance.gross.subtitle"),
      content: "Rp0",
    },
    {
      title: t("dialog.performance.net.title"),
      subtitle: t("dialog.performance.net.subtitle"),
      content: t("dialog.performance.content", { value: 0 }),
    },
    {
      title: t("dialog.performance.fee.title"),
      subtitle: t("dialog.performance.fee.subtitle"),
      content: "Rp0",
    },
    {
      title: t("dialog.performance.discount.title"),
      subtitle: t("dialog.performance.discount.subtitle"),
      content: "Rp0",
    },
    {
      title: t("dialog.performance.checkoutWithPromo.title"),
      subtitle: t("dialog.performance.checkoutWithPromo.subtitle"),
      content: "Rp0",
    },
  ];

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
          p: "10px !important",
        }}
      >
        <p style={{ marginBottom: "0px" }}>{t("dialog.performance.title")}</p>
        <IconButton
          onClick={() => setModalOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{ px: 3, display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Box
          sx={{
            p: "20px",
            borderRadius: "10px",
            backgroundColor: "common.purple.0",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            sx={{ color: "common.shade.200", fontSize: 14, fontWeight: 700 }}
          >
            {t("dialog.performance.name")}
          </Typography>
          <Typography
            sx={{ color: "common.shade.200", fontSize: 14, fontWeight: 500 }}
          >
            Nama Promo tampil disini
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {performanceList.map((p, i) => (
            <PerformanceCard
              key={i}
              title={p.title}
              subtitle={p.subtitle}
              content={p.content}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "end", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          onClick={() => setModalOpen(false)}
          color="primary"
          sx={{ width: "30%" }}
        >
          {t("btn.close")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}

function PerformanceCard(props: {
  title: string;
  subtitle: string;
  content: string;
}) {
  return (
    <Card
      sx={{
        boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
        p: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "12px",
      }}
    >
      <Typography sx={{ color: "#9AA4B6", fontSize: 14, fontWeight: 700 }}>
        {props.title}
      </Typography>
      <Typography sx={{ color: "#9AA4B6", fontSize: 12, fontWeight: 600 }}>
        {props.subtitle}
      </Typography>
      <Typography
        sx={{ color: "common.purple.500", fontSize: 16, fontWeight: 700 }}
      >
        {props.content}
      </Typography>
    </Card>
  );
}
