import { useAtom } from "jotai";
import ActivateKilatDialog from "./ActivateKilatDialog";
import DeactivateKilatDialog from "./DeactivateKilatDialog";
import { kilatDialogAtom } from "~/atom/layout";
import { useGetBulkKilatValue } from "~/services/api/product";

export default function KilatDrawerDialog() {
  const [kilatDialog, setKilatDialog] = useAtom(kilatDialogAtom);
  const { data } = useGetBulkKilatValue();

  const refetchBulkKilat = () => {
    // support refetchProduct
  };

  const handleClose = () => setKilatDialog(false);

  return (
    <>
      <ActivateKilatDialog
        isBulk={true}
        name={data?.data.total_item ?? 0}
        isOpen={kilatDialog && !(data?.data.toggle_value ?? true)}
        nextActiveKilat={""}
        handleClose={handleClose}
        refetchProduct={refetchBulkKilat}
      />
      <DeactivateKilatDialog
        isBulk={true}
        name={data?.data.total_item ?? 0}
        isOpen={kilatDialog && (data?.data.toggle_value ?? false)}
        handleClose={handleClose}
        refetchProduct={refetchBulkKilat}
      />
    </>
  );
}
