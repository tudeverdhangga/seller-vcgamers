import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Wallet from "./svg/wallet.svg";

export default function WalletIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <Wallet />
    </SvgIcon>
  );
}
