import {
  render,
  findByTestId,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  WalletKeeperProvider,
  WalletKeeperState,
} from "~/lib/contexts/walletKeeper";
import WalletList from "./WalletList";

const queryClient = new QueryClient();

const renderWalletList = (initialState: WalletKeeperState) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <WalletKeeperProvider initialState={initialState}>
        <WalletList />
      </WalletKeeperProvider>
    </QueryClientProvider>
  );
};

const getters = <T extends HTMLElement>(container: HTMLElement) => ({
  walletListContainer: () =>
    findByTestId<T>(container, "wallet-list-container"),
  generateWalletButtonExpanded: () =>
    findByTestId<HTMLButtonElement>(
      container,
      "generate-wallet-button-expanded"
    ),
  generateWalletButtonCollapsed: () =>
    findByTestId<HTMLButtonElement>(
      container,
      "generate-wallet-button-collapsed"
    ),
  generateWalletDisplayNameField: () =>
    container.querySelector<HTMLInputElement>("input[name=displayName]"),
  generateWalletPasswordField: () =>
    container.querySelector<HTMLInputElement>("input[name=password]"),
  generateWalletPasswordConfirmField: () =>
    container.querySelector<HTMLInputElement>("input[name=passwordConfirm]"),
});

describe("WalletList", () => {
  describe("When there are wallets", () => {
    it("renders the 'wallet list'", async () => {
      const { container } = renderWalletList({
        selectedNetwork: "goerli",
        accountsByAddress: {
          "0x123": {
            address: "0x123",
            encryptedJson: "encryptedJson",
            displayName: "displayName",
          },
        },
      });

      const walletListContainer = await findByTestId(
        container,
        "wallet-list-container"
      );

      expect(walletListContainer).toBeTruthy();
    });
  });
});
