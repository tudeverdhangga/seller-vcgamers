import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import SmileySad from "./svg/smileySad.svg";

export default function StoreIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <SmileySad />
    </SvgIcon>
  );
}
