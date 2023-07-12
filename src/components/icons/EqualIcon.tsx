import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Equal from "./svg/equal.svg";

export default function EqualIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 10 6"
      {...props}
      sx={{
        borderRadius: "50%",
        backgroundColor: "common.purple.100",
        width: "18px",
        height: "18px",
        p: "2px",
      }}
    >
      <Equal />
    </SvgIcon>
  );
}
