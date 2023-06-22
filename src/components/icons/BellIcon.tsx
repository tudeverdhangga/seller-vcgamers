import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Bell from "./svg/bell.svg";

export default function BellIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 19 19" {...props}>
      <Bell />
    </SvgIcon>
  );
}
