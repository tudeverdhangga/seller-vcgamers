import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Money from "./svg/money.svg";

export default function MoneyIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 48 48" {...props}>
      <Money />
    </SvgIcon>
  );
}
