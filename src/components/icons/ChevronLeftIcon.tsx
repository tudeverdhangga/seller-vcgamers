import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import ChevronLeft from "./svg/chevronLeft.svg";

export default function ChevronLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 18 18" {...props}>
      <ChevronLeft />
    </SvgIcon>
  );
}
