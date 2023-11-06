import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { env } from "process";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="//cdnt.netcoresmartech.com/smartechclient.js"
            strategy="beforeInteractive"
          ></Script>
          {
            (env.NEXT_PUBLIC_CREATE_NETCORE && env.NEXT_PUBLIC_REGISTER_NETCORE) &&
            <Script id="netcore" strategy="afterInteractive">
            {`
              let initiated = false;
              while(!initiated) {
                if (window.smartech && window.smartech != undefined) {
                  smartech("create", "${
                    process.env.NEXT_PUBLIC_CREATE_NETCORE as string
                  }");
                  smartech("register", "${
                    process.env.NEXT_PUBLIC_REGISTER_NETCORE as string
                  }");
                  smartech("identify", "");
                  smartech("dispatch", "page browse", { pageurl: window.location.href });

                  initiated = true;
                }
              }
            `}
          </Script>
          }
        </body>
      </Html>
    );
  }
}

export default MyDocument;
