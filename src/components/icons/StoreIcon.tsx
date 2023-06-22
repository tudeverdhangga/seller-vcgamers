import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Store from "./svg/storeIcon.svg";

export default function StoreIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <Store />
    </SvgIcon>
  );
}
