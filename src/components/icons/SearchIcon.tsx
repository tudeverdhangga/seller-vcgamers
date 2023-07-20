import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Search from "./svg/search.svg";

export default function SearchIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 22 23" {...props}>
      <Search />
    </SvgIcon>
  );
}
