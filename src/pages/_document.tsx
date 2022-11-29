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
