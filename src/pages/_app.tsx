import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appWithTranslation } from "next-i18next";

import nextI18NextConfig from "../../next-i18next.config.mjs";

import { Layout } from "~/layout";
import { commonColors } from "~/utils/colors";

//TODO: Fix issue loading using next/font
// const rajdhani = Rajdhani({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
//   display: "swap",
// });

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7750F8",
      light: "#EFEBFF",
    },
    secondary: {
      main: "#FF3333",
    },
    background: {
      default: "#f5f5f5",
    },
    divider: "#F5F5F5",
    common: commonColors,
  },
  typography: {
    fontFamily: "Rajdhani",
  },
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
