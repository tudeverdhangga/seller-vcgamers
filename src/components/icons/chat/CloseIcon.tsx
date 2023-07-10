import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Close from "../svg/chat/close.svg";

export default function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <Close />
    </SvgIcon>
  );
}
