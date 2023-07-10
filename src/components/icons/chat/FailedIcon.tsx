import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Failed from "../svg/chat/failed.svg";

export default function FailedIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 7 8" fontSize="small" {...props}>
      <Failed />
    </SvgIcon>
  );
}
