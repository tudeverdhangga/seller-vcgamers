import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Decrease from "./svg/decrease.svg";

export default function DecreaseIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 14 9"
      {...props}
      sx={{
        borderRadius: "50%",
        backgroundColor: "common.red.0",
        width: "18px",
        height: "18px",
        p: "2px",
      }}
    >
      <Decrease />
    </SvgIcon>
  );
}
