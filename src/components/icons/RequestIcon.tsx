import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Request from "./svg/requestIcon.svg";

export default function RequestIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <Request />
    </SvgIcon>
  );
}
