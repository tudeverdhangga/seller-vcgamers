import { type Theme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export const useResponsive = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return {
    isMobile,
    isDesktop: !isMobile,
  };
};
