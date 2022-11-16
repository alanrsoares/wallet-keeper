import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { FC, PropsWithChildren, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Button from "~/ui/components/Button";

import GenerateWallet from "../GenerateWallet";
import WalletDetails from "../WalletDetails";

const WalletList: FC<PropsWithChildren> = ({ children }) => {
  const walletKeeper = useWalletKeeper();
  const [isExpanded, setIsExpanded] = useState(false);

  const walletCount = Object.keys(walletKeeper.state.accountsByAddress).length;

  if (!walletCount) {
    return <GenerateWallet />;
  }

  return (
    <div className="card bg-base-300">
      <div className="card-body grid gap-4">
        <ul className="grid gap-4">
          <h2 className="card-title flex justify-between">
            <span>
              Wallets <span className="opacity-80">({walletCount})</span>
            </span>
            <Button
              size="sm"
              shape="circle"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <MinusIcon className="h-4 w-4" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
            </Button>
          </h2>
          {isExpanded &&
            walletKeeper.state.accountList.map(({ address, displayName }) => (
              <li key={address} className="card bg-base-200">
                <WalletDetails address={address} />
              </li>
            ))}
        </ul>
        <GenerateWallet className="bg-base-200!" />
      </div>
    </div>
  );
};

export default WalletList;
