import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type SxProps } from "@mui/material/styles";

import { useResponsive } from "~/utils/mediaQuery";

export default function VGPageTitle(props: {
  subTitle: string | JSX.Element;
  title: string;
  sx?: SxProps;
  children?: React.ReactNode;
}) {
  const { isDesktop } = useResponsive();

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      ...props.sx
    }}>
      {isDesktop && (
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
            }}
            color="common.shade.200"
          >
            {props.subTitle}
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
            }}
            color="primary.main"
          >
            {props.title}
          </Typography>
        </Box>
      )}
      {props.children}
    </Box>
  );
}
