import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Sent from "../svg/chat/sent.svg";

export default function SentIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 13 8" fontSize="small" {...props}>
      <Sent />
    </SvgIcon>
  );
}
