import {
  ArrowDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import tw from "tailwind-styled-components";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { createTestIds } from "~/lib/test-utils";
import { Button, Card } from "~/ui/components";

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
    setIsExpanded(walletCount > 0 && walletCount <= 5);
  }, [walletCount]);

  if (!(walletCount || isExpanded)) {
    return <EmptyState />;
  }

  return (
    <Card
      className="card-compact md:card-normal md:bg-base-200 -mx-2"
      bodyClassName="grid gap-4"
      testId={TEST_IDS.container}
    >
      <Card.Title $as="h2" className="flex justify-between">
        <span>
          Wallets{" "}
          <span className="opacity-80" data-testid={TEST_IDS.walletCount}>
            ({walletCount})
          </span>
        </span>
        <ToggleButton
          isActive={isExpanded}
          onClick={() => setIsExpanded((x) => !x)}
        />
      </Card.Title>
      {isExpanded && (
        <ul className="grid gap-4" data-testid={TEST_IDS.walletList}>
          {state.accountList.map(({ address }) => (
            <li key={address} className="card bg-base-300">
              <WalletDetails address={address} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default WalletList;

const ToggleButton = ({ isActive = false, onClick = () => {} }) => (
  <Button
    size="sm"
    shape="circle"
    className={clsx("swap swap-rotate", {
      "swap-active": isActive,
    })}
    onClick={onClick}
    data-testid={TEST_IDS.toggleButton}
  >
    <MinusIcon className="h-4 w-4 swap-on" />
    <PlusIcon className="h-4 w-4 swap-off" />
  </Button>
);

const EmptyState = () => (
  <EmptyStateContainer data-testid={TEST_IDS.emptyState}>
    <EmptyStateContent>
      <h2 className="font-display text-xl lg:text-3xl xl:text-4xl">
        Oh noes, no wallet yet?
      </h2>
      <small className="text-base lg:text-lg opacity-90 -mt-2 xl:-mt-4">
        Don't panic! You can create a new wallet below
      </small>
      <ArrowDownIcon className="h-12 w-12 group-hover:animate-bounce" />
    </EmptyStateContent>
  </EmptyStateContainer>
);

const EmptyStateContainer = tw.section`
  hero
  group
  py-6 md:py-8
`;

const EmptyStateContent = tw.div`
  hero-content 
  text-center 
  grid place-items-center 
  gap-5 md:gap-8
  max-w-lg
`;

export const TEST_IDS = createTestIds("WalletList", [
  "container",
  "emptyState",
  "toggleButton",
  "walletCount",
  "walletList",
]);
