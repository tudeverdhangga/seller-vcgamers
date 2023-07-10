import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Retry from "../svg/chat/retry.svg";

export default function RetryIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" fontSize="small" {...props}>
      <Retry />
    </SvgIcon>
  );
}
