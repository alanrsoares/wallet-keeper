import "../styles/globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
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
      </head>
      <body className="min-h-screen flex flex-col md:gap-6 gap-4">
        <Header />
        <main className="flex-1 container-4xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
