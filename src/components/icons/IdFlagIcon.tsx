import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import IdFlag from "./svg/idFlag.svg";

export default function IdFlagIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <IdFlag />
    </SvgIcon>
  );
}
