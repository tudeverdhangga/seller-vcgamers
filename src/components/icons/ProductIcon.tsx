import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Product from "./svg/productIcon.svg";

export default function ProductIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <Product />
    </SvgIcon>
  );
}
