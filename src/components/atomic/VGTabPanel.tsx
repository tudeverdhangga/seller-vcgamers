import Box, { type BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default styled(
  ({
    value,
    index,
    id = "simple-tabpanel",
    ariaLabel = "simple-tab",
    children,
    ...props
  }: BoxProps & {
    index: number;
    value: number;
    id?: string;
    ariaLabel?: string;
  }) => (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-${index}`}
      aria-labelledby={`${ariaLabel}-${index}`}
      {...props}
    >
      {value === index && children}
    </Box>
  )
)(() => ({}));
