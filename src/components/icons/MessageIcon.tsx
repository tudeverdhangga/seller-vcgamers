import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Message from "./svg/messageIcon.svg";

export default function MessageIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <Message />
    </SvgIcon>
  );
}
