import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Setting from "./svg/settingIcon.svg";

export default function SettingIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <Setting />
    </SvgIcon>
  );
}
