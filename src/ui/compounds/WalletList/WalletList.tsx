import {
  ArrowDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Button from "~/ui/components/Button";
import Card from "~/ui/components/Card";
import GenerateWallet from "../GenerateWallet";
import WalletDetails from "../WalletDetails";

const WalletList: FC<PropsWithChildren> = (_props) => {
  const { state } = useWalletKeeper();

  const walletCount = useMemo(
    () => Object.keys(state.accountsByAddress).length,
    [state.accountsByAddress]
  );

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // wallet list should be expanded by default if there are wallets
    setIsExpanded(walletCount > 0 && walletCount < 10);
  }, [walletCount]);

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
    <Card
      className="card card-compact md:card-normal bg-base-200"
      bodyClassName="grid gap-4"
      data-testid="wallet-list-container"
    >
      <ul className="grid gap-4">
        <h2 className="card-title flex justify-between">
          <span>
            Wallets <span className="opacity-80">({walletCount})</span>
          </span>
          <Button
            size="sm"
            shape="circle"
            className={clsx("swap swap-rotate", {
              "swap-active": isExpanded,
            })}
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid="wallet-list-toggle"
          >
            <MinusIcon className="h-4 w-4 swap-on" />
            <PlusIcon className="h-4 w-4 swap-off" />
          </Button>
        </h2>
        {isExpanded &&
          state.accountList.map(({ address }) => (
            <li key={address} className="card bg-base-300">
              <WalletDetails address={address} />
            </li>
          ))}
      </ul>
      <GenerateWallet className="bg-base-300!" />
    </Card>
  );
};

export default WalletList;
