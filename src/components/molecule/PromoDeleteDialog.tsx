import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";
import { deleteDialogAtom } from "~/atom/managePromo";
import { toastOption } from "~/utils/toast";
import VGButton from "../atomic/VGButton";
import CloseIcon from "../icons/chat/CloseIcon";
import {
  useDeletePromo,
  useGetPromoDetail,
} from "~/services/managePromo/hooks";

export default function PromoDeleteDialog() {
  const { t } = useTranslation("managePromo");
  const [modal, setModal] = useAtom(deleteDialogAtom);
  const deletePromoMutation = useDeletePromo();
  const { data } = useGetPromoDetail(modal.promoId, modal.isOpen);

  const handleClose = () => setModal({ isOpen: false });

  return (
    <Dialog
      open={modal.isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
          py: "10px",
          mt: "30px",
        }}
      >
        <Image
          src="/assets/warning-icon.svg"
          width={75}
          height={69.35}
          alt="Warning Icon"
        />
        <p style={{ marginBottom: "0px" }}>{t("dialog.delete.title")}</p>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, textAlign: "center" }}>
        <Box
          sx={{
            mt: "10px",
            p: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "10px",
            backgroundColor: "common.purple.100",
          }}
        >
          <Typography
            sx={{ color: "primary.main", fontSize: 14, fontWeight: 700 }}
          >
            {data?.data.name}
          </Typography>
          <Typography
            sx={{ color: "common.shade.200", fontSize: 14, fontWeight: 500 }}
          >
            {data?.data.promo_code}
          </Typography>
        </Box>
        <Typography
          sx={{
            mt: "10px",
            color: "common.shade.200",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {t("dialog.delete.subtitle")}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
        <VGButton
          variant="contained"
          size="large"
          fullWidth
          onClick={handleClose}
          color="primary"
        >
          {t("btn.back")}
        </VGButton>
        <VGButton
          variant="outlined"
          size="large"
          fullWidth
          onClick={() => {
            modal.promoId &&
              deletePromoMutation.mutate(modal.promoId, {
                onSuccess: () => {
                  setModal({ isOpen: false });
                  toast.success(t("toast.deleteSuccess"), toastOption);
                },
              });
          }}
          color="primary"
          sx={{
            borderColor: "common.shade.100",
            color: "common.shade.100",
          }}
        >
          {t("btn.delete")}
        </VGButton>
      </DialogActions>
    </Dialog>
  );
}
