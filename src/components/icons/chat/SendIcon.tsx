import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Send from "../svg/chat/send.svg";

export default function SendIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 22 22" {...props}>
      <Send />
    </SvgIcon>
  );
}
