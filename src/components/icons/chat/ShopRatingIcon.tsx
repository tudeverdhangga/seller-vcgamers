import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import ShopRating from "../svg/shopRating.svg";

export default function ShopRatingIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" fontSize="small" {...props}>
      <ShopRating />
    </SvgIcon>
  );
}
