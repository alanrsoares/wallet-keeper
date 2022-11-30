import type { ProgressCallback } from "@ethersproject/json-wallets";
import type { Networkish } from "@ethersproject/networks";
import { getDefaultProvider, Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { Wallet } from "@ethersproject/wallet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { createContainer } from "unstated-next";

import usePersistedState from "~/lib/hooks/usePersistedState";

export const STORAGE_KEY = "@walletkeeper/state/v1";

export const NETWORKS = {
  mainnet: "homestead",
  goerli: "goerli",
};

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export type AccountEntry = {
  address: string;
  encryptedJson: string;
  displayName: string;
};

export type CreateWalletInput = {
  displayName: string;
  password: string;
  onProgress?: ProgressCallback;
};

export type ImportWalletInput = {
  displayName: string;
  privateKey: string;
  password: string;
  onProgress?: ProgressCallback;
};

export type UnlockWalletInput = {
  address: string;
  password: string;
  onProgress?: ProgressCallback;
};

export type DeleteWalletInput = {
  address: string;
  password: string;
  onProgress?: ProgressCallback;
};

export type WalletKeeperState = {
  /**
   * Accounts, indexed by address
   */
  accountsByAddress: Record<string, AccountEntry>;
  /**
   * Selected network
   * @default "goerli"
   **/
  selectedNetwork?: Networkish;
};

const DEFAULT_STATE: WalletKeeperState = {
  accountsByAddress: {},
  selectedNetwork: NETWORKS.goerli,
};

const { Provider: WalletKeeperProvider, useContainer: useWalletKeeper } =
  createContainer((initialState: WalletKeeperState = DEFAULT_STATE) => {
    const [state, setState] = usePersistedState<WalletKeeperState>(
      STORAGE_KEY,
      initialState
    );

    const mutations = {
      createWallet: () =>
        useMutation(async (input: CreateWalletInput) => {
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

          setState((state) => ({
            ...state,
            accountsByAddress: {
              ...state.accountsByAddress,
              [wallet.address]: {
                address: wallet.address,
                encryptedJson,
                displayName: input.displayName,
              },
            },
          }));

          return wallet;
        }),
      importWallet: () =>
        useMutation(async (input: ImportWalletInput) => {
          const existingWallet = Object.values(state.accountsByAddress).find(
            (account) => account.displayName === input.displayName
          );

          if (existingWallet) {
            throw new Error("Wallet with that name already exists");
          }

          const wallet = new Wallet(input.privateKey);

          const encryptedJson = await wallet.encrypt(
            input.password,
            {},
            input.onProgress
          );

          setState((state) => ({
            ...state,
            accountsByAddress: {
              ...state.accountsByAddress,
              [wallet.address]: {
                address: wallet.address,
                encryptedJson,
                displayName: input.displayName,
              },
            },
          }));

          return wallet;
        }),
      unlockWallet: () =>
        useMutation(async (input: UnlockWalletInput) => {
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
        }),

      deleteWallet: () =>
        useMutation(async (input: DeleteWalletInput) => {
          const account = state.accountsByAddress[input.address];

          // password is needed to decrypt the wallet
          // so we can delete it from the state
          await Wallet.fromEncryptedJson(
            account.encryptedJson,
            input.password,
            input.onProgress
          );

          setState((state) => ({
            ...state,
            accountsByAddress: Object.fromEntries(
              Object.entries(state.accountsByAddress).filter(
                ([key]) => key !== input.address
              )
            ),
          }));
        }),
    };

    const queries = {
      getBalance: (input: { address: string; provider?: Provider }) =>
        useQuery(
          ["eth-balance", input.address],
          async () => {
            const provider =
              input.provider ??
              getDefaultProvider(state.selectedNetwork ?? NETWORKS.goerli, {
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
