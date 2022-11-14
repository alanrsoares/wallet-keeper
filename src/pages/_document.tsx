import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html>
    <Head lang="en">
      <meta
        name="description"
        content="Walletkeeper, your secure wallet manager"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Tourney&display=swap"
        rel="stylesheet"
      />
      <title>WalletKeeper</title>
    </Head>
    <body className="dark antialiased">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
