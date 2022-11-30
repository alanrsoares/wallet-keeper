import { Html, Head, Main, NextScript } from "next/document";

import { APP_NAME } from "~/lib/constants";

const Document = () => (
  <Html lang="en">
    <Head>
      <meta
        name="description"
        content={`${APP_NAME}, your secure wallet manager`}
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta
        name="description"
        content="WalletKeeper, a minimal, non-custodial web3 wallet for EVM chains"
      />
      <meta name="keywords" content="web3, wallet, non-custodial, secure" />

      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      <meta name="theme-color" content="#317EFB" />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Tourney&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body className="dark antialiased scroll-smooth">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
