import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import { disableDialogAtom } from "~/atom/managePromo";
import { toastOption } from "~/utils/toast";
import {
  useDeactivatePromo,
  useGetPromoDetail,
} from "~/services/managePromo/hooks";
import dayjs from "dayjs";
import DialogWithWarningIcon from "./DialogWithWarningIcon";

export default function PromoDisableDialog(props: { promoId: string }) {
  const { t } = useTranslation("managePromo");
  const [modalOpen, setModalOpen] = useAtom(disableDialogAtom);
  const deactivateMutation = useDeactivatePromo();
  const { data } = useGetPromoDetail(props.promoId, modalOpen);

  const isUnderTimeLimit =
    dayjs() < dayjs(data?.data.approved_date).add(3, "days");

  return (
    <DialogWithWarningIcon
      open={modalOpen}
      handleClose={() => setModalOpen(false)}
      title={t("dialog.disabled.title")}
      contentTitle={data?.data.name}
      contentSubtitle={data?.data.promo_code}
      backBtnTitle={t("btn.back")}
      okBtnTitle={t("btn.disable")}
      okBtnClick={() => {
        deactivateMutation.mutate(props.promoId, {
          onSuccess: () => {
            setModalOpen(false);
            toast.success(t("toast.disableSuccess"), toastOption);
          },
        });
      }}
      description={
        <>
          {!isUnderTimeLimit && (
            <Typography
              sx={{
                mt: "10px",
                color: "common.shade.200",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("dialog.disabled.subtitle")}
            </Typography>
          )}
          {isUnderTimeLimit && (
            <Box>
              <Typography
                sx={{
                  mt: "10px",
                  color: "common.red.500",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {t("dialog.disabled.error")}
              </Typography>
              <Typography
                sx={{
                  color: "common.shade.200",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {t("dialog.disabled.errorHint", {
                  date: dayjs(data?.data.approved_date)
                    .add(3, "days")
                    .format("DD MMM YYYY HH:mm"),
                })}
              </Typography>
            </Box>
          )}
        </>
      }
    />
  );
}
