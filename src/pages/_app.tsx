import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useState, type ReactElement, type ReactNode } from "react";

import nextI18NextConfig from "../../next-i18next.config.mjs";

import { env } from "~/env.mjs";
import { Layout } from "~/layout";
import { commonColors } from "~/utils/colors";

import StyledToastContainer from "~/components/atomic/StyledToastContainer";
import "~/components/atomic/VGRichEditor/index.css";
import { queryClient } from "~/services/http";

//TODO: Fix issue loading using next/font
// const rajdhani = Rajdhani({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
//   display: "swap",
// });

if (env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../../mocks");
}

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
      main: "#616A82",
    },
    success: {
      main: "#40D04F",
      contrastText: "#FFFFFF",
      dark: "#00870E",
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
  const [shopUrl, setShopUrl] = useState<string | undefined>("");

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
