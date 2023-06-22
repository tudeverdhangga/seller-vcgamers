import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import ChevronDown from "./svg/chevronDown.svg";

export default function ChevronDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 10 10" {...props}>
      <ChevronDown />
    </SvgIcon>
  );
}
