import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import MoreDots from "./svg/moreDots.svg";

export default function MenuDotsIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props}>
      <MoreDots />
    </SvgIcon>
  );
}
