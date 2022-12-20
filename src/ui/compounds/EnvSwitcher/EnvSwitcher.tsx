import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { Dropdown } from "~/ui/components";

export type EnvSwitcherProps = {};

const ENV_OPTIONS = [
  { value: "mainnet", label: "Mainnet", url: "/?env=mainnet" },
  { value: "testnet", label: "Testnet", url: "/?env=testnet" },
] as const;

export const EnvSwitcher: FC<EnvSwitcherProps> = (_props) => {
  const { state, actions } = useWalletKeeper();
  const networkEnv = useRouter().query.env as string;

  const network = state.selectedNetwork === "homestead" ? "mainnet" : "testnet";

  useEffect(() => {
    if (networkEnv) {
      actions.selectNetwork(networkEnv === "mainnet" ? "homestead" : "goerli");
    }
  }, [networkEnv]);

  return (
    <div className="fixed inline-block top-2 md:top-3 right-1 md:right-2 z-20">
      <Dropdown
        value={network}
        align="end"
        onChange={(value) => {
          actions.selectNetwork(value === "mainnet" ? "homestead" : "goerli");
        }}
      >
        <Dropdown.Trigger variant={network === "mainnet" ? "primary" : "info"}>
          {network === "mainnet" ? "Mainnet" : "Testnet"}
        </Dropdown.Trigger>

        <Dropdown.Content>
          {ENV_OPTIONS.map((option) => (
            <Dropdown.Item key={option.value} value={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
};
