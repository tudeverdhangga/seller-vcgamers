import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Increase from "./svg/increase.svg";

export default function IncreaseIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 14 9"
      {...props}
      sx={{
        borderRadius: "50%",
        backgroundColor: "common.green.0",
        width: "18px",
        height: "18px",
        p: "2px",
      }}
    >
      <Increase />
    </SvgIcon>
  );
}
