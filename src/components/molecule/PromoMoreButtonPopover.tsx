import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import MoreButtonPopover from "../atomic/MoreButtonPopover";
import VGButton from "../atomic/VGButton";
import { disableDialogAtom } from "~/atom/managePromo";
import PromoDisableDialog from "./PromoDisableDialog";

export default function PromoMoreButtonPopover(props: { promoId: string }) {
  const { t } = useTranslation("managePromo");
  const [, setDisableDialog] = useAtom(disableDialogAtom);

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
      dialog={<PromoDisableDialog promoId={props.promoId} />}
    />
  );
}
