import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import CircleInfo from "./svg/circleInfo.svg";

const CircleInfoIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props}>
      <CircleInfo />
    </SvgIcon>
  );
};

export default CircleInfoIcon;
