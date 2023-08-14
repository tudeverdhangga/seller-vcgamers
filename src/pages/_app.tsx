import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appWithTranslation } from "next-i18next";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import nextI18NextConfig from "../../next-i18next.config.mjs";

import { Layout } from "~/layout";
import { commonColors } from "~/utils/colors";

import '~/components/atomic/VGRichEditor/index.css'
import StyledToastContainer from "~/components/atomic/StyledToastContainer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    error: {
      main: "#FF3333",
    },
    background: {
      default: "#f5f5f5",
    },
    secondary: {
      main: "#616A82"
    },
    success: {
      main: "#40D04F",
      contrastText: "#FFFFFF",
      dark: "#00870E"
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
  const queryClient = new QueryClient();

  return (
    <>
      <StyledToastContainer />

      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
