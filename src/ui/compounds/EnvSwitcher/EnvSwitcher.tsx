import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { Dropdown } from "~/ui/components";

export type EnvSwitcherProps = {};

const ENV_OPTIONS = [
  { value: "mainnet", label: "Mainnet", url: "/?env=mainnet" },
  { value: "testnet", label: "Testnet", url: "/?env=testnet" },
];

export const EnvSwitcher: FC<EnvSwitcherProps> = (props) => {
  const { state, actions } = useWalletKeeper();
  const networkEnv = useRouter().query.env as string;

  const network = state.selectedNetwork === "homestead" ? "mainnet" : "testnet";

  useEffect(() => {
    if (networkEnv) {
      actions.selectNetwork(networkEnv === "mainnet" ? "homestead" : "goerli");
    }
  }, [networkEnv]);

  return (
    <div className="fixed inline-block top-1 right-1 z-20">
      <Dropdown
        value={network}
        options={ENV_OPTIONS}
        className={clsx({
          "bg-primary": network === "mainnet",
          "bg-secondary": network === "testnet",
        })}
      />
    </div>
  );
};
