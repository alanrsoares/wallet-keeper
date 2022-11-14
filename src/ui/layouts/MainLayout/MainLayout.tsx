import { PropsWithChildren } from "react";
import { WalletKeeperProvider } from "~/lib/contexts/walletKeeper";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

type Props = PropsWithChildren<{}>;

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <Header />
      <WalletKeeperProvider>
        <main className="flex-1 container-4xl mx-auto px-2 lg:px-0">
          {children}
        </main>
      </WalletKeeperProvider>
      <Footer />
    </div>
  );
};

export default MainLayout;
