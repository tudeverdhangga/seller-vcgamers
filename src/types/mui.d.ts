import { type CommonColors } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    black: string;
    white: string;
    green: {
      0: string;
      500: string;
      900: string;
    };
    yellow: {
      0: string;
      500: string;
    };
    orange: {
      500: string;
    };
    red: {
      0: string;
      500: string;
      900: string;
    };
    purple: {
      0: string;
      100: string;
      300: string;
      500: string;
      700: string;
      900: string;
    };
    blue: {
      300: string;
    };
    shade: {
      0: string;
      50: string;
      75: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
    };
    hub: {
      0: string;
      1: string;
      2: string;
    };
    market: {
      1: string;
      2: string;
    };
    arena: {
      1: string;
      2: string;
    };
    token: {
      1: string;
      2: string;
    };
    news: {
      1: string;
      2: string;
    };
    launchpad: {
      1: string;
      2: string;
    };
    ads: {
      1: string;
      2: string;
    };
    goods: {
      1: string;
      2: string;
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _commonColors: CommonColors = {};
