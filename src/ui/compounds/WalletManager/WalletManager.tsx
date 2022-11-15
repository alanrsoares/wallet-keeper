"use client";

import Button from "~/ui/components/Button";

type Props = {};

const ACTIONS = [
  {
    name: "Create Wallet",
    description: "Create a new wallet",
    icon: "plus",
    onClick: () => {
      console.log("Create Wallet");
    },
  },
  {
    name: "Import Wallet",
    description: "Import an existing wallet",
    icon: "plus",
    onClick: () => {
      console.log("Import Wallet");
    },
  },
  {
    name: "Export Wallet",
    description: "Export an existing wallet",
    icon: "plus",
    onClick: () => {
      console.log("Export Wallet");
    },
  },
];

const WalletManager = (props: Props) => {
  return (
    <section className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Wallet Manager</h2>
        <p className="card-subtitle">Manage your wallets</p>
        <ul className="grid gap-2">
          {ACTIONS.map((action) => (
            <li key={action.name}>
              <Button onClick={action.onClick}>{action.name}</Button>
            </li>
          ))}
        </ul>
      </div>
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
