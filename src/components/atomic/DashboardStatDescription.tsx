import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type SxProps } from "@mui/material/styles";
import { useTranslation } from "next-i18next";

import IncreaseIcon from "../icons/IncreaseIcon";
import DecreaseIcon from "../icons/DecreaseIcon";
import EqualIcon from "../icons/EqualIcon";

const typeMapping = {
  increase: {
    icon: <IncreaseIcon />,
    valueProps: {
      color: "common.green.900",
      fontSize: 12,
      fontWeight: 600,
    },
  },
  decrease: {
    icon: <DecreaseIcon />,
    valueProps: {
      color: "common.red.500",
      fontSize: 12,
      fontWeight: 600,
    },
  },
  equal: {
    icon: <EqualIcon />,
    valueProps: {
      color: "common.purple.500",
      fontSize: 12,
      fontWeight: 600,
    },
  },
};

export default function DashboardStatDescription(
  props: {
    description?: string;
    sx?: SxProps;
  } & (
    | { type: "increase" | "decrease"; value: string }
    | { type: "equal"; value?: string }
  )
) {
  const prop = typeMapping[props.type];
  const { t } = useTranslation("dashboard");

  return (
    <Box sx={{ display: "flex", gap: "5px", ...props.sx }}>
      {prop.icon}
      <Typography sx={prop.valueProps}>
        {props.value ??
          (props.type === "equal" && t("card.description.equal", "Sama"))}
      </Typography>
      <Typography
        sx={{ color: "common.shade.100", fontSize: 12, fontWeight: 600 }}
      >
        {props.description ??
          t("card.description.description", "dibanding bulan lalu")}
      </Typography>
    </Box>
  );
}
