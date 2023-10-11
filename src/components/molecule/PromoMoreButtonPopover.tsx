import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import MoreButtonPopover from "../atomic/MoreButtonPopover";
import VGButton from "../atomic/VGButton";
import { disableDialogAtom } from "~/atom/managePromo";
import PromoDisableDialog from "./PromoDisableDialog";
import type { Promo } from "~/services/managePromo/types";

export default function PromoMoreButtonPopover(props: { promo: Promo }) {
  const { t } = useTranslation("managePromo");
  const [, setDisableDialog] = useAtom(disableDialogAtom);

  // TODO: In future work, if the option is not only deactivate promo, place the logic only on the promo
  if (!props.promo.can_deactivate) return <></>;

  return (
    <MoreButtonPopover
      menu={
        <VGButton
          variant="text"
          color="error"
          onClick={() => setDisableDialog(true)}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          {t("btn.disablePromo")}
        </VGButton>
      }
      dialog={<PromoDisableDialog promoId={props.promo.id} />}
    />
  );
}
