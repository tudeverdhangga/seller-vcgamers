import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import EnFlag from "./svg/enFlag.svg";

export default function IdFlagIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <EnFlag />
    </SvgIcon>
  );
}
