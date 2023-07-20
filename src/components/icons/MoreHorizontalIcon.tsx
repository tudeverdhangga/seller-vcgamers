import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import MoreHorizontal from "./svg/moreHorizontal.svg";

export default function MoreHorizontalIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 8" {...props}>
      <MoreHorizontal />
    </SvgIcon>
  );
}
