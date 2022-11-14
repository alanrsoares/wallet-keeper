import Link from "next/link";

import { WalletIcon } from "@heroicons/react/24/solid";

import "../styles/globals.css";

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
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Nunito+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <title>WalletKeeper</title>
      </head>
      <body className="min-h-screen flex flex-col md:gap-6 gap-4">
        <header className="bg-base-200 text-base-content p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl">
              <Link href="/" className="flex gap-2 items-center group">
                <WalletIcon className="h-6 w-6 group-hover:opacity-60 group-hover:text-accent transition-all" />
                <span className="font-semibold">WalletKeeper</span>
              </Link>
            </h1>
          </div>
        </header>
        <main className="flex-1 container mx-auto">{children}</main>
        <footer className="bg-base-300 p-4">
          <div className="container max-auto grid place-items-center font-mono">
            &copy; 2022 WalletKeeper
          </div>
        </footer>
      </body>
    </html>
  );
}
