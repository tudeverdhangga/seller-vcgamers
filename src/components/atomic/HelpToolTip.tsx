import HelpIcon from "../icons/svg/helpIcon.svg";
import LightTooltip from "./LightToolTip";

export default function HelpToolTip(props: { title: string }) {
  return (
    <LightTooltip title={props.title}>
      <div style={{ display: "flex" }}>
        <HelpIcon />
      </div>
    </LightTooltip>
  );
}
