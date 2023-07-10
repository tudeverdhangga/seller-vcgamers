import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Sending from "../svg/chat/sending.svg";

export default function SendingIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 9 9" fontSize="small" {...props}>
      <Sending />
    </SvgIcon>
  );
}
