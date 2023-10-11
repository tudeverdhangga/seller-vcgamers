import Switch from "@mui/material/Switch";
import { useAtom } from "jotai";
import { kilatDialogAtom } from "~/atom/layout";
import { useGetProfile } from "~/services/api/auth";
import { useGetBulkKilatValue } from "~/services/api/product";

export default function KilatSwitch() {
  const { data: profileData } = useGetProfile();
  const { data: kilatData } = useGetBulkKilatValue();
  const [, setKilatDialog] = useAtom(kilatDialogAtom);

  const hasKilat = profileData?.data.seller_has_kilat;

  const handleChangeKilat = () => setKilatDialog(true);

  return (
    <Switch
      checked={kilatData?.data.toggle_value ?? false}
      disabled={!hasKilat}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        handleChangeKilat();
      }}
    />
  );
}
