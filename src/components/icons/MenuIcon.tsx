import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Menu from "./svg/menu.svg";

export default function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 18 18" {...props}>
      <Menu />
    </SvgIcon>
  );
}
