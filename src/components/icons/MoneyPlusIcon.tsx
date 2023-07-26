import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import MoneyPlus from "./svg/moneyPlus.svg";

export default function MoneyPlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 48 48" {...props}>
      <MoneyPlus />
    </SvgIcon>
  );
}
