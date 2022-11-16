import type { ProgressCallback } from "@ethersproject/json-wallets";
import type { Networkish } from "@ethersproject/networks";
import { getDefaultProvider, type Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { Wallet } from "@ethersproject/wallet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { assocPath } from "rambda";
import { useMemo } from "react";
import { createContainer } from "unstated-next";

import usePersistedState from "~/lib/hooks/usePersistedState";

export const STORAGE_KEY = "@walletkeeper/state/v1";

export const NETWORKS = {
  mainnet: "homestead",
  goerli: "goerli",
}

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export type WalletKeeperState = {
  /**
   * Accounts, indexed by address
   */
  accountsByAddress: Record<
    string,
    {
      encryptedJson: string;
      address: string;
      displayName: string;
    }
  >;
  /**
   * Selected network
   * @default "goerli"
   **/
  selectedNetwork?: Networkish
};

const { Provider: WalletKeeperProvider, useContainer: useWalletKeeper } =
  createContainer(() => {
    const [state, setState] = usePersistedState<WalletKeeperState>(
      STORAGE_KEY,
      {
        selectedNetwork: NETWORKS.goerli,
        accountsByAddress: {},
      }
    );

    const mutations = {
      createWallet: () =>
        useMutation(
          async (input: {
            displayName: string;
            password: string;
            onProgress?: ProgressCallback;
          }) => {
            const existingWallet = Object.values(state.accountsByAddress).find(
              (account) => account.displayName === input.displayName
            );

            if (existingWallet) {
              throw new Error("Wallet with that name already exists");
            }

            const wallet = Wallet.createRandom();
            const encryptedJson = await wallet.encrypt(
              input.password,
              {},
              input.onProgress
            );

            setState(
              assocPath(["accountsByAddress", wallet.address], {
                encryptedJson,
                address: wallet.address,
                displayName: input.displayName,
              })
            );

            return wallet;
          }
        ),
      unlockWallet: () =>
        useMutation(
          async (input: {
            address: string;
            password: string;
            onProgress?: ProgressCallback;
          }) => {
            const account = state.accountsByAddress[input.address];

            if (!account) {
              throw new Error("Account not found");
            }

            const wallet = await Wallet.fromEncryptedJson(
              account.encryptedJson,
              input.password,
              input.onProgress
            );

            return wallet;
          }
        ),
    };

    const queries = {
      getBalance: (input: { address: string; provider?: Provider; }) =>
        useQuery(
          ["eth-balance", input.address],
          async () => {
            const provider = input.provider ?? getDefaultProvider(state.selectedNetwork ?? NETWORKS.goerli, {
              alchemy: ALCHEMY_API_KEY,
            });
            const balance = await provider.getBalance(input.address);
            return formatEther(balance);
          },
          {
            enabled: !!input.address,
          }
        ),
    };

    const accountList = useMemo(
      () => Object.values(state.accountsByAddress),
      [state.accountsByAddress]
    );

    const derivedState = {
      ...state,
      accountList,
    };

    return {
      mutations,
      queries,
      state: derivedState,
    };
  });

export { WalletKeeperProvider, useWalletKeeper };
