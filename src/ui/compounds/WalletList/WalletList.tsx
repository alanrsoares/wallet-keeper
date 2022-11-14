import {
  ArrowDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { FC, PropsWithChildren, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";

import GenerateWallet from "../GenerateWallet";
import WalletDetails from "../WalletDetails";

const WalletList: FC<PropsWithChildren> = (_props) => {
  const walletKeeper = useWalletKeeper();
  const [isExpanded, setIsExpanded] = useState(false);

  const walletCount = Object.keys(walletKeeper.state.accountsByAddress).length;

  if (!walletCount) {
    return (
      <>
        <div className="p-8 w-full grid place-items-center gap-4 xl:gap-8 group text-white/60 text-center">
          <div className="font-display text-2xl xl:text-4xl">
            Oh noes, no wallet yet?
          </div>
          <small className="text-lg opacity-90 -mt-2 xl:-mt-4">
            Don't panic! You can create a new wallet below
          </small>
          <ArrowDownIcon className="h-12 w-12 group-hover:animate-bounce" />
        </div>
        <GenerateWallet />
      </>
    );
  }

  return (
    <div className="card bg-base-300" data-testid="wallet-list-container">
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
            walletKeeper.state.accountList.map(({ address }) => (
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
