import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import WalletOnHold from "./svg/walletOnHold.svg";

export default function WalletOnHoldIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 25" {...props}>
      <WalletOnHold />
    </SvgIcon>
  );
}
