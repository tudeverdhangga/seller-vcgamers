import { type CSSProperties } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function VGTabPanel({
  children,
  value,
  index,
  id = "simple-tabpanel",
  ariaLabel = "simple-tab",
  style,
}: {
  children?: React.ReactNode;
  index: number;
  value: number;
  id?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-${index}`}
      aria-labelledby={`${ariaLabel}-${index}`}
      style={style}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
