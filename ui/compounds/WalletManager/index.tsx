import React from "react";

type Props = {};

const WalletManager = (props: Props) => {
  return (
    <section>
      <h1>Wallet Manager</h1>
    </section>
  );
};

export default WalletManager;

export function useWalletManager() {
  return {
    wallets: [],
    createWallet: () => {},
    deleteWallet: () => {},
    importWallet: () => {},
  };
}
