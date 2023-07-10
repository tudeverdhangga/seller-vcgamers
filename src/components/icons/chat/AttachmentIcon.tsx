import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Attachment from "../svg/chat/attachment.svg";

export default function AttachmentIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 17 16" {...props}>
      <Attachment />
    </SvgIcon>
  );
}
