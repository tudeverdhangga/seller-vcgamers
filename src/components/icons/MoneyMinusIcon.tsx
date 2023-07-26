import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import MoneyMinus from "./svg/moneyMinus.svg";

export default function MoneyMinusIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 48 48" {...props}>
      <MoneyMinus />
    </SvgIcon>
  );
}
